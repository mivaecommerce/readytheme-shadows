/**
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |q|u|a|n|t|i|f|y|
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *
 * This extension allows for the use of buttons to increase/decrease item
 * quantities on the product and basket pages. When used on the basket page,
 * the decrease button becomes a remove button if the quantity is 1.
 */

(function () {
	'use strict';

	const adjusters = document.querySelectorAll('[data-hook="quantify"]');

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
				let value = parseInt(input.value);
				let action = button.getAttribute('data-action');
				let changed = document.createEvent('HTMLEvents');

				changed.initEvent('change', true, false);
				event.stopPropagation();
				event.preventDefault();

				if (action === 'decrement') {
					/**
					 * THIS CAN BE USED TO SET A MINIMUM QUANTITY
					 * value > 5 ? value - 1 : 5;
					 */
					input.value = value > 1 ? value - 1 : 1;
					input.dispatchEvent(changed);
					allowRemoveUpdate();
				}
				else if (action === 'increment') {
					/**
					 * THIS CAN BE USED TO SET A MAXIMUM QUANTITY
					 * value < 100 ? value + 1 : 100;
					 */
					input.value = value + 1;
					input.dispatchEvent(changed);
					allowRemoveUpdate();
				}
			}
		});
	}

	function allowRemoveUpdate() {
		let quantities = document.querySelectorAll('[data-hook="group-quantity"]');

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
						groupSubmit(event, input);
					}, 250);
				});

				quantityLine.addEventListener('input', function (event) {
					let input = this;

					clearTimeout(updateTimeout);
					updateTimeout = setTimeout(function () {
						toggleRemove(input, input.value);
						groupSubmit(event, input);
					}, 250);
				});
			}
		}
	}

	allowRemoveUpdate();

	function groupSubmit(event, quantity) {
		if (event.key !== 8 && event.key !== 37 && event.key !== 38 && event.key !== 39 && event.key !== 40 && event.key !== 46 && quantity.value !== '') {
			document.querySelector('[data-hook="' + event.target.getAttribute('data-group') + '"]').submit();
		}
	}
})();
