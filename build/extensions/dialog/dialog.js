/**
 * +-+-+-+-+-+-+
 * |d|i|a|l|o|g|
 * +-+-+-+-+-+-+
 *
 * A modal that is fully keyboard accessible. Keyboard focus will lock to the modal only while open and can be closed
 * by pressing Escape or tabbing to the 'close' button. For non-keyboard navigation, the modal can be closed through
 * clicking on the background.
 *
 * Based on `Accessible modal with tab trap and vanilla JS` by Danielle [https://codepen.io/hidanielle/pen/MyggJJ]
 * Updated version by Matt Zimmermann [https://github.com/influxweb]
 * Version: 1.0.0
 * License: MIT
 */

(function () {
	'use strict';

	/**
	 * Create a dialog object, set the target element, and create a list of focusable elements.
	 * @type {{set: *[], closeTriggers: *[], focused: Element, focusable: string, el: Element, openTriggers: *[], init: function, show: function, hide: function, trap: function, getFocusable: function, getFirstFocusable: function, setInert: function, removeInert: function}}
	 */
	let dialog = {
		set: Array.from(document.querySelectorAll('[data-dialog]')),
		openTriggers: Array.from(document.querySelectorAll('[data-dialog-trigger]')),
		closeTriggers: Array.from(document.querySelectorAll('[data-dialog-close]')),
		focusable: 'a[href], area[href], input:not([disabled]):not([type="hidden"]):not([aria-hidden]), select:not([disabled]):not([aria-hidden]), textarea:not([disabled]):not([aria-hidden]), button:not([disabled]):not([aria-hidden]), object, embed, [tabindex]:not([tabindex^="-"])',
		el: undefined,
		focused: undefined,
		init: function () {},
		show: function () {},
		hide: function () {},
		trap: function () {},
		getFocusable: function () {},
		getFirstFocusable: function () {},
		setInert: function () {},
		removeInert: function () {}
	};


	/**
	 * Validates whether a dialog of the given `data-dialog` exists in the DOM
	 * @param {string} id The data-dialog of the dialog
	 * @returns {boolean}
	 */
	const validateDialogPresence = function validateDialogPresence(id) {
		if (!document.querySelector('[data-dialog=' + id + ']')) {
			console.warn("Dialog: \u2757Seems like you have missed %c'".concat(id, "'"), 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data-dialog somewhere in your code. Refer example below to resolve it.');
			console.warn("%cExample:", 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', "<div class=\"c-dialog\" aria-hidden=\"true\" data-dialog=\"".concat(id, "\"></div>"));
			return false;
		}
	};


	/**
	 * Initialize the dialog, find the focusable children elements, and set up the click handlers.
	 */
	dialog.init = function () {
		dialog.set.forEach(function (dialog) {
			dialog.setAttribute('aria-hidden', 'true');
		});

		dialog.openTriggers.forEach(function (trigger) {
			trigger.addEventListener('click', function (e) {
				e.preventDefault();
				let name = this.dataset.dialogTrigger;

				dialog.el = dialog.set.find(function (value) {
					return value.dataset.dialog === name;
				});
				if (validateDialogPresence(name) !== false) {
					dialog.show();
				}
			});
		});

		dialog.closeTriggers.forEach(function (trigger) {
			trigger.addEventListener('click', function (e) {
				e.preventDefault();
				dialog.hide();
			});
		});

		/**
		 * Close the open dialog when clicking on the background.
		 */
		document.addEventListener('click', function (clickEvent) {
			let clickEventTarget = clickEvent.target;

			if (dialog.el) {
				if (clickEventTarget === dialog.el.firstElementChild) {
					if (dialog.el.getAttribute('aria-hidden') === 'false') {
						clickEvent.preventDefault();
						dialog.hide();
					}
				}
			}
		});

	};


	/**
	 * Capture the current focused element so that you can set focus back to it
	 * when you close the dialog.
	 * Add a class to the `body` to style for dialog.
	 * Hide the rest of the content.
	 * Set `aria-hidden` to `false`
	 * Add class to dialog.
	 * Set focus to first focusable element from list created in init function.
	 */
	dialog.show = function () {
		document.body.appendChild(dialog.el);
		dialog.setInert();

		document.body.classList.add('has-dialog');
		dialog.focused = document.activeElement;
		dialog.el.setAttribute('aria-hidden', 'false');

		// Focus the first focusable item in the dialog.
		dialog.getFirstFocusable().focus();
		dialog.el.onkeydown = function (e) {
			dialog.trap(e);
		};
	};


	/**
	 * Remove `body` classes that were added.
	 * Reset `aria-hidden` values from container.
	 * Reset `aria-hidden` values on dialog.
	 * Remove show class from dialog.
	 * Set focus to previously focused element.
	 */
	dialog.hide = function () {
		document.body.classList.remove('has-dialog');
		dialog.el.setAttribute('aria-hidden', 'true');
		dialog.removeInert();
		dialog.focused.focus();
	};


	/**
	 * Traps the tab key inside of the context, so the user can't accidentally get stuck behind it.
	 * Note that this does not work for VoiceOver users who are navigating with the VoiceOver commands, only for default
	 * tab actions. We would need to implement something like the inert attribute for that (https://github.com/WICG/inert).
	 *
	 * If key is `esc`, close the dialog.
	 * If key is `tab`
	 * -- Get the current focus.
	 * -- Get the total focusable items to filter through them later.
	 * -- Get the index from the focusable items list of the current focused item.
	 * If key is `shift-tab` (backwards) and you're at the first focusable item, set focus to the last focusable item.
	 * If not `shift-tab` and the current focused item is the last item, set focus to the first focusable item.
	 */
	dialog.trap = function (e) {
		if (e.which === 27) {
			dialog.hide();
		}
		if (e.which === 9) {
			let currentFocus = document.activeElement;
			let focusableChildren = dialog.getFocusable();
			let totalOfFocusable = focusableChildren.length;
			let focusedIndex = focusableChildren.indexOf(currentFocus);

			if (e.shiftKey) {
				if (focusedIndex === 0) {
					e.preventDefault();
					focusableChildren[totalOfFocusable - 1].focus();
				}
			}
			else {
				if (focusedIndex === totalOfFocusable - 1) {
					e.preventDefault();
					focusableChildren[0].focus();
				}
			}
		}
	};


	/**
	 * Get all focusable elements inside of the dialog.
	 * @returns {Array} Array of focusable elements
	 */
	dialog.getFocusable = function () {
		return Array.from(dialog.el.querySelectorAll(dialog.focusable));
	};

	/**
	 * Get the first focusable element inside of the dialog.
	 * @returns {Object} A DOM element
	 */
	dialog.getFirstFocusable = function () {
		let focusable = dialog.getFocusable();

		return focusable[0];
	};


	/**
	 * Toggles an 'inert' attribute on all direct children of the <body> that are not the element you passed in. The
	 * element you pass in needs to be a direct child of the <body>.
	 *
	 * Most useful when displaying a dialog/dialog/overlay and you need to prevent screen-reader users from escaping the
	 * dialog to content that is hidden behind the dialog.
	 *
	 * This is a basic version of the `inert` concept from WICG. It is based on an alternate idea which is presented here:
	 * https://github.com/WICG/inert/blob/master/explainer.md#wouldnt-this-be-better-as
	 * Also see https://github.com/WICG/inert for more information about the inert attribute.
	 */
	dialog.setInert = function () {
		Array.from(document.body.children).forEach(function (child) {
			if (dialog.set.indexOf(child) === -1 && child !== dialog.el && child.tagName !== 'LINK' && child.tagName !== 'SCRIPT') {
				child.classList.add('is-inert');
				child.setAttribute('inert', '');
				//child.setAttribute('aria-hidden', 'true');
			}
		});
	};

	dialog.removeInert = function () {
		Array.from(document.body.children).forEach(function (child) {
			if (dialog.set.indexOf(child) === -1 && child !== dialog.el && child.tagName !== 'LINK' && child.tagName !== 'SCRIPT') {
				child.classList.remove('is-inert');
				child.removeAttribute('inert');
				//child.removeAttribute('aria-hidden');
			}
		});
	};


	/**
	 * This is a helper function we will put into `window` to allow for opening of a specific dialog.
	 * @param targetDialog
	 */
	let openDialog = function (targetDialog) {
		dialog.el = dialog.set.find(function (value) {
			return value.dataset.dialog === targetDialog;
		});
		if (validateDialogPresence(targetDialog) !== false) {
			dialog.show();
		}
	};
	window && (window.openDialog = openDialog);


	/**
	 * This is a helper function we will put into `window` to allow for closing of a specific dialog.
	 */
	let closeDialog = function () {
		dialog.hide();
	};
	window && (window.closeDialog = closeDialog);


	/**
	 * This is a helper function we will put into `window` to allow for rescanning of the page when
	 * dynamic content has been added. It will then reinitialize.
	 */
	let reloadDialog = function () {
		dialog.set = Array.from(document.querySelectorAll('[data-dialog]'));
		dialog.openTriggers = Array.from(document.querySelectorAll('[data-dialog-trigger]'));
		dialog.closeTriggers = Array.from(document.querySelectorAll('[data-dialog-close]'));
		dialog.init();
	};
	window && (window.reloadDialog = reloadDialog);


	/**
	 * Initialize the dialog.
	 */
	dialog.init();
})();
