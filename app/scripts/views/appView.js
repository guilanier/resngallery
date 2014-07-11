define([
	'underscore', 
	'backbone', 
	'jquery', 
	'collections/kittensCollection',
	'views/headerView',
	'views/lettersView',
	'views/gallery/galleryView',
	'views/details/detailsView',
	], function (_, Backbone, $, KittensCollection, HeaderView, LettersView, GalleryView, DetailsView) {
	
	var AppView = Backbone.View.extend({

		kittensCollection : null,

		headerView 		  : null,
		galleryView 	  : null,
		detailsView 	  : null,
		lettersView 	  : null,

		initialize: function () {
			
			// Collection
			this.kittensCollection = new KittensCollection();
			this.kittensCollection.fetch( { 
				success: this.onDatasLoaded.bind(this) 
			} );

			// Instantiate the header view
			this.headerView = new HeaderView();
		},

		onDatasLoaded: function () {

			// Initialize gallery
			this.galleryView = new GalleryView({ collection: this.kittensCollection });
			this.galleryView.start();

			// Initialize details
			this.detailsView = new DetailsView({ collection: this.kittensCollection });

			// Show letters
			this.lettersView = new LettersView();
			this.lettersView.start();

			$(window).mousemove(this.onMouseMove.bind(this)); 
		},

		openDetails: function (id_) {
			
			if(!this.detailsView.isOpen) this.detailsView.open();
			
			this.detailsView.showDetails(id_);
		},

		closeDetails: function () {

			if(this.detailsView && this.detailsView.isOpen) 
				this.detailsView.close();
		},

		onMouseMove: function (e_) {

			this.lettersView.updateLettersPos(e_.clientX, e_.clientY);
		}

	});

	return AppView;

})