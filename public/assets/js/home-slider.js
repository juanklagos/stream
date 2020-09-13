$(document).on('ready', function() {

	// initialization

	var scaling = 1.5;

	var showCount = 5;

	var windowWidth = $('body').width();


	// calculation

	var videoWidth = $('.home-slider .slick-slide').width();

	var videoHeight =  Math.round(videoWidth / (16/9));

	var outerHeight = videoHeight * scaling;

	var videoWidthDiff = (videoWidth * 1.5) - videoWidth;


	//set sizes

	$('.home-slider .slick-slide').height(videoHeight);

	$('.home-slider .slick-track').height(outerHeight);


	// hover effect

	if (windowWidth > 991) {

		$(".home-slider .slick-slide").mouseover(function() {

			$(this).css("width", videoWidth * scaling);

			$(this).css("height", videoHeight * scaling);

		}).mouseout(function() {

		    $(this).css("width", videoWidth * 1);

		    $(this).css("height", videoHeight * 1);

		});

	}

	else{

		$(".home-slider .slick-slide").mouseover(function() {

			$(this).css("width", videoWidth * 1);

			$(this).css("height", videoHeight * 1);

		}).mouseout(function() {

		    $(this).css("width", videoWidth * 1);

		    $(this).css("height", videoHeight * 1);

		});

	}

	$(".show-video-details.home-slider .slick-slide").mouseover(function() {

		$(this).css("width", videoWidth * 1);

		$(this).css("height", videoHeight * 1);


	}).mouseout(function() {

	    $(this).css("width", videoWidth * 1);

	    $(this).css("height", videoHeight * 1);

	});

	console.log(videoWidth, videoHeight, outerHeight, videoWidthDiff, "videoWidth");

});