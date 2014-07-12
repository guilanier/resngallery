define([
	'backbone',
	'jquery',
	'tweenmax',
	'text!templates/letters.html'
], function (Backbone, $, TweenMax, template) {

	var LettersView = Backbone.View.extend({

		el: '.letters',

		initialize: function() {
			this.render();
		},

		start: function () {

			this.setLettersPos();

			TweenMax.staggerTo(this.$el.find('.letters_char'), 1, {
				alpha : 1,
				scaleX: 1,
				scaleY: 1,
				startAt: { scaleX: 0.3, scaleY: 0.3 },
				delay: 5
			}, 0.3);
		},

		setLettersPos: function () {
			
			var wW	= $(window).width();
			var wH	= $(window).height();
			var numLetters = this.$el.find('.letters_char').length;

			this.$el.find('.letters_char').each(function (i, el) {

				var posX = (wW * 0.5) - (getRandomArbitrary(-1, 1) * (wW * 0.3));
				
				TweenMax.set(el, {
					x: posX,
					y: (wH / numLetters) * i
				});

				$(el).data('initposX', posX)
					 .data('initposY', (wH / numLetters) * i)
					 .data('dep', 300*Math.random());
			});
		},

		/**
		 * Update the letters position with the position of the mouse on the screen
		 * @param  {[Number]} x_
		 * @param  {[Number]} y_
		 */
		updateLettersPos: function (x_, y_) {

			var rX =  (x_ / $(window).width() * 2) - 1;
			var rY =  (y_ / $(window).height() * 2) - 1;

			this.$el.find('.letters_char').each(function (i, el) {
				TweenMax.set(el, {
					x: Math.floor($(el).data('initposX') + ( ( $(el).data('dep')*0.3 ) * rX )),
					y: Math.floor($(el).data('initposY') + ( ( $(el).data('dep')*0.3 ) * rY )),
				});
			});
		},

		render: function () {
			this.$el.html( $(template).html() );
		}

	});

	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}

	return LettersView;

});