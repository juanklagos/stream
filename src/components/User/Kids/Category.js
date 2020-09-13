import React, {Component} from 'react';

import {Link} from 'react-router-dom';


const $ = window.$;

class KidsCategory extends Component{

    constructor(props) {

        super(props);

        this.state = {
            
            isAuthenticated : this.props.data,
            
        };

    }

    componentDidMount() {

        $(window).load(function() {
		    
            $('.placeholder').each(function () {
                var imagex = $(this);
                var imgOriginal = imagex.data('src');
                var imgOriginalSet = imagex.data('srcset');
                $(imagex).attr('src', imgOriginal);
                $(imagex).attr('srcset', imgOriginalSet);
            });
             
        });

        var scaling = 1.5;

        var windowWidth = $('body').width();

        var videoWidth = $('.sliderthumb').outerWidth();
        
        var videoHeight = Math.round(videoWidth / (16/9));

        var videoSecHeight = (videoHeight * scaling);

        var videoHeightDiff = videoSecHeight - videoHeight;

        var mobileVideosecHeight = videoSecHeight - (videoHeightDiff / 2);

        $('.mylist-slider').height(videoSecHeight);

        $('.home-slider .sliderthumb').height(videoHeight);

        $('.home-slider .sliderthumb').css("margin-top", (videoHeightDiff / 2));

        if (windowWidth > 991) {

            $(".home-slider .sliderthumb").mouseover(function() {

                $(this).css("width", videoWidth * scaling);
                
                $(this).css("height", videoHeight * scaling);

                $(this).css("z-index", 100);

                $(this).css("margin-top", 0);

            })

            $(".home-slider .sliderthumb").mouseout(function() {

                $(this).css("width", videoWidth * 1);
                
                $(this).css("height", videoHeight * 1);

                $(this).css("z-index", 0);

                $(this).css("margin-top", (videoHeightDiff / 2));

            })

        }

        else{
            
            $('.home-slider').height(mobileVideosecHeight);
        
        }

    }

