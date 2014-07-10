define(['backbone', 'jquery', 'text!templates/header.html'], function (Backbone, $, template) {

	var HeaderView = Backbone.View.extend({

		el: '.header',

		initialize: function() {
			this.render();
		},

		render: function () {
			this.$el.html( $(template).html() );
		}

	});

	return HeaderView;

});