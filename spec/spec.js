function context(description, spec) {
  describe(description, spec);
};

function createForm() {
  $('body').append('<form>' + fields() + '</form>');
};

function createFields() {
  $('body').append(fields());
};

function fields() {
  return '<label for="name">Name:</label>' +
				 '<input id="name" type="text" />' +

			   '<label for="email">E-mail:</label>' +
			   '<input id="email" type="email" />';
};

function clear() {
	$('form').remove();
	$('label').remove();
	$('input').remove();
};

describe('Flury', function() {
	describe('options', function() {
		beforeEach(function() { createFields(); });
		afterEach(function()  { clear(); });

		it ('has the right values', function() {
			// given
			$('#name').flury();

			// when
			var opt = $.fn.flury.defaults

			// then
			expect(opt.include).toBe(':input')
			expect(opt.exclude).toBe('input[type="button"], input[type="checkbox"], input[type="image"], input[type="radio"], input[type="submit"]')
		});
	});

	describe('Input Bind', function() {
		beforeEach(function() { createFields(); });
		afterEach(function()  { clear(); });

    it ('is chainable', function() {
      // given
      var field = $('#name');

      // when
      var returned = field.flury()[0];

      // then
      expect(returned).toBe(field[0]);
    });

		it ('does not ignore #exclude', function() {
      // given
      var field = $('#name');

      // when
      field.flury({ exclude: 'input:text' });

      // then
      expect(field.prev('label')).not.toHaveCss({ position: 'absolute' });
    });

		describe('Class', function() {
			it ('receives the flury class', function() {
	      // given
	      var field = $('#name');

	      // when
	      field.flury();

	      // then
	      expect(field.prev('label')).toHaveClass('flury');
	    });
	  });

		context('on bind', function() {
      it ('applies absolute style', function() {
        // given
        var field = $('#name');

        // when
        field.flury();

        // then
        expect(field.prev('label')).toHaveCss({ position: 'absolute' });
      });
    });

    context('on focus', function() {
      it ('hides the label', function() {
        // given
        var field = $('#name').flury();

        // when
        field.focus();

        // then
        expect(field.prev('label')).toBeHidden();
      });

      context('with data inside', function() {
        it ('keeps label hidden', function() {
          // given
          var field = $('#name').val('some data').flury();

          // when
          field.focus();

          // then
          expect(field.prev('label')).toBeHidden();
        });
      });
    });

    context('on blur', function() {
      it ('shows the label', function() {
        // given
        var field = $('#name').flury().focus();

        // when
        field.blur();

        // then
        expect(field.prev('label')).toBeVisible();
      });

			it ('does not receives `display: block`, but removes `hidden`', function() {
        // given
        var field = $('#name').flury().focus();

        // when
        field.blur();

        // then
        expect(field.prev('label')).toHaveCss({ position: 'absolute' });
      });

      context('with data inside', function() {
        it ('keeps label hidden', function() {
          // given
          var field = $('#name').flury().val('some data').focus();

          // when
          field.blur();

          // then
          expect(field.prev('label')).toBeHidden();
        });
      });
    });
	});

	describe('Form Bind', function() {
		beforeEach(function() { createForm(); });
		afterEach(function()  { clear(); });

    it ('is chainable', function() {
      // given
      var form = $('form');

      // when
      var returned = form.flury()[0];

      // then
      expect(returned).toBe(form[0]);
    });

    describe('Class', function() {
			it ('receives flury class', function() {
	      // given
	      var form = $('form');

	      // when
	      form.flury();

	      // then
	      expect(form.children('#name, #email').prev('label')).toHaveClass('flury');
	    });

	    context('with deeper fields on markup', function() {
				it ('receives flury class', function() {
		      // given
		      var form = $('form');

		      form.html('<p>' + form.html() + '</p>');

		      // when
		      form.flury();

		      // then
		      expect($('#name, #email').prev('label')).toHaveClass('flury');
		    });
	   	});
	   });

		context('on bind', function() {
      it ('applies absolute style on fields', function() {
        // given
        var form = $('form');

        // when
        form.flury();

        // then
        expect(form.children('label')).toHaveCss({ position: 'absolute' });
      });
    });

    context('on focus', function() {
      it ('hides the label', function() {
        // given
        var field = $('form').flury().children('input:first');

        // when
        field.focus();

        // then
        expect(field.prev('label')).toBeHidden();
      });

      context('with data inside', function() {
        it ('keeps label hidden', function() {
          // given
	        var field = $('form').flury().children('input:first').val('some data');

	        // when
	        field.focus();

	        // then
	        expect(field.prev('label')).toBeHidden();
        });
      });
    });

    context('on blur', function() {
      it ('shows the label', function() {
        // given
        var field = $('form').flury().children('input:first').focus();

        // when
        field.blur();

        // then
        expect(field.prev('label')).toBeVisible();
      });

			it ('does not receives `display: block`, but removes `hidden`', function() {
        // given
        var field = $('form').flury().children('input:first').focus();

        // when
        field.blur();

        // then
        expect(field.prev('label')).toHaveCss({ position: 'absolute' });
      });

      context('with data inside', function() {
        it ('keeps label hidden', function() {
          // given
          var field = $('form').flury().children('input:first').val('some data').focus();

          // when
          field.blur();

          // then
          expect(field.prev('label')).toBeHidden();
        });
      });
    });
	});

	describe('Function', function() {
		beforeEach(function() { createForm(); });
		afterEach(function()  { clear(); });

		describe('#include', function() {
	    it ('binds just text field', function() {
	      // given
	      var form = $('form');

	      // when
	      form.flury({ include: 'input:text' })

	      // then
	      expect(form.children('input:text').prev('label')).toHaveCss({ position: 'absolute' });
	      expect(form.children('input[type="email"]').prev('label')).not.toHaveCss({ position: 'absolute' });
	    });
	  });

    describe('#exclude', function() {
      it ('binds just text field', function() {
        // given
        var form = $('form');

        // when
        form.flury({ exclude: 'input:text' })

        // then
        expect(form.children('input:text').prev('label')).not.toHaveCss({ position: 'absolute' });
        expect(form.children('input[type="email"]').prev('label')).toHaveCss({ position: 'absolute' });
      });
    });

    describe('set', function() {
      it ('is chainable', function() {
        // given
        var form = $('form').flury();

        // when
        var clone = form.flury('set', {}).flury('set', {});

        // then
        expect(clone).toBe(form);
      });

      it ('removes flury class from unbinded fields', function() {
        // given
        var form = $('form').flury();

          // when
          var clone = form.flury('set', { include: 'input:text' });

          // then
          expect(clone.children('#name').prev('label')).toHaveClass('flury');
          expect(clone.children('#email').prev('label')).not.toHaveClass('flury');
      });

      context('form bind', function() {
  	    it ('resets the configurations', function() {
  	      // given
  	      var form = $('form').flury();

  	      // when
  	      var clone = form.flury('set', { include: 'input:text' });

  	      // then
  	      expect(clone.children('#name').prev('label')).toHaveCss({ position: 'absolute' });
  	      expect(clone.children('#email').prev('label')).not.toHaveCss({ position: 'absolute' });
  	    });
      });

      context('one input bind', function() {
        it ('resets the configurations', function() {
          // given
          var field = $('#name').flury();

          // when
          var clone = field.flury('set', { include: 'input[type="email"]' });

          // then
          expect(clone.children('#name').prev('label')).not.toHaveCss({ position: 'absolute' });
        });
      });

      context('couple input bind', function() {
        it ('resets the configurations', function() {
          // given
          var field = $('#name, #email').flury();

          // when
          var clone = field.flury('set', { include: 'input:text' });

          // then
          expect(clone.filter('#name').prev('label')).toHaveCss({ position: 'absolute' });
          expect(clone.filter('#email').prev('label')).not.toHaveCss({ position: 'absolute' });
        });
      });


	    // Remove the .off() does not take effect. Focus is not recognized.
      xit ('does not bind twice', function() {
        // given
        var field = $('#name');

        field.flury('set', {}).flury('set', {});

        spyOn(field, 'focus');

        // when
        field.focus();

        // then
        expect(field.focus).toHaveBeenCalled();
        expect(field.focus.callCount).toEqual(1);
      });
	  });
  });
});
