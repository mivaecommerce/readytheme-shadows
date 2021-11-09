/**
 * When called from a `theme.js` file on a product page, this extension will
 * work with the default page code to add a product to the cart utilizing an
 * AJAX call to the form processor.
 *
 * The function contains internal error checking as well as a check to see which
 * page was reached and displaying messages accordingly. If the store is also
 * utilizing the `mini-basket` extension, said extension will be triggered for
 * display upon successfully adding a product to the cart.
 */
const addToCart = (function (document) {
	'use strict';

	const publicMethods = {}; // Placeholder for public methods

	/**
	 * Initialize the plugin
	 * @public
	 */
	publicMethods.init = function () {
		const purchaseButton = document.querySelector('[data-hook="add-to-cart"]');

		if (!document.body.contains(purchaseButton)) {
			return;
		}

		const purchaseButtonText = (purchaseButton.nodeName.toLowerCase() === 'input') ? purchaseButton.value : purchaseButton.textContent;
		const purchaseForm = document.querySelector('[data-hook="purchase"]');
		const purchaseFormActionInput = purchaseForm.querySelector('input[name="Action"]');
		const responseMessage = document.querySelector('[data-hook="purchase-message"]');
		const miniBasketCount = document.querySelectorAll('[data-hook~="mini-basket-count"]');
		const miniBasketAmount = document.querySelectorAll('[data-hook~="mini-basket-amount"]');
		const requiredFields = purchaseForm.querySelectorAll('[required]');

		purchaseButton.addEventListener('click', function (evt) {
			if (purchaseFormActionInput.value !== 'ADPR') {
				return;
			}

			evt.preventDefault();
			evt.stopImmediatePropagation();

			purchaseForm.action = purchaseButton.getAttribute('data-action');
			purchaseFormActionInput.value = 'ADPR';

			const data = new FormData(purchaseForm);
			const request = new XMLHttpRequest(); // Set up our HTTP request

			purchaseForm.setAttribute('data-status', 'idle');

			for (let i = 0; i < requiredFields.length; i++) {
				let field = requiredFields[i];

				field.setCustomValidity('');

				if (!field.validity.valid) {
					if (field.type === 'checkbox') {
						field.focus();
						field.setCustomValidity('Please check this box if you want to proceed.');
						field.reportValidity();
						purchaseForm.setAttribute('data-status', 'submitting');
						break;
					}
					else if (field.type === 'radio') {
						field.focus();
						field.setCustomValidity('Please select one of these options.');
						field.reportValidity();
						purchaseForm.setAttribute('data-status', 'submitting');
						break;
					}
					else if (field.type.indexOf('select') !== -1) {
						field.focus();
						field.setCustomValidity('Please select an item in the list.');
						field.reportValidity();
						purchaseForm.setAttribute('data-status', 'submitting');
						break;
					}
					else if (field.type === 'text' || field.type === 'textarea') {
						field.focus();
						field.setCustomValidity('Please fill out this field.');
						field.reportValidity();
						purchaseForm.setAttribute('data-status', 'submitting');
						break;
					}
				}
			}

			if (purchaseForm.getAttribute('data-status') !== 'submitting') {
				purchaseForm.setAttribute('data-status', 'submitting');
				purchaseButton.classList.add('is-disabled');

				if (purchaseButton.nodeName.toLowerCase() === 'input') {
					purchaseButton.value = 'Processing...';
				}
				else {
					purchaseButton.textContent = 'Processing...';
				}

				responseMessage.innerHTML = '';

				// Setup our listener to process completed requests
				request.onreadystatechange = function () {
					// Only run if the request is complete
					if (request.readyState !== 4) {
						return;
					}

					// Process our return data
					if (request.status === 200) {
						// What do when the request is successful
						let response = request.response;

						if (response.body.id === 'js-BASK') {
							const basketData = response.querySelector('[data-hook="mini-basket"]');
							const basketCount = basketData.getAttribute('data-item-count');
							const basketSubtotal = basketData.getAttribute('data-subtotal');

							if (miniBasketCount) {
								for (let mbcID = 0; mbcID < miniBasketCount.length; mbcID++) {
									miniBasketCount[mbcID].textContent = basketCount; // Update mini-basket quantity (display only)
								}
							}

							if (miniBasketAmount) {
								for (let mbaID = 0; mbaID < miniBasketAmount.length; mbaID++) {
									miniBasketAmount[mbaID].textContent = basketSubtotal; // Update mini-basket subtotal (display only)
								}
							}

							if (typeof miniBasket !== 'undefined' && mivaJS.showMiniBasket === 1) {
								document.querySelector('[data-hook="mini-basket"]').innerHTML = response.querySelector('[data-hook="mini-basket"]').innerHTML;

								setTimeout(function () {
									document.querySelector('[data-hook="open-mini-basket"]').click();
								}, 100);
							}
							else {
								responseMessage.innerHTML = '<div class="x-messages x-messages--success"><span class="u-icon-check"></span> Added to cart.</div>';
							}

							// Re-Initialize Attribute Machine (if it is active)
							if (typeof attrMachCall !== 'undefined') {
								attrMachCall.Initialize();
							}
						}
						else if (response.body.id === 'js-PATR') {
							const findRequired = purchaseForm.querySelectorAll('.is-required');
							const missingAttributes = [];

							for (let id = 0; id < findRequired.length; id++) {
								missingAttributes.push(' ' + findRequired[id].title);
							}

							responseMessage.innerHTML = '<div class="x-messages x-messages--warning">All <em class="u-color-red">Required</em> options have not been selected.<br />Please review the following options: <span class="u-color-red">' + missingAttributes + '</span>.</div>';
						}
						else if (response.body.id === 'js-PLMT') {
							responseMessage.innerHTML = '<div class="x-messages x-messages--warning">We do not have enough of the combination you have selected.<br />Please adjust your quantity.</div>';
						}
						else if (response.body.id === 'js-POUT') {
							responseMessage.innerHTML = '<div class="x-messages x-messages--warning">The combination you have selected is out of stock.<br />Please review your options or check back later.</div>';
						}
						else {
							responseMessage.innerHTML = '<div class="x-messages x-messages--warning">Please review your selection.</div>';
						}

						// Reset button text and form status
						purchaseButton.classList.remove('is-disabled');

						if (purchaseButton.nodeName.toLowerCase() === 'input') {
							purchaseButton.value = purchaseButtonText;
						}
						else {
							purchaseButton.textContent = purchaseButtonText;
						}

						purchaseForm.setAttribute('data-status', 'idle');
					}
					else {
						// What do when the request fails
						console.log('The request failed!');
						purchaseForm.setAttribute('data-status', 'idle');
					}
				};

				/**
				 * Create and send a request
				 * The first argument is the post type (GET, POST, PUT, DELETE, etc.)
				 * The second argument is the endpoint URL
				 */
				request.open(purchaseForm.method, purchaseForm.action, true);
				request.responseType = 'document';
				request.send(data);
			}
		}, false);
	};

	/**
	 * Public APIs
	 */
	return publicMethods;

}(document));
