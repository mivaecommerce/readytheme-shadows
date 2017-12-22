/**
 * Use this file to all in scripts and functions you would like to have globally or on specific
 * pages. You will use this to extend your theme instead of adding code to the core framework files.
 */

var themeFunctionality = {
	init: function () {
		/**
		 * Toggle the `is-open` state of the global account box.
		 */
		(function () {
			var trigger = document.querySelector('[data-hook="show-related"]');

			if (trigger) {
				trigger.addEventListener('click', function (event) {
					var target = document.querySelector('[data-hook="' + trigger.getAttribute('data-target') + '"]');

					event.preventDefault();
					target.classList.toggle('is-open');
				}, false);
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
		$.loadScript(theme_path + 'extensions/navigation/drop-down-navigation.js', function () {
			$.hook('has-drop-down').dropDownNavigation();
		});

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
