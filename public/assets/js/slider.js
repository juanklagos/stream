var scaling = 1.50;
//count
var currentSliderCount = 0;
var videoCount = $(".slider-container").children().length;
var showCount = 5;
var sliderCount = videoCount / showCount;
var controlsWidth = 40;
var scollWidth = 0;
    

$(document).ready(function(){
    // $('.slider-container .slide:nth-last-child(-n+4)').prependTo('.slider-container');
    init();
    
});
$( window ).resize(function() {
    init();
});
function init(){
    // elements
    var win = $('body');
    var sliderFrame = $(".slider-frame");
    var sliderContainer = $(".slider-container");
    var slide = $(".slide");
    var sliderArrowBtn = $(".slider-arrow-btn");

    //counts
    var scollWidth = 0;
    
    //sizes
    // var windowWidth = win.width();
    var windowWidth = win.prop("clientWidth");

    // var frameWidth = win.width() - 80;
    var frameWidth = win.prop("clientWidth") - 80;

    if(windowWidth >= 0 && windowWidth <= 479){
       showCount = 2;
    }
    else if(windowWidth >= 480 &&  windowWidth <= 767){
       showCount = 3;
    }
    else if(windowWidth >= 767 &&  windowWidth <= 1100){
       showCount = 4;
    }
    else if(windowWidth >= 1100 &&  windowWidth <= 1439){
       showCount = 5;
    }
    else{
       showCount = 6;
    }

    var videoWidth = ((windowWidth - controlsWidth * 2) / showCount );
    var videoHeight = Math.round(videoWidth / (16/9));
    
    var videoWidthDiff = (videoWidth * scaling) - videoWidth;
    var videoHeightDiff = (videoHeight * scaling) - videoHeight;
    
  
    
    //set sizes
    sliderFrame.width(windowWidth);
    sliderFrame.height(videoHeight * scaling);

    sliderContainer.height(videoHeight * scaling);
    sliderContainer.width((videoWidth * videoCount) + videoWidthDiff);
    sliderContainer.css("top", (videoHeightDiff / 2));
    sliderContainer.css("margin-left", (controlsWidth));

    sliderArrowBtn.height(videoHeight);
    sliderArrowBtn.css("top", (videoHeightDiff / 2));

    slide.height(videoHeight);
    slide.width(videoWidth);
   

    //hover effect
    if (windowWidth > 991) {
        $(".slide").mouseover(function() {
            $(this).css("width", videoWidth * scaling);
            $(this).css("height", videoHeight * scaling);
            $(this).css("top", -(videoHeightDiff / 2));
            // for first slider card of each set
            if($(".slide").index($(this)) == 0 || ($(".slide").index($(this))) % showCount == 0){
            // do nothing
            }
            // for last card of each set
            else if(($(".slide").index($(this)) + 1) % showCount == 0 && $(".slide").index($(this)) != 0){
                $(this).parent().css("margin-left", -(videoWidthDiff - controlsWidth));
            }
            // for middle cards
            else{
                $(this).parent().css("margin-left", - (videoWidthDiff / 2));
            }
        }).mouseout(function() {
            $(this).css("width", videoWidth * 1);
            $(this).css("height", videoHeight * 1);
            $(this).css("top", 0);
            $(this).parent().css("margin-left", controlsWidth);
        });
    }
    else{
        $(".show-video-details .slide").mouseover(function() {
            $(this).css("width", videoWidth * 1);
            $(this).css("height", videoHeight * 1);
            $(this).css("top", 0);
            $(this).parent().css("margin-left", controlsWidth);

        }).mouseout(function() {
            $(this).css("width", videoWidth * 1);
            $(this).css("height", videoHeight * 1);
            $(this).css("top", 0);
            $(this).parent().css("margin-left", controlsWidth);

        });
    }

    // hover effect with active slide
    $(".show-video-details .slide").mouseover(function() {
        $(this).css("width", videoWidth * 1);
        $(this).css("height", videoHeight * 1);
        $(this).css("top", 0);
        $(this).parent().css("margin-left", controlsWidth);

    }).mouseout(function() {
        $(this).css("width", videoWidth * 1);
        $(this).css("height", videoHeight * 1);
        $(this).css("top", 0);
        $(this).parent().css("margin-left", controlsWidth);

    });

    // controls
    controls(frameWidth, scollWidth);
}
function controls(frameWidth, scollWidth){
    var prev = $(".prev");
    var next = $(".next");
    
    next.on("click", function(){
        console.log(currentSliderCount);
        console.log(sliderCount);
        scollWidth = scollWidth + frameWidth;
        $('.slider-container').animate({
            left: - scollWidth
        }, 300, function(){ 
            if(currentSliderCount >= sliderCount-1){
                $(".slider-container").css("left", 0);
                currentSliderCount = 0;
                scollWidth = 0;
            }else{
                currentSliderCount++;
            }
        });        
    });
    prev.on("click", function(){
        scollWidth = scollWidth - frameWidth;
        $('.slider-container').animate({
            left: + scollWidth
        }, 300, function(){ 
            currentSliderCount--;
        });
        //$(".slider-container").css("left", scollWidth);
    });
};