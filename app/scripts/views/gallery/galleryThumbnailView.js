define([
	'backbone', 
	'underscore', 
	'jquery', 
	'handlebars',
	'app',
	'text!templates/thumbnail.html'
	], function (Backbone, _, $, Handlebars, app, template) {
	
	var GalleryThumbnailView = Backbone.View.extend({

		tagName   : 'div',
		className : 'gallery_thumbnail',
		template  : Handlebars.compile( $(template).html() ),

		initialize: function () {

		},

		render: function () {

			this.$el.html( this.template( this.model.toJSON() ) );			
			// Set the color of the thumbnail_overlay
			this.$el.css( { 'background-color': this.model.get('color') } )

			return this;
		}

	});

	return GalleryThumbnailView;

})