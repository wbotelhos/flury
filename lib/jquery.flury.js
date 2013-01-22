/*!
 * jQuery Flury - A Labeler Field
 * --------------------------------------------------------------------
 *
 * jQuery Flury is a plugin to transform a label on a field descriptor.
 *
 * Licensed under The MIT License
 *
 * @version        0.2.0
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

				var self 		= $(this).off('.flury'),
						fields	= methods._fields.call(this);

				fields.each(function() {
					methods._style.call(this);
	    		methods._hide.call(this);
	    		methods._bind.call(this)
	    	});

  			self.data({ 'settings': this.opt, 'flury': true });
  		});
		}, _fields: function() {
			var self 		= $(this),
					fields 	= undefined;

			if (self.is('form')) {
				fields = self.find(this.opt.include).not(this.opt.exclude);
			} else {
				fields = self.filter(function() {

					var that = $(this);
					return that.is(this.opt.include) && !that.is(this.opt.exclude);
				});
			}

			return fields.prev('label').addClass('flury').end();
		}, _style: function() {
	    var self	= $(this),
	    		label = self.prev('label'),
	    		opt		= this.opt || self.closest('form')[0].opt;

	    if (opt.inline) {
	    	label.css('position', 'absolute');
	    }
	  }, _bind: function() {
	    return $(this).on('focus.flury blur.flury', function(evt) {
	      var self 	= $(this),
	          label = self.prev('label');

	      if (evt.type == 'focus') {
	        label.hide();
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
			var self = $(this);

			self.each(function() {
				var that		= $(this),
						actual 	= that.data('settings'),
						news		= $.extend({}, actual, settings),
						fields	= that.is('form') ? that.find(actual.include).not(actual.exclude) : that,
						labels 	= fields.prev('label').removeClass('flury');

				if (this.opt.inline) {
		    	labels.css('position', '');
		    }

				that.flury(news);
			});

			return self;
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
		exclude : 'input[type="button"], input[type="checkbox"], input[type="image"], input[type="radio"], input[type="submit"]',
		include	: ':input',
		inline	: true
	};

})(jQuery);
