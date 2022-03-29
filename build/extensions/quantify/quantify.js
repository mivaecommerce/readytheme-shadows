/**
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |q|u|a|n|t|i|f|y|
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *
 * This extension allows for the use of buttons to increase/decrease item
 * quantities on the product and basket pages. When used on the basket page,
 * the decrease button becomes a remove button if the quantity is 1.
 */

const quantify = (function () {
	'use strict';

	const quantifyAPI = {};

	const allowRemoveUpdate = function (section) {
		let quantities = section.querySelectorAll('[data-hook="group-quantity"]');

		function toggleRemove(input, quantity) {
			if (parseInt(quantity) > 1) {
				input.previousElementSibling.classList.remove('is-disabled');
			}
			else {
				input.previousElementSibling.classList.add('is-disabled');
			}
		}

		if (quantities) {
			for (let id = 0; id < quantities.length; id++) {
				let quantityLine = quantities[id];
				let updateTimeout = null;

				toggleRemove(quantityLine, quantityLine.value);

				quantityLine.addEventListener('change', function (event) {
					let input = this;

					clearTimeout(updateTimeout);
					updateTimeout = setTimeout(function () {
						toggleRemove(input, input.value);
						groupSubmit(event, input, section);
					}, 250);
				});

				quantityLine.addEventListener('input', function (event) {
					let input = this;

					clearTimeout(updateTimeout);
					updateTimeout = setTimeout(function () {
						toggleRemove(input, input.value);
						groupSubmit(event, input, section);
					}, 250);
				});
			}
		}
	}

	allowRemoveUpdate(document);

	const groupSubmit = function (event, quantity, section) {
		if (event.key !== 8 && event.key !== 37 && event.key !== 38 && event.key !== 39 && event.key !== 40 && event.key !== 46 && quantity.value !== '') {
			section.querySelector('[data-hook="' + event.target.getAttribute('data-group') + '"]').submit();
		}
	}

	quantifyAPI.init = function (section) {
		const adjusters = section.querySelectorAll('[data-hook="quantify"]');

		if (adjusters) {
			for (let id = 0; id < adjusters.length; id++) {
				/**
				 * This listener prevents the `enter` key from adjusting the `input` value.
				 */
				adjusters[id].addEventListener('keydown', function (keyEvent) {
					if (keyEvent.target.closest('input')) {
						if (keyEvent.key === 'Enter') {
							keyEvent.preventDefault();
						}
					}
				});

				adjusters[id].addEventListener('click', function (event) {
					if (event.target.closest('button')) {
						let button = event.target;
						let inputs = [].filter.call(this.children, function (sibling) {
							return sibling !== button && sibling.closest('input');
						});
						let input = inputs[0];
						let max = input.hasAttribute('data-max') ? parseInt(input.getAttribute('data-max')) : undefined;
						let min = input.hasAttribute('data-min') ? parseInt(input.getAttribute('data-min')) : 1;
						let step = input.hasAttribute('data-step') ? parseInt(input.getAttribute('data-step')) : 1;
						let value = parseInt(input.value);
						let action = button.getAttribute('data-action');
						let changed = new Event('change');

						if (isNaN(step)) {
							step = 1;
						}
						event.stopPropagation();
						event.preventDefault();

						if (action === 'decrement') {
							if (!isNaN(min)) {
								if (min < value) {
									input.value = value - step;
								}
								else {
									input.value = min;
								}
							}
							else {
								input.value = value > step ? value - step : step;
							}
							input.dispatchEvent(changed);
							allowRemoveUpdate(section);
						}
						else if (action === 'increment') {
							if (max !== undefined && !isNaN(max)) {
								if (max > value) {
									input.value = value + step;
								}
								else {
									input.value = max;
								}
							}
							else {
								input.value = value + step;
							}
							input.dispatchEvent(changed);
							allowRemoveUpdate(section);
						}
					}
				});
			}
		}
	};

	quantifyAPI.restore = function (section) {
		allowRemoveUpdate(section);
		quantifyAPI.init(section);
	};

	return quantifyAPI;
})();
