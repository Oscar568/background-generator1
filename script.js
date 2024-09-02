// Global UI object
var UI = UI || {};

// Generic methods
UI.Generic = (function ($) {
	var my = {};

	// init methods
	my.init = function () {

		if (this.Browser.detectIE() == 6) {
			//this.Browser.pngFix("*");
		}

		my.Polyfills.trim();

		this.Navigation.externalLinks();
	};

	// Browser methods
	my.Browser = {};
	my.Browser.detectIE = function () {
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
			return Number(RegExp.$1);
		} else {
			if (window.devicePixelRatio) {
				return "safari";
			} else {
				return 0;
			}
		}
	};
	my.Browser.pngFix = function (elem) {
		DD_belatedPNG.fix(elem);
	};

	// Layout methods
	my.Layout = {};
	my.Layout.evenHeights = function (target) {
		var root = this,
			highest = 0;

		$(target).each(function () {
			if ($(this).height() > highest) {
				highest = $(this).height();
			}
		});
		$(target).each(function () {
			if (root.ie === 6) {
				$(this).height(highest);
			} else {
				$(this).css("min-height", highest + "px");
			}
		});
	};

	// Navigation methods
	my.Navigation = {};
	my.Navigation.externalLinks = function () {
		var message = UI.Localisation.externalLinkTitle,
			title = null;

		$("a[href^='http']:not([href^='" + location.hostname + "'])").each(function () {
			title = $(this).attr("title") || $(this).text();
			$(this).attr("title", title.trim() + message);

			$(this).click(function (e) {
				window.open($(this).attr("href"));
				e.preventDefault();
			});
		});
	};
	my.Navigation.scrollTo = function (element, speed, changeHash) {
		var target;
		speed = speed || 400;

		if ($(element).length > 0) {
			target = $(element).offset().top;

			$('html:not(:animated), body:not(:animated)').animate(
				{ scrollTop: target },
				speed,
				function () {
					if (changeHash === true) {
						window.location.hash = element;
					}
				}
			);
		}
	};

	// Polyfills
	my.Polyfills = {};
	my.Polyfills.trim = function() {
		if (typeof String.prototype.trim !== 'function') {
			String.prototype.trim = function () {
				return this.replace(/^\s+|\s+$/g, '');
			}
		}
	};

	// return Generic object
	return my;

} (jQuery));

UI.Generic.init();