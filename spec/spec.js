describe('Flury', function() {

	beforeEach(function() {
		$('body').append(
			'<form>' +
			  '<label for="name">Name:</label>' +
			  '<input id="name" type="text" />' +
			  '<label for="email">E-mail:</label>' +
			  '<input id="email" type="email" />' +
			'</form>'
		);
	});

	afterEach(function() {
		$('form').remove();
	});

	describe('channing', function() {
		it ('is chainable', function() {
			// given
			var form	= $('form'),
					clazz	= 'some-class';

			// when
			form.flury().addClass(clazz);

			// then
			expect(form).toHaveClass(clazz);
		});
	});

	describe('default configurations', function() {
		it ('apply absolute style', function() {
			// given
			var form = $('form').flury();

			// when
			var opt = $.fn.flury.defaults

			// then
			expect(opt.include).toBe(':input')
			expect(opt.exclude).toBe('input[type="button"], input[type="checkbox"], input[type="image"], input[type="radio"], input[type="submit"]')
		});
	});

	describe('on bind', function() {
		it ('apply absolute style', function() {
			// given
			var self = $('#name');

			// when
			self.flury();

			// then
		  expect(self.prev('label')).toHaveCss({ position: 'absolute' });
		});
	});

	describe('on focus', function() {
		it ('hide the label', function() {
			// given
			var self = $('#name').flury();

			// when
			self.focus();

			// then
		  expect(self.prev('label')).toBeHidden();
		});

		describe('with data inside', function() {
			it ('keeps label hidden', function() {
				// given
				var self = $('#name').val('some data').flury();

				// when
				self.focus();

				// then
			  expect(self.prev('label')).toBeHidden();
			});
		});
	});

	describe('on blur', function() {
		it ('show the label', function() {
			// given
			var self = $('#name').flury();

			self.focus();

			// when
			self.blur();

			// then
		  expect(self.prev('label')).toBeVisible();
		});

		describe('with data inside', function() {
			it ('keeps label hidden', function() {
				// given
				var self = $('#name').flury();

				self.val('some data');
				self.focus()

				// when
				self.blur();

				// then
			  expect(self.prev('label')).toBeHidden();
			});
		});
	});

	describe('binding on form', function() {
		beforeEach(function() {
			this.form = $('form').flury();
		});

		it ('apply name field', function() {
			// given

			var name = this.form.children('#name');

			// when
			name.focus();

			// then
		  expect(name.prev('label')).toBeHidden()
		});

		it ('apply email field', function() {
			// given
			var email = this.form.children('#email');

			// when
			email.focus();

			// then
		  expect(email.prev('label')).toBeHidden()
		});
	});

	describe('#include', function() {
		it ('bind just text field', function() {
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
		it ('bind just text field', function() {
			// given
			var form = $('form');

			// when
			form.flury({ exclude: 'input:text' })

			// then
			expect(form.children('input:text').prev('label')).not.toHaveCss({ position: 'absolute' });
			expect(form.children('input[type="email"]').prev('label')).toHaveCss({ position: 'absolute' });
		});
	});

	describe('on single bind', function() {
		it ('ignores #exclude', function() {
			// given
			var self = $('#name');

			// when
			self.flury({ include: 'input:text' });

			// then
		  expect(self.prev('label')).toHaveCss({ position: 'absolute' });
		});
	});

	describe('set', function() {
		it ('reset the configurations', function() {
			// given
			var self = $('form').flury();

			// when
			var clone = self.flury('set', { include: 'input:text' });

			// then
		  expect(clone.children('#name').prev('label')).toHaveCss({ position: 'absolute' });
		  expect(clone.children('#email').prev('label')).not.toHaveCss({ position: 'absolute' });
		});
	});
});
