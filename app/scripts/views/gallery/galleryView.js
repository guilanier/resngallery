	define([
	'underscore', 
	'backbone', 
	'jquery',
	'timelinemax',
	'draggable',
	'iscroll',
	'views/gallery/galleryThumbnailView'
	], function (_, Backbone, $, TimelineMax, Draggable, IScroll, GalleryThumbnailView) {

	var GalleryView = Backbone.View.extend({

		el: '.gallery',
		thumbnails: [],
		scroll: null,

		initialize: function () {
			this.render();
		},

		start: function () {
			this.launchThumbsIntroAnim();
		},

		launchThumbsIntroAnim: function () {

			var wW = $(window).width();
			var wH = $(window).height();

			// Get the thumbnbails view elements to wrap in timeline
			var thumbnailsDOM = _.map(this.thumbnails, this.getThumbnailDom, this);

			// Configure timeline animation
			var tl = new TimelineMax({ onComplete: this.onIntroComplete.bind(this) });
			tl.staggerTo(thumbnailsDOM, .3, { 
					y: 0,
					alpha: 1,
					startAt:{ 
						y: -wH * .5, 
						x: (wW * .5) - 115, 
						scaleX:.14, 
						scaleY:.1, 
						rotation: '45deg'
					}	
				},
			.2);
			tl.addCallback(this.playReorderAnim.bind(this))
			  .to(thumbnailsDOM, .3, { rotation: 0, delay: .15 * thumbnailsDOM.length })
			  .to(thumbnailsDOM, .5, { scaleX: 1 })
			  .to(thumbnailsDOM, .3, { scaleY: 1 })
			  .staggerTo($(thumbnailsDOM).find('.thumbnail_img-wrapper'), .3, { alpha: 1 }, .2);
		},

		onIntroComplete: function () {

			// Make the thumbnails draggable
			Draggable.create('.gallery_thumbnail', {
				type		:'x',
				throwProps  : false,
				onDragStart : this.onThumbnailDragStart.bind(this),
				onDragEnd 	: this.onThumbnailDragEnd.bind(this)
			});

			// Make the gallery horizontally scrollable
			this.scroll = new IScroll(this.el, {
				mouseWheel : true,
				scrollbars : true,
				scrollX    : true,
				scrollY    : false,
				interactiveScrollbars: true
			});
		},

		sortThumbnails: function () {

			// Rearrange the array of thumbnails by the x position of the elements
			this.thumbnails = _.sortBy(this.thumbnails, function(thumbnail){	
				return thumbnail.el._gsTransform.x;
			});

			// Reorder the collection by model's id and according the position of the thumbnails
			for (var i = 0; i < this.thumbnails.length; i++) {
				this.thumbnails[i].model.set('pid', i);
			};
			this.collection.sort();

			this.playReorderAnim();
		},
		
		playReorderAnim: function () {

			var thumbSpacing = 20;
			var thumbWidth   = 232;
			var tl = new TimelineMax();
			// Play the animation of reordering thumbnails
			for (var i = 0; i < this.thumbnails.length; i++) {
				tl.to(this.thumbnails[i].el, .2, { x: thumbSpacing + (thumbSpacing + thumbWidth) * i }, "-=0.1")
			};

			// Set the size of the wrapper
			var wrapperSize = thumbSpacing + ((thumbSpacing + thumbWidth) * this.thumbnails.length);
			this.$thumbnailsWrapper.width(wrapperSize);
		},

		onThumbnailDragStart: function (e_) {
			this.scroll.disable();
		},
		
		// Listening when a thumbnail has been dragged
		onThumbnailDragEnd: function (e_) {
			this.scroll.enable();
			this.sortThumbnails();
		},

		// Create a new thumbnail based on kitten model
		createThumbnail: function (model) {
			return new GalleryThumbnailView({model: model});	
		},

		getThumbnailDom: function (view) {
			return view.render().el;	
		},

		render: function () {

			this.$thumbnailsWrapper = this.$el.find('.gallery_thumbnails-wrapper')

			this.thumbnails = this.collection.map(this.createThumbnail, this);

			this.$thumbnailsWrapper.append(_.map(this.thumbnails, this.getThumbnailDom, this));
		}
	});

	return GalleryView;

});