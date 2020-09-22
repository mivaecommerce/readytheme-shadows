/**
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 |m|i|n|i|B|a|s|k|e|t|
 +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *
 * This is an extension to use the mini-basket functionality of Miva in an
 * off-canvas method.
 */

const miniBasket = (function (document) {
	'use strict';

	let mbElement = document.querySelector('[data-hook="mini-basket"]');
	let mbContent = mbElement.querySelector('[data-hook="mini-basket__content"]');
	let publicMethods = {}; // Placeholder for public methods
	let defaults = {
		closeOnBackgroundClick: true,
		closeOnEscClick: true
	};
	let openTrigger;

	/**
	 * Merge two or more objects. Returns a new object.
	 * Set the first argument to `true` for a deep or recursive merge [optional]
	 * @private
	 * @returns {Object}	Merged values of defaults and options
	 */
	let extend = function () {

		// Variables
		let extended = {};
		let deep = false;
		let i = 0;
		let length = arguments.length;

		// Check if a deep merge
		if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		let merge = function (obj) {
			for (let prop in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, prop)) {
					// If deep merge and property is an object, merge properties
					if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
						extended[prop] = extend(true, extended[prop], obj[prop]);
					}
					else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for (; i < length; i++) {
			let obj = arguments[i];
			merge(obj);
		}

		return extended;

	};

	/**
	 * Toggle the visibility of the mini-basket
	 * @private
	 */
	let toggleMenu = function (event, display) {
		event.preventDefault();
		event.stopPropagation();
		if (display === 'open') {
			mbElement.parentElement.hidden = false;
		}

		setTimeout(function () {
			document.documentElement.classList.toggle('u-overflow-hidden');
			mbElement.classList.toggle('x-mini-basket--open');
			a11yHelper();
		}, 50);

		if (display === 'close') {
			setTimeout(function () {
				mbElement.parentElement.hidden = true;
			}, 300);
		}
	};

	/**
	 * Manage focus for accessibility
	 * @private
	 */
	let a11yHelper = function () {
		const FOCUSABLE_ELEMENTS = [
			'a[href]',
			'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
			'select:not([disabled]):not([aria-hidden])',
			'textarea:not([disabled]):not([aria-hidden])',
			'button:not([disabled]):not([aria-hidden])',
			'[tabindex]:not([tabindex^="-"])'
		];
		let focusableElements = mbContent.querySelectorAll(FOCUSABLE_ELEMENTS);
		let firstFocus = focusableElements[0];
		let lastFocus = focusableElements[focusableElements.length - 1];

		function handleKeyboard(keyEvent) {
			let tabKey = (keyEvent.key === 'Tab' || keyEvent.keyCode === 9);

			function handleBackwardTab() {
				if (document.activeElement === firstFocus) {
					keyEvent.preventDefault();
					lastFocus.focus();
				}
			}

			function handleForwardTab() {
				if (document.activeElement === lastFocus) {
					keyEvent.preventDefault();
					firstFocus.focus();
				}
			}

			if (!tabKey) {
				return;
			}

			if (keyEvent.shiftKey) {
				handleBackwardTab();
			}
			else {
				handleForwardTab();
			}
		}

		if (mbElement.classList.contains('x-mini-basket--open')) {
			openTrigger = document.activeElement;
			mbContent.focus();
			mbContent.addEventListener('keydown', function (keyEvent) {
				handleKeyboard(keyEvent);
			});
		}
		else {
			openTrigger.focus();
			mbContent.removeEventListener('keydown', handleKeyboard);
		}
	};

	/**
	 * Toggle the visibility of the mini-basket
	 * @public
	 */
	publicMethods.toggle = function (event, display) {
		toggleMenu(event, display);
	};

	/**
	 * Initialize the plugin
	 * @public
	 */
	publicMethods.init = function (options) {
		// Merge user options with defaults
		let settings = extend(defaults, options || {});

		// Element.matches() Polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.msMatchesSelector;
		}

		mbElement.parentElement.hidden = true;

		// Open the mini-basket when clicking the trigger
		document.addEventListener('click', function (event) {
			if (!event.target.closest('[data-hook~="open-mini-basket"]')) {
				return;
			}
			toggleMenu(event, 'open');
		}, false);

		// Close the mini-basket when clicking any 'close' triggers
		document.addEventListener('click', function (event) {
			if (!event.target.closest('[data-hook~="close-mini-basket"]')) {
				return;
			}
			toggleMenu(event, 'close');
		}, false);

		// If enabled, close the mini-basket when clicking the background
		if (settings.closeOnBackgroundClick) {
			mbElement.addEventListener('click', function (event) {
				if (event.target === this) {
					toggleMenu(event, 'close');
				}
			}, false);
		}

		// If enabled, close the mini-basket when the `Esc` key is pressed
		if (settings.closeOnEscClick) {
			window.addEventListener('keydown', function (event) {
				let escKey = (event.key === 'Escape');

				if (event.defaultPrevented) {
					return; // Do nothing if the event was already processed
				}

				if (!escKey) {
					return;
				}

				if (escKey) {
					if (mbElement.classList.contains('x-mini-basket--open')) {
						event.preventDefault();
						toggleMenu(event, 'close');
					}
				}
			}, true);
		}
	};

	/**
	 * Public APIs
	 */
	return publicMethods;

}(document));
