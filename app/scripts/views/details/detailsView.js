define([
	'underscore', 
	'backbone', 
	'jquery',
	'app',
	'handlebars',
	'tweenmax',
	'text!templates/details.html'
	], function (_, Backbone, $, app, Handlebars, TweenMax, template) {

	var DetailsView = Backbone.View.extend({

		el: '.details',
		template: Handlebars.compile( $(template).html() ),
		isOpen: false,
		events: {
			'click a[data-link]': 'onNavLinkClicked'
		},

		initialize: function () {

		},

		open: function () {

			this.$el.show();
			this.isOpen = true;
			
			TweenMax.set(this.$el, { scaleX: .9, scaleY: .9, alpha: 0 });
			TweenMax.to(this.$el, .3, { scaleX: 1, scaleY: 1, alpha: 1 });
		},

		close: function () {

			this.isOpen = false;

			TweenMax.to(this.$el, .3, { scaleX: .9, scaleY: .9, alpha: 0, onComplete: this.onCloseComplete.bind(this) });
		},

		onCloseComplete: function () {
			this.$el.hide();
		}, 

		// Render and play the animation showing the details
		showDetails: function (id_) {

			this.model = this.collection.findWhere({name: id_});

			this.render();

			TweenMax.set(this.$el.find('.details_wrapper_info'), { alpha: 0, x: -50 });
			TweenMax.set(this.$el.find('.details_wrapper_img'), { alpha: 0 });

			TweenMax.to(this.$el.find('.details_wrapper_info'), .3, { alpha: 1, x: 0 });
			TweenMax.to(this.$el.find('.details_wrapper_img'), .3, { alpha: 1, delay: .1 });
		},

		hideDetails: function () {

			TweenMax.to(this.$el.find('.details_wrapper_info'), .3, { alpha: 0, x: -50 });
			TweenMax.to(this.$el.find('.details_wrapper_img'), .3, { alpha: 0, delay: .2 });
		},

		// On link click, play the hide animation and navigate to the router when the animation is over 
		onNavLinkClicked: function (e_) {

			e_.preventDefault();
			var d = 500;
			var self = this;
			this.hideDetails();
			_.delay(this.navigateTo,
				d, 
				$(e_.currentTarget).data('link')
			)
		},

		navigateTo: function (id_) {
			app.router.navigate('/details/'+id_+'', { trigger: true });
		},

		render: function () {

			var previousModel  = this.collection.models[_.indexOf(this.collection.models, this.model) - 1];
			var nextModel 	   = this.collection.models[_.indexOf(this.collection.models, this.model) + 1];

			this.$el.html( this.template({ 
				name 		  : this.model.get('name'),
				description   : this.model.get('description'),
				src 		  : './images/img/' + this.model.get('src'),
				previousModel : function () { if(previousModel != null) return previousModel.get('name'); },
				nextModel     : function () { if(nextModel != null) return nextModel.get('name');}
			}));

			// Set the background color
			this.$el.css('background-color', this.model.get('color'));

			return this;
		}
	});

	return DetailsView;

});