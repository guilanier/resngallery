define(['jquery'], function ($) {

	var sT = 10;
	
	var onResize = function () {

		var wH = $(window).height(),
			wW = $(window).width();

		$('.stripe-t').css( 'clip', 'rect(0, auto, '+sT+'px, 0)' );
		$('.stripe-l').css( 'clip', 'rect(0, '+sT+'px, auto, 0)' );
		$('.stripe-b').css( 'clip', 'rect('+(wH-sT)+'px, auto, auto, auto)' );
		$('.stripe-r').css( 'clip', 'rect(auto, auto, auto, '+(wW-sT)+'px)' );
	};

	$(window).resize( onResize );
	onResize();

	$('.background').css({
		'opacity': '1',
	});

});