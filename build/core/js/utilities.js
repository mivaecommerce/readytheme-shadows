(function (mivaJS) {}(window.mivaJS || (window.mivaJS = {})));


/**
 * `_hook` is a small utility function for scanning the DOM for `data-hook` attributes.
 * It helps to reduce the need for typing `document.querySelector` or
 * `document.querySelectorAll` multiple times in an application.
 *
 * @param selector | The `data-hook` attribute value you are looking for. Leaving blank
 * or entering '*' will return all `data-hook` elements. This can be useful for debugging,
 * but not much else.
 * @param base | Pass where you want to start your qSA from -  Default = `document`
 * @returns {elements} | Returns either a single element or a NodeList.
 * @private
 */
const _hook = function (selector, base) {
	let context = base || document;
	let elements;
	
	if (!selector || selector === '*') {
		elements = context.querySelectorAll('[data-hook]');
	}
	else {
		elements = context.querySelectorAll('[data-hook~="' + selector + '"]');
	}
	
	return (elements.length === 1) ? elements[0] : elements;
};


/**
 *    jQuery Extensions
 */
$.extend({
	debounced: function (fn, timeout, invokeAsap, ctx) {
		/**
		 * Custom function to allow us to delay events until after the
		 * trigger has ended.
		 *
		 * Example: $(window).on('resize', $.debounced(function () {...DO SOMETHING...}, 100));
		 */
		if (arguments.length === 3 && typeof invokeAsap !== 'boolean') {
			ctx = invokeAsap;
			invokeAsap = false;
		}
		let timer;

		return function () {
			let args = arguments;

			ctx = ctx || this;
			invokeAsap && !timer && fn.apply(ctx, args);
			clearTimeout(timer);
			timer = setTimeout(function () {
				invokeAsap || fn.apply(ctx, args);
				timer = null;
			}, timeout);
		};
	},
	hook: function (hookName) {
		/**
		 * Custom function to allow us to unify event triggers/binding
		 * using `data-` elements.
		 *
		 * Usage: $.hook('HOOK NAME')...
		 * Example: $.hook('open-menu').on('click', function (e) {e.preventDefault(); ELEMENT.show();});
		 */
		let selector;

		if (!hookName || hookName === '*') {
			// select all data-hooks
			selector = '[data-hook]';
		}
		else {
			// select specific data-hook
			selector = '[data-hook~="' + hookName + '"]';
		}
		return $(selector);
	},
	loadScript: function (url, callback) {
		/**
		 * Loads a JavaScript file asynchronously with a callback, like
		 * jQuery's `$.getScript()` except without jQuery and no.
		 *
		 * Usage:
		 * $.loadScript(FILE_PATH, function () {
		 * 		DO SOMETHING...
		 * });
		 */
		let head = document.getElementsByTagName('head')[0];
		let scriptCalled = document.createElement('script');

		scriptCalled.async = true;
		scriptCalled.src = url;
		scriptCalled.onload = scriptCalled.onreadystatechange = function () {
			if (!scriptCalled.readyState || /loaded|complete/.test(scriptCalled.readyState)) {
				scriptCalled.onload = scriptCalled.onreadystatechange = null;

				if (head && scriptCalled.parentNode) {
					head.removeChild(scriptCalled)
				}

				scriptCalled = undefined;

				if (callback) {
					callback();
				}
			}
		};
		head.appendChild(scriptCalled)
	}
});


/**
 *    HTML Class Name
 *    This function will check if JavaScript is enabled, detect touch and hover
 *    capabilities, and modify the class list as needed.
 */
(function () {
	'use strict';

	let html = document.documentElement;

	html.classList.remove('no-js');
	html.classList.add('js');

	/**
	 * Detect if the user is utilizing a touch interface.
	 */
	window.addEventListener('touchstart', function onFirstTouch() {
		html.classList.add('touch');
		html.setAttribute('data-touch', '');
		window.USER_IS_TOUCHING = true;
		sessionStorage.setItem('USER_IS_TOUCHING', 'true');
		window.USER_CAN_HOVER = false;
		sessionStorage.setItem('USER_CAN_HOVER', 'false');
		window.removeEventListener('touchstart', onFirstTouch, false);
	}, false);

	/**
	 * Detect if the user can hover over elements.
	 */
	window.addEventListener('mouseover', function onFirstHover() {
		window.USER_CAN_HOVER = true;
		sessionStorage.setItem('USER_CAN_HOVER', 'true');
		html.classList.remove('touch');
		html.removeAttribute('data-touch');
		window.USER_IS_TOUCHING = false;
		sessionStorage.setItem('USER_IS_TOUCHING', 'false');
		window.removeEventListener('mouseover', onFirstHover, false);
	}, false);
}());


/**
 * Breakpoints
 * This function will retrieve the breakpoint value set via CSS. You can use
 * this to trigger a function based on the predefined breakpoints rather than
 * a randomly chosen one.
 *
 * Usage:
 * if (breakpoint === 'medium') {
 *     yourFunctionCall();
 * }
 */
// Setup the breakpoint variable
let breakpoint;

// Get the current breakpoint
let getBreakpoint = function () {
	return window.getComputedStyle(document.body, '::before').content.replace(/\"/g, '');
};

// Setup a timer
let timeout;

// Calculate breakpoint on page load
breakpoint = getBreakpoint();

// Listen for resize events
window.addEventListener('resize', function (event) {
	// If there's a timer, cancel it
	if (timeout) {
		window.cancelAnimationFrame(timeout);
	}

	// Setup the new requestAnimationFrame()
	timeout = window.requestAnimationFrame(function () {
		breakpoint = getBreakpoint();
	});

}, false);


(function () {
	/**
	 * Let's start by checking if the visitor is using IE11 by checking
	 * for the presence of the MS Input Method Editor API, this will
	 * return true for IE11 and false on Edge and all other IE versions.
	 * If they're using IE11, load the `polyfills.js` file and initialise.
	 *
	 * NOTE: This may be removed in future versions of the framework as
	 * browser compatibility and support changes.
	 */
	if (!!window.MSInputMethodContext && !!document.documentMode) {
		(function () {
			'use strict';
		
			/**
			 * Although we will support Internet Explorer 11 for the near future,
			 * we are still posting a notice that they should use a more up-to-date
			 * browser.
			 */
			var bodyElement = document.querySelector('body');
			var message = document.createElement('div');
			var messageContent = 'You are using an <strong>outdated</strong> browser.<br />Please <a href="//browsehappy.com/" target="_blank" rel="nofollow">upgrade your browser</a> to improve your experience.';
		
			document.documentElement.classList.add('ie' + document.documentMode);
			message.classList.add('x-messages');
			message.classList.add('x-messages--update-browser');
			message.classList.add('u-over-everything');
			message.classList.add('x-messages--info');
			message.innerHTML = messageContent;
			bodyElement.insertBefore(message, bodyElement.firstChild);
			sessionStorage.setItem('outdated', 'true');
			console.warn('Out Of Date Browser');
		}());
	}
}());
