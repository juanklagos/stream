$(document).on('ready', function() {
	$(".mylist-slider").slick({
		dots: false,
		arrow: true,
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 6,
		infinite:false,
		responsive: [
			{
				breakpoint: 1440,
			    settings: {
			        slidesToShow: 5,
			        slidesToScroll: 5,
			    }
			}, 
			{
				breakpoint: 1100,
			    settings: {
			        slidesToShow: 4,
			        slidesToScroll: 4,
			    }
			}, 
			{
				breakpoint: 768,
			    settings: {
			        slidesToShow: 3,
			        slidesToScroll: 3,
			    }
			}, 
			{
				breakpoint: 576,
			    settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2,
			    }
			}, 
		]
	});

	$(".recent-slider").slick({
		dots: false,
		arrow: true,
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 6,
		infinite:false,
		responsive: [
			{
				breakpoint: 1440,
			    settings: {
			        slidesToShow: 5,
			        slidesToScroll: 5,
			    }
			}, 
			{
				breakpoint: 1100,
			    settings: {
			        slidesToShow: 4,
			        slidesToScroll: 4,
			    }
			}, 
			{
				breakpoint: 768,
			    settings: {
			        slidesToShow: 3,
			        slidesToScroll: 3,
			    }
			}, 
			{
				breakpoint: 576,
			    settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2,
			    }
			}, 
		]
	});

	$(".episode-slider").slick({
		dots: false,
		arrow: true,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		infinite:false,
	});
	$(".trailer-slider").slick({
		dots: false,
		arrow: true,
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1
	});
	$(".more-like-slider").slick({
		dots: false,
		arrow: true,
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1
	});
});