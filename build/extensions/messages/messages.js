/**
 * 	Closable Messages
 */
(function () {
	'use strict';
	let closeElements = document.querySelectorAll('[data-hook="message__close"]');

	Array.prototype.forEach.call(closeElements, function (element) {
		let ux_message_closer = element;
		let ux_message = ux_message_closer.parentNode;

		ux_message_closer.addEventListener('click', function (event) {
			event.preventDefault();
			ux_message.classList.add('u-hidden');
		}, false);
	});
}());
