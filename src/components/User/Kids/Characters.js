import React, {Component} from 'react';

import {Link} from 'react-router-dom';


const $ = window.$;

class KidsCharacters extends Component{

    componentDidMount() {

        $(window).load(function() {
		    
            $('.placeholder').each(function () {
                var imagex = $(this);
                var imgOriginal = imagex.data('src');
                $(imagex).attr('src', imgOriginal);
            });
             
        });

        // kids slider

        var kidsSliderWidth =  $('.kids-category-slider img').outerWidth();

        $('.kids-category-slider img').height(kidsSliderWidth);
        
    }

    render(){
        return(
            <div>
                <div className="slider-topbottom-spacing">
                    <h3 className="black-clr capz">netflix characters<i className="fas fa-angle-right ml-2"></i></h3>

                        <div className="kids-char kids-category-slider slider">
                            <div className="kids-char-sec">
                                <Link to="" data-toggle="modal" data-target="#kids-char">
                                    <img src="assets/img/placeholder.gif" data-src="assets/img/thumb1.jpg" className="placeholder" alt="category-img" />    
                                </Link>
                            </div>
                            <div className="kids-char-sec">
                                <Link to="">
                                    <img src="assets/img/placeholder.gif" data-src="assets/img/thumb2.jpg" className="placeholder" alt="category-img" />
                                </Link>
                            </div>
                            <div className="kids-char-sec">
                                <Link to="">
                                    <img src="assets/img/placeholder.gif" data-src="assets/img/thumb3.jpg" className="placeholder" alt="category-img" />
                                </Link>
                            </div>
                            <div className="kids-char-sec">
                                <Link to="">
                                    <img src="assets/img/placeholder.gif" data-src="assets/img/thumb4.jpg" className="placeholder" alt="category-img" />
                                </Link>
                            </div>
                            <div className="kids-char-sec">
                                <Link to="">
                                    <img src="assets/img/placeholder.gif" data-src="assets/img/thumb5.jpg" className="placeholder" alt="category-img" />
                                </Link>
                            </div>
                            <div className="kids-char-sec">
                                <Link to="">
                                    <img src="assets/img/placeholder.gif" data-src="assets/img/thumb6.jpg" className="placeholder" alt="category-img" />
                                </Link>
                            </div>
                            <div className="kids-char-sec">
                                <Link to="">
                                    <img src="assets/img/placeholder.gif" data-src="assets/img/thumb7.jpg" className="placeholder" alt="category-img" />
                                </Link>
                            </div>
                            <div className="kids-char-sec">
                                <Link to="">
                                    <img src="assets/img/placeholder.gif" data-src="assets/img/thumb8.jpg" className="placeholder" alt="category-img" />
                                </Link>
                            </div>
                            <div className="kids-char-sec">
                                <Link to="">
                                    <img src="assets/img/placeholder.gif" data-src="assets/img/thumb9.jpg" className="placeholder" alt="category-img" />
                                </Link>
                            </div>
                        </div>

                </div>

                <div className="modal fade kids" id="kids-char">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="kids-char-bg width-100">
                                    <div>
                                        <h3 className="txt-overflow capz mb-5">the boss baby</h3>
                                        <div className="relative width-70">
                                            <img src='assets/img/thumb1.jpg' className="kids-char-img" alt="banner_image" />
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
                                    </div>
                                </div>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            
                            <div className="modal-body">
                                <h5 className="black-clr bold capz mb-3">season1</h5>
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
                                        <Link to="/">
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
                            </div>
            
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default KidsCharacters;