/*!
 * jQuery Flury - A Labeler Field
 * --------------------------------------------------------------------
 *
 * jQuery Flury is a plugin to transform a label on a field descriptor.
 *
 * Licensed under The MIT License
 *
 * @version        0.1.0
 * @since          2012-12-09
 * @author         Washington Botelho
 * @documentation  wbotelhos.com/flury
 *
 * --------------------------------------------------------------------
 *
 * 	$('form').flury();
 *
 *	<form>
 * 		<label for="name">Name:</label>
 * 		<input id="name" type="text" />
 *	</form>
 *
 */

;(function($) {

	var methods = {
		init: function(settings) {
			return this.each(function() {
				this.opt = $.extend({}, $.fn.flury.defaults, settings);

				var self 		= $(this),
						fields	= methods._fields.call(this);

				fields.each(function() {
					methods._style.call(this);
	    		methods._hide.call(this);
	    		methods.bind.call(this)
	    	});

  			self.data({ 'settings': this.opt, 'flury': true });
  		});
		}, _fields: function() {
			var self = $(this);
			return self.is('form') ? self.find(this.opt.include).not(this.opt.exclude) : self;
		}, _style: function() {
	    $(this).prev('label').css({ 'position': 'absolute' });
	  }, bind: function() {
	    return $(this).on('focus blur', function(evt) {
	      var self 	= $(this),
	          label = self.prev('label');

	      if (evt.type == 'focus') {
	        label.hide()
	      } else if (self.val() == '') {
	        label.css('display', '');
	      }
	    });
	  }, _hide: function() {
	    return $(this).each(function() {
	      var self = $(this);

	      if (self.val() != '') {
	        self.prev('label').hide();
	      }
	    })
		}, set: function(settings) {
			var clones = [];

			$(this).each(function() {
				var self		= $(this),
						actual 	= self.data('settings'),
						news		= $.extend({}, actual, settings),
						fields	= self.is('form') ? self.find(actual.include).not(actual.exclude) : self;

				fields.each(function() {
					$(this).prev('label').css('position', '');
				});

				var clone = self.clone();

				clones.push(clone);

				clone.insertBefore(self)

				self.remove();

				clone.flury(news)
			});

			return clones.length == 1 ? clones[0] : clones;
		}
	};

	$.fn.flury = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist!');
		}
	};

	$.fn.flury.defaults = {
		include: ':input',
		exclude: 'input[type="button"], input[type="checkbox"], input[type="image"], input[type="radio"], input[type="submit"]'
	};

})(jQuery);
