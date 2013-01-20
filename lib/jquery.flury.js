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

				var $this 	= $(this),
						fields	= $this.is('form') ? $this.find(this.opt.include).not(this.opt.exclude) : $this;

				fields.each(function() {
					methods.css.call(this);
	    		methods.clear.call(this);
	    		methods.bind.call(this)
	    	});

  			$this.data({ 'settings': this.opt, 'flury': true });
  		});
		}, css: function() {
	    return $(this).prev('label').css({ 'position': 'absolute' });
	  }, bind: function() {
	    return $(this).on('focus blur', function(evt) {
	      var $this = $(this),
	          label = $this.prev('label');

	      if (evt.type == 'focus') {
	        label.hide()
	      } else if ($this.val() == '') {
	        label.css('display', '');
	      }
	    });
	  }, clear: function() {
	    return $(this).each(function() {
	      var $this = $(this);

	      if ($this.val() != '') {
	        $this.prev('label').hide()
	      }
	    })
		}, set: function(settings) {
			var clones = [];

			$(this).each(function() {
				var $this		= $(this),
						actual 	= $this.data('settings'),
						news		= $.extend({}, actual, settings),
						fields	= $this.is('form') ? $this.find(actual.include).not(actual.exclude) : $this;

				fields.each(function() {
					$(this).prev('label').css('position', '');
				});

				var clone = $this.clone();

				clones.push(clone);

				clone.insertBefore($this)

				$this.remove();

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
