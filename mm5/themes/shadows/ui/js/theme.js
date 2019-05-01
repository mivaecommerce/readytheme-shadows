/**
 * Use this file to all in scripts and functions you would like to have globally or on specific
 * pages. You will use this to extend your theme instead of adding code to the core framework files.
 */

var themeFunctionality = {
	init: function () {
		/**
		 * Load and initialize the Fasten Header extension
		 */
		$.loadScript(theme_path + 'extensions/fasten-header/fasten-header.js');

		/**
		 * Toggle the `is-open` state of the global account box.
		 */
		(function () {
			var trigger = document.querySelector('[data-hook="show-related"]');

			if (trigger) {
				var relatedTarget = document.querySelector('[data-hook="' + trigger.getAttribute('data-target') + '"]');

				trigger.addEventListener('click', function (event) {
					event.preventDefault();
					relatedTarget.classList.toggle('is-open');
				}, false);

				document.addEventListener('mousedown', function (event) {
					if (relatedTarget.classList.contains('is-open')) {
						if (!relatedTarget.contains(event.target) && event.target !== trigger) {
							relatedTarget.classList.toggle('is-open');
						event.preventDefault();
						}
					}
				}, false);

				window.addEventListener('keydown', function (event) {
					if (event.defaultPrevented) {
						return;
					}

					switch (event.key) {
						case 'Escape':
							if (relatedTarget.classList.contains('is-open')) {
								relatedTarget.classList.toggle('is-open');
							}
							break;
						default:
							return;
					}

					event.preventDefault();
				}, true);
			}
		})();


		/**
		 * Load and initialize the Mini-Basket extension
		 */
		$.loadScript(theme_path + 'extensions/mini-basket/mini-basket.js', function () {
			miniBasket.init();
		});


		/**
		 * Load and initialize the Drop-Down Navigation extension
		 */
		$.loadScript(theme_path + 'extensions/navigation/transfigure-navigation.js', function () {
			$.hook('has-drop-down').transfigureNavigation();
		});


		/**
		 * Load and initialize the Collapsing Breadcrumbs extension
		 */
		$.loadScript(theme_path + 'extensions/breadcrumbs/collapsing/collapsing-breadcrumbs.js');

	},
	jsSFNT: function() {
	},
	jsCTGY: function() {
	},
	jsPROD: function() {
		/**
		 * Load and initialize the Quantify extension
		 */
		$.loadScript(theme_path + 'extensions/quantify/quantify.js');

		/**
		 * Load and initialize the AJAX Add to Cart extension
		 */
		$.loadScript(theme_path + 'extensions/product-layout/ajax-add-to-cart.js');

		/**
		 * Load and initialize the Roundabout extension
		 */
		$.loadScript(theme_path + 'extensions/carousel/roundabout.js', function () {
			$.hook('product-carousel').roundabout({
				group: true,
				groupTiny: 1,
				groupSmall: 1
			});
		});
	},
	jsPLST: function() {
	},
	jsSRCH: function() {
	},
	jsBASK: function() {
		/**
		 * Load and initialize the Quantify extension
		 */
		$.loadScript(theme_path + 'extensions/quantify/quantify.js');
	},
	jsORDL: function() {
	},
	jsOCST: function() {
	},
	jsOSEL: function() {
	},
	jsOPAY: function() {
	},
	jsINVC: function() {
	}
};