    render(){
        return(
            <div>
                <div className="slider-topbottom-spacing">
                    <h3 className="black-clr capz">category name<i className="fas fa-angle-right ml-2"></i></h3>
                    <div className="video-container">

                        <div className="video-sec mylist-slider kids-sec-slider home-slider slider">
                            <div className="sliderthumb">
                                <img className="sliderthumb-img hoverout-img placeholder" alt="slider-img" 
                                    src="assets/img/placeholder.gif" data-src="assets/img/thumb1.jpg" 
                                    srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x" 
                                    data-srcSet="assets/img/thumb1.jpg 1x,
                                        assets/img/thumb1.jpg 1.5x,
                                        assets/img/thumb1.jpg 2x" />
                                <img className="sliderthumb-img hoverin-img placeholder" alt="slider-img"
                                    src="assets/img/placeholder.gif" data-src="assets/img/thumb8.jpg"
                                    srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x" 
                                    data-srcSet="assets/img/thumb8.jpg 1x,
                                        assets/img/thumb8.jpg 1.5x,
                                        assets/img/thumb8.jpg 2x"  />
                                <Link to="" data-toggle="modal" data-target="#kids-episode">
                                    <div className="kids-sliderthumb-img">
                                        <div className="width-100 text-center">
                                            <img src="assets/img/play-button.png" className="kids-play-btn" alt="play_btn" />
                                        </div>
                                    </div>
                                    <div className="kids-sliderthumb-text">
                                        <div className="width-100">
                                            <div className="display-inline">
                                                <div className="kids-left">frozen</div>
                                                <div className="kids-right">7+</div>
                                            </div>
                                            <div className="white-outline-btn btn">episodes</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>  

                        <div className="video-sec mylist-slider kids-sec-slider home-slider slider">
                            <div className="sliderthumb">
                                <img className="sliderthumb-img hoverout-img placeholder" alt="slider-img" 
                                    src="assets/img/placeholder.gif" data-src="assets/img/thumb2.jpg" 
                                    srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x" 
                                    data-srcSet="assets/img/thumb2.jpg 1x,
                                        assets/img/thumb2.jpg 1.5x,
                                        assets/img/thumb2.jpg 2x" />
                                <img className="sliderthumb-img hoverin-img placeholder" alt="slider-img"
                                    src="assets/img/placeholder.gif" data-src="assets/img/thumb7.jpg"
                                    srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x" 
                                    data-srcSet="assets/img/thumb7.jpg 1x,
                                        assets/img/thumb7.jpg 1.5x,
                                        assets/img/thumb7.jpg 2x"  />
                                <Link to="">
                                    <div className="kids-sliderthumb-img">
                                        <div className="width-100 text-center">
                                            <img src="assets/img/play-button.png" className="kids-play-btn" alt="play_btn" />
                                        </div>
                                    </div>
                                    <div className="kids-sliderthumb-text">
                                        <div className="width-100">
                                            <div className="display-inline">
                                                <div className="kids-left">frozen</div>
                                                <div className="kids-right">7+</div>
                                            </div>
                                            <div className="white-outline-btn btn">episodes</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="video-sec mylist-slider kids-sec-slider home-slider slider">
                            <div className="sliderthumb">
                                <img className="sliderthumb-img hoverout-img placeholder" alt="slider-img" 
                                    src="assets/img/placeholder.gif" data-src="assets/img/thumb3.jpg" 
                                    srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x" 
                                    data-srcSet="assets/img/thumb3.jpg 1x,
                                        assets/img/thumb3.jpg 1.5x,
                                        assets/img/thumb3.jpg 2x" />
                                <img className="sliderthumb-img hoverin-img placeholder" alt="slider-img"
                                    src="assets/img/placeholder.gif" data-src="assets/img/thumb6.jpg"
                                    srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x" 
                                    data-srcSet="assets/img/thumb6.jpg 1x,
                                        assets/img/thumb6.jpg 1.5x,
                                        assets/img/thumb6.jpg 2x"  />	
                                <Link to="">
                                    <div className="kids-sliderthumb-img">
                                        <div className="width-100 text-center">
                                            <img src="assets/img/play-button.png" className="kids-play-btn" alt="play_btn" />
                                        </div>
                                    </div>
                                    <div className="kids-sliderthumb-text">
                                        <div className="width-100">
                                            <div className="display-inline">
                                                <div className="kids-left">frozen</div>
                                                <div className="kids-right">7+</div>
                                            </div>
                                            <div className="white-outline-btn btn">episodes</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="video-sec mylist-slider kids-sec-slider home-slider slider">
                            <div className="sliderthumb">
                                <img className="sliderthumb-img hoverout-img placeholder" alt="slider-img" 
                                    src="assets/img/placeholder.gif" data-src="assets/img/thumb4.jpg" 
                                    srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x" 
                                    data-srcSet="assets/img/thumb4.jpg 1x,
                                        assets/img/thumb4.jpg 1.5x,
                                        assets/img/thumb4.jpg 2x" />
                                <img className="sliderthumb-img hoverin-img placeholder" alt="slider-img"
                                    src="assets/img/placeholder.gif" data-src="assets/img/thumb5.jpg"
                                    srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x" 
                                    data-srcSet="assets/img/thumb5.jpg 1x,
                                        assets/img/thumb5.jpg 1.5x,
                                        assets/img/thumb5.jpg 2x"  />
                                <Link to="">
                                    <div className="kids-sliderthumb-img">
                                        <div className="width-100 text-center">
                                            <img src="assets/img/play-button.png" className="kids-play-btn" alt="play_btn" />
                                        </div>
                                    </div>
                                    <div className="kids-sliderthumb-text">
                                        <div className="width-100">
                                            <div className="display-inline">
                                                <div className="kids-left">frozen</div>
                                                <div className="kids-right">7+</div>
                                            </div>
                                            <div className="white-outline-btn btn">episodes</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="video-sec mylist-slider kids-sec-slider home-slider slider">
                            <div className="sliderthumb">
                                <img className="sliderthumb-img hoverout-img placeholder" alt="slider-img" 
                                    src="assets/img/placeholder.gif" data-src="assets/img/thumb5.jpg" 
                                    srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x" 
                                    data-srcSet="assets/img/thumb5.jpg 1x,
                                        assets/img/thumb5.jpg 1.5x,
                                        assets/img/thumb5.jpg 2x" />
                                <img className="sliderthumb-img hoverin-img placeholder" alt="slider-img"
                                    src="assets/img/placeholder.gif" data-src="assets/img/thumb4.jpg"
                                    srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x" 
                                    data-srcSet="assets/img/thumb4.jpg 1x,
                                        assets/img/thumb4.jpg 1.5x,
                                        assets/img/thumb4.jpg 2x"  />
                                <Link to="">
                                    <div className="kids-sliderthumb-img">
                                        <div className="width-100 text-center">
                                            <img src="assets/img/play-button.png" className="kids-play-btn" alt="play_btn" />
                                        </div>
                                    </div>
                                    <div className="kids-sliderthumb-text">
                                        <div className="width-100">
                                            <div className="display-inline">
                                                <div className="kids-left">frozen</div>
                                                <div className="kids-right">7+</div>
                                            </div>
                                            <div className="white-outline-btn btn">episodes</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="modal fade kids" id="kids-episode">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="relative width-100">
                                    <img src='assets/img/thumb1.jpg' className="kids-episode-img" alt="banner_image" />
                                    <div className="kids-banner-details">
                                        <div>
                                            <h5>
                                                <span className="white-outline">7&nbsp;+</span>&nbsp;&nbsp;
                                                <span className="capitalize">the boss baby: back in business</span>
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="kids-banner-playbtn">
                                        <img src="assets/img/play-button.png" alt="play-button" />
                                    </div>
                                </div>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            
                            <div className="modal-body">
                               <div className="row">
                                   <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                                        <Link to="/video">
                                            <div className="relative">
                                                <img src="assets/img/thumb2.jpg" className="kids-episodesec-img" alt="episode_img" />
                                                <div className="kidssec-play-icon">
                                                    <img src="assets/img/play-button.png" alt="play_icon" />
                                                </div>
                                            </div>
                                            <h5 className="capz dark-grey-clr mt-2 mb-3 txt-overflow">as the diaper changes</h5>
                                        </Link>
                                   </div>
                                   <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                                        <Link to="/video">
                                            <div className="relative">
                                                <img src="assets/img/thumb3.jpg" className="kids-episodesec-img" alt="episode_img" />
                                                <div className="kidssec-play-icon">
                                                    <img src="assets/img/play-button.png" alt="play_icon" />
                                                </div>
                                            </div>
                                            <h5 className="capz dark-grey-clr mt-2 mb-3 txt-overflow">as the diaper changes</h5>
                                        </Link>
                                   </div>
                                   <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                                        <Link to="/video">
                                            <div className="relative">
                                                <img src="assets/img/thumb4.jpg" className="kids-episodesec-img" alt="episode_img" />
                                                <div className="kidssec-play-icon">
                                                    <img src="assets/img/play-button.png" alt="play_icon" />
                                                </div>
                                            </div>
                                            <h5 className="capz dark-grey-clr mt-2 mb-3 txt-overflow">as the diaper changes</h5>
                                        </Link>
                                   </div>
                                   <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                                        <Link to="/video">
                                            <div className="relative">
                                                <img src="assets/img/thumb5.jpg" className="kids-episodesec-img" alt="episode_img" />
                                                <div className="kidssec-play-icon">
                                                    <img src="assets/img/play-button.png" alt="play_icon" />
                                                </div>
                                            </div>
                                            <h5 className="capz dark-grey-clr mt-2 mb-3 txt-overflow">as the diaper changes</h5>
                                        </Link>
                                   </div>
                                   <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                                        <Link to="/video">
                                            <div className="relative">
                                                <img src="assets/img/thumb6.jpg" className="kids-episodesec-img" alt="episode_img" />
                                                <div className="kidssec-play-icon">
                                                    <img src="assets/img/play-button.png" alt="play_icon" />
                                                </div>
                                            </div>
                                            <h5 className="capz dark-grey-clr mt-2 mb-3 txt-overflow">as the diaper changes</h5>
                                        </Link>
                                   </div>
                                   <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                                        <Link to="/video">
                                            <div className="relative">
                                                <img src="assets/img/thumb7.jpg" className="kids-episodesec-img" alt="episode_img" />
                                                <div className="kidssec-play-icon">
                                                    <img src="assets/img/play-button.png" alt="play_icon" />
                                                </div>
                                            </div>
                                            <h5 className="capz dark-grey-clr mt-2 mb-3 txt-overflow">as the diaper changes</h5>
                                        </Link>
                                   </div>
                                </div>

                                <h5 className="black-clr bold capz mt-3 mb-3">more like boss baby</h5>
                                <div className="row">
                                   <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-3">
                                        <Link to="/video">
                                            <img src="assets/img/thumb2.jpg" className="kids-episodesec-img" alt="episode_img" />
                                        </Link>
                                   </div>
                                   <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-3">
                                        <Link to="/video">
                                            <img src="assets/img/thumb3.jpg" className="kids-episodesec-img" alt="episode_img" />
                                        </Link>
                                   </div>
                                   <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-3">
                                        <Link to="/video">
                                            <img src="assets/img/thumb4.jpg" className="kids-episodesec-img" alt="episode_img" />
                                        </Link>
                                   </div>
                                </div>
                            </div>
            
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default KidsCategory;