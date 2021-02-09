/**
 * Show Password
 * This extension allows a user to reveal the password they have typed.
 */

(function () {
	'use strict';

	const passwordInputs = document.querySelectorAll('input[type="password"]');
	const hideLabel = 'Hide Password.';
	const hideText = 'Hide';
	const showLabel = 'Show password as plain text. Warning: this will display your password on the screen.';
	const showText = 'Show';

	function getPreviousSibling(element, selector) {
		let sibling = element.previousElementSibling;

		if (!selector) {
			return sibling;
		}

		while (sibling) {
			if (sibling.matches(selector)) {
				return sibling;
			}
			sibling = sibling.previousElementSibling;
		}
	}

	if (passwordInputs.length > 0) {
		passwordInputs.forEach(function (passwordInput) {
			const toggleButton = document.createElement('button');
			let findLabel = getPreviousSibling(passwordInput, 'label');

			toggleButton.classList.add('c-button');
			toggleButton.classList.add('u-bg-transparent');
			toggleButton.classList.add('x-toggle-password');
			if (findLabel && findLabel.offsetWidth <= 1) {
				toggleButton.classList.add('x-toggle-password--no-label');
			}
			toggleButton.setAttribute('aria-label', showLabel);
			toggleButton.setAttribute('data-hook', 'toggle-password');
			toggleButton.textContent = showText;
			toggleButton.type = 'button';
			passwordInput.parentElement.style.position = 'relative';
			passwordInput.parentElement.insertBefore(toggleButton, passwordInput.nextSibling);
		});

		const togglePasswordButtons = document.querySelectorAll('[data-hook="toggle-password"]');

		if (togglePasswordButtons.length > 0) {
			togglePasswordButtons.forEach(function (togglePasswordButton) {
				togglePasswordButton.addEventListener('click', function () {
					let closestInput = getPreviousSibling(this, 'input');

					if (closestInput.type === 'password') {
						closestInput.type = 'text';
						this.textContent = hideText;
						this.setAttribute('aria-label', hideLabel);
					}
					else {
						closestInput.type = 'password';
						this.textContent = showText;
						this.setAttribute('aria-label', showLabel);
					}

				});
			});
		}
	}
}());
