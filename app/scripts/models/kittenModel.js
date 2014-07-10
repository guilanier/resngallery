define(['underscore', 'backbone'], function (_, Backbone) {
	var KittenModel = Backbone.Model.extend({

		defaults: {
			pid   		: null,
			name  		: null,
			description : null,
			src   		: null,
			color 		: null
		},

		initialize: function () {
			
		}

	});

	return KittenModel;
});