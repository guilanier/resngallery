define(['underscore', 'backbone', 'models/kittenModel'], function (_, Backbone, Kitten) {
	
	var KittensCollection = Backbone.Collection.extend({

		model      : Kitten,
		colors 	   : ['#98d3eb', '#88d0eb', '#9cf2ef', '#a3edc2', '#b9e79b', '#dfe57f', '#fedf71', '#ffb361', '#ff8753'],
		comparator : 'pid',

		url   : function () {
			return document.URL + '/../datas/images.json'
		},

		initialize: function () {
			this.on('add', this.onModelAdded.bind(this));
		},

		// Pass a new color to the model when it has been added in the collection
		onModelAdded: function (model_) {
			model_.set('pid', this.indexOf(model_));
			model_.set('color', this.colors[ this.indexOf(model_) % this.colors.length ]);
		},

		parse: function ( response_ ) {
			return response_.imgs;
		}

	});

	return KittensCollection;
});