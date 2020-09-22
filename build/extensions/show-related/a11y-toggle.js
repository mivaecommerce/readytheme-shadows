/**
 * A11y Toggles
 * An accessible replacement to the checkbox-hack for toggling sections.
 *
 * By: https://hugogiraudel.com/
 * MIT License: https://github.com/edenspiekermann/a11y-toggle/blob/master/LICENSE
 */

(function () {
	'use strict';

	const distinct = function (value, index, self) {
		return self.indexOf(value) === index;
	};

	let atResizeTimeout;
	let internalId = 0;
	let togglesMap = {};
	let targetsMap = {};

	function $(selector, context) {
		return Array.prototype.slice.call(
			(context || document).querySelectorAll(selector)
		);
	}

	function getClosestToggle(element) {
		if (element.closest) {
			return element.closest('[data-a11y-toggle]');
		}

		while (element) {
			if (element.nodeType === 1 && element.hasAttribute('data-a11y-toggle')) {
				return element;
			}

			element = element.parentNode;
		}

		return null;
	}

	function handleToggle(toggle) {
		let target = toggle && targetsMap[toggle.getAttribute('aria-controls')];

		if (!target) {
			return false;
		}

		let toggles = togglesMap['#' + target.id];
		let isExpanded = target.getAttribute('aria-hidden') === 'false';

		target.setAttribute('aria-hidden', isExpanded);
		toggles.forEach(function (toggle) {
			toggle.setAttribute('aria-expanded', !isExpanded);
		});
	}

	let initA11yToggle = function (context) {
		togglesMap = $('[data-a11y-toggle]', context).reduce(function (acc, toggle) {
			let selector = '#' + toggle.getAttribute('data-a11y-toggle');

			acc[selector] = acc[selector] || [];
			acc[selector].push(toggle);
			return acc;
		}, togglesMap);

		let targets = Object.keys(togglesMap);

		targets.length && $(targets).forEach(function (target) {
			let toggles = togglesMap['#' + target.id];
			let isExpanded = target.hasAttribute('data-a11y-toggle-open');
			let labelledby = [];

			if (toggles[0].offsetWidth > 0 && toggles[0].offsetHeight > 0) {
				toggles.forEach(function (toggle) {
					toggle.id || toggle.setAttribute('id', 'a11y-toggle-' + internalId++);
					toggle.setAttribute('aria-controls', target.id);
					toggle.setAttribute('aria-expanded', isExpanded);
					labelledby.push(toggle.id);
				});
				let distinctLabel = labelledby.filter(distinct);

				target.setAttribute('aria-hidden', !isExpanded);
				target.hasAttribute('aria-labelledby') || target.setAttribute('aria-labelledby', distinctLabel.join(' '));
				target.setAttribute('role', 'region');
			}
			else {
				toggles.forEach(function (toggle) {
					toggle.removeAttribute('id');
					toggle.removeAttribute('aria-controls');
					toggle.removeAttribute('aria-expanded');
				});

				target.removeAttribute('aria-hidden');
				target.removeAttribute('aria-labelledby');
				target.removeAttribute('role');

			}

			targetsMap[target.id] = target;
		});
	};

	let destroyA11yToggle = function () {
		let targets = Object.keys(togglesMap);

		targets.length && $(targets).forEach(function (target) {
			let toggles = togglesMap['#' + target.id];

			toggles.forEach(function (toggle) {
				toggle.removeAttribute('id');
				toggle.removeAttribute('aria-controls');
				toggle.removeAttribute('aria-expanded');
			});

			target.removeAttribute('aria-hidden');
			target.removeAttribute('aria-labelledby');
			target.removeAttribute('role');

			targetsMap[target.id] = target;
		});
	};
	
	let closeA11yToggle = function (trigger) {
		if (trigger) {
			const thisToggle = document.querySelector('#' + trigger.getAttribute('data-a11y-toggle'));
			
			document.addEventListener('mousedown', function (event) {
				if (thisToggle.getAttribute('aria-hidden') === 'false') {
					if (!thisToggle.contains(event.target) && event.target !== trigger) {
						trigger.click();
						event.preventDefault();
					}
				}
			}, false);
		}
	};

	/**
	 * Auto-initialize A11y Toggle when the document is complete.
	 */
	if (document.readyState === 'complete') {
		initA11yToggle();
	}

	/**
	 * This will reinitialize A11y Toggle on `resize` to either enable or destroy
	 * toggles who have their display managed through media queries.
	 */
	window.addEventListener('resize', function () {
		if (atResizeTimeout) {
			window.cancelAnimationFrame(atResizeTimeout);
		}

		atResizeTimeout = window.requestAnimationFrame(function () {
			initA11yToggle();
		});
	}, false);

	document.addEventListener('click', function (event) {
		let toggle = getClosestToggle(event.target);

		handleToggle(toggle);
	});

	document.addEventListener('keyup', function (keyupEvent) {
		if (keyupEvent.key === 'Enter' || keyupEvent.key === ' ') {
			let toggle = getClosestToggle(keyupEvent.target);

			if (toggle && toggle.getAttribute('role') === 'button') {
				handleToggle(toggle);
			}
		}
	});

	window && (window.a11yToggle = initA11yToggle);
	window && (window.a11yToggleDestroy = destroyA11yToggle);
	window && (window.a11yToggleClose = closeA11yToggle);
})();
