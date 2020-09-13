import React, { Component } from "react";

import Slider from "react-slick";

import { Link } from "react-router-dom";

const $ = window.$;

class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: this.props.data
    };
  }

  showSliderContent() {
    $(".slider-content").css("display", "block");
  }

  closeSliderContent() {
    $(".slider-content").css("display", "none");
  }

  componentDidMount() {
    $(window).load(function() {
      $(".placeholder").each(function() {
        var imagex = $(this);
        var imgOriginal = imagex.data("src");
        var imgOriginalSet = imagex.data("srcset");
        $(imagex).attr("src", imgOriginal);
        $(imagex).attr("srcset", imgOriginalSet);
      });
    });

    var scaling = 1.5;

    var windowWidth = $("body").width();

    var videoWidth = $(".sliderthumb").outerWidth();

    var videoHeight = Math.round(videoWidth / (16 / 9));

    var videoSecHeight = videoHeight * scaling;

    var videoHeightDiff = videoSecHeight - videoHeight;

    var mobileVideosecHeight = videoSecHeight - videoHeightDiff / 2;

    $(".mylist-slider").height(videoSecHeight);

    $(".home-slider .sliderthumb").height(videoHeight);

    $(".home-slider .sliderthumb").css("margin-top", videoHeightDiff / 2);

    if (windowWidth > 991) {
      $(".home-slider .sliderthumb").mouseover(function() {
        $(this).css("width", videoWidth * scaling);

        $(this).css("height", videoHeight * scaling);

        $(this).css("z-index", 100);

        $(this).css("margin-top", 0);
      });

      $(".home-slider .sliderthumb").mouseout(function() {
        $(this).css("width", videoWidth * 1);

        $(this).css("height", videoHeight * 1);

        $(this).css("z-index", 0);

        $(this).css("margin-top", videoHeightDiff / 2);
      });
    } else {
      $(".home-slider").height(mobileVideosecHeight);
    }
  }

  render() {
    var episodeSlider = {
      dots: false,
      arrow: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: false
    };

    var trailerSlider = {
      dots: false,
      arrow: true,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1
    };

    var morelikeSlider = {
      dots: false,
      arrow: true,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1
    };

    return (
      <div>
        <div className="slider-topbottom-spacing">
          <div className="video-container">
            <div className="video-sec mylist-slider home-slider slider">
              <div className="sliderthumb">
                <img
                  className="sliderthumb-img hoverout-img placeholder"
                  alt="slider-img"
                  src="assets/img/placeholder.gif"
                  data-src="assets/img/thumb1.jpg"
                  srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x"
                  data-srcSet="assets/img/thumb1.jpg 1x,
                                        assets/img/thumb1.jpg 1.5x,
                                        assets/img/thumb1.jpg 2x"
                />
                <img
                  className="sliderthumb-img hoverin-img placeholder"
                  alt="slider-img"
                  src="assets/img/placeholder.gif"
                  data-src="assets/img/thumb8.jpg"
                  srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x"
                  data-srcSet="assets/img/thumb8.jpg 1x,
                                        assets/img/thumb8.jpg 1.5x,
                                        assets/img/thumb8.jpg 2x"
                />
                <div className="sliderthumb-text">
                  <div className="width-100">
                    <Link to="#">
                      <div className="thumb-playicon">
                        <i className="fas fa-play" />
                      </div>
                    </Link>
                    <h4 className="thumb-title">frozen</h4>
                    <h5 className="thumb-details">
                      <span className="green-clr">Aug 2018</span>
                      <span className="grey-box">
                        7<i className="fas fa-plus small" /> / 25{" "}
                        <span className="small">Views</span>
                      </span>
                    </h5>
                    <p className="thumb-desc">
                      An ordinary teen. An ancient relic pulled from the rubble.
                      And an underground civilization that needs a hero.An
                      ordinary teen. An ancient relic pulled from the rubble.
                      And an underground{" "}
                    </p>
                    <Link to="#">
                      <div className="text-center thumbarrow-sec">
                        <img
                          src="assets/img/arrow-white.png"
                          className="thumbarrow thumbarrow-white"
                          alt="play_img"
                        />
                        <img
                          src="assets/img/arrow-red.png"
                          className="thumbarrow thumbarrow-red"
                          onClick={this.showSliderContent}
                          alt="play_img"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="slider-play-sec">
                  <div>
                    <Link to="#">
                      <div className="slider-play-sec-outline">
                        <i className="fas fa-play" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="video-sec mylist-slider home-slider slider">
              <div className="sliderthumb">
                <img
                  className="sliderthumb-img hoverout-img placeholder"
                  alt="slider-img"
                  src="assets/img/placeholder.gif"
                  data-src="assets/img/thumb2.jpg"
                  srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x"
                  data-srcSet="assets/img/thumb2.jpg 1x,
                                        assets/img/thumb2.jpg 1.5x,
                                        assets/img/thumb2.jpg 2x"
                />
                <img
                  className="sliderthumb-img hoverin-img placeholder"
                  alt="slider-img"
                  src="assets/img/placeholder.gif"
                  data-src="assets/img/thumb7.jpg"
                  srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x"
                  data-srcSet="assets/img/thumb7.jpg 1x,
                                        assets/img/thumb7.jpg 1.5x,
                                        assets/img/thumb7.jpg 2x"
                />
                <div className="sliderthumb-text">
                  <div className="width-100">
                    <Link to="#">
                      <div className="thumb-playicon">
                        <i className="fas fa-play" />
                      </div>
                    </Link>
                    <h4 className="thumb-title">frozen</h4>
                    <h5 className="thumb-details">
                      <span className="green-clr">Aug 2018</span>
                      <span className="grey-box">
                        7<i className="fas fa-plus small" /> / 25{" "}
                        <span className="small">Views</span>
                      </span>
                    </h5>
                    <p className="thumb-desc">
                      An ordinary teen. An ancient relic pulled from the rubble.
                      And an underground civilization that needs a hero.An
                      ordinary teen. An ancient relic pulled from the rubble.
                      And an underground{" "}
                    </p>
                    <Link to="#">
                      <div className="text-center thumbarrow-sec">
                        <img
                          src="assets/img/arrow-white.png"
                          className="thumbarrow thumbarrow-white"
                          alt="play_img"
                        />
                        <img
                          src="assets/img/arrow-red.png"
                          className="thumbarrow thumbarrow-red"
                          alt="play_img"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="slider-play-sec">
                  <div>
                    <Link to="#">
                      <div className="slider-play-sec-outline">
                        <i className="fas fa-play" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="video-sec mylist-slider home-slider slider">
              <div className="sliderthumb">
                <img
                  className="sliderthumb-img hoverout-img placeholder"
                  alt="slider-img"
                  src="assets/img/placeholder.gif"
                  data-src="assets/img/thumb3.jpg"
                  srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x"
                  data-srcSet="assets/img/thumb3.jpg 1x,
                                        assets/img/thumb3.jpg 1.5x,
                                        assets/img/thumb3.jpg 2x"
                />
                <img
                  className="sliderthumb-img hoverin-img placeholder"
                  alt="slider-img"
                  src="assets/img/placeholder.gif"
                  data-src="assets/img/thumb6.jpg"
                  srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x"
                  data-srcSet="assets/img/thumb6.jpg 1x,
                                        assets/img/thumb6.jpg 1.5x,
                                        assets/img/thumb6.jpg 2x"
                />
                <div className="sliderthumb-text">
                  <div className="width-100">
                    <Link to="#">
                      <div className="thumb-playicon">
                        <i className="fas fa-play" />
                      </div>
                    </Link>
                    <h4 className="thumb-title">frozen</h4>
                    <h5 className="thumb-details">
                      <span className="green-clr">Aug 2018</span>
                      <span className="grey-box">
                        7<i className="fas fa-plus small" /> / 25{" "}
                        <span className="small">Views</span>
                      </span>
                    </h5>
                    <p className="thumb-desc">
                      An ordinary teen. An ancient relic pulled from the rubble.
                      And an underground civilization that needs a hero.An
                      ordinary teen. An ancient relic pulled from the rubble.
                      And an underground{" "}
                    </p>
                    <Link to="#">
                      <div className="text-center thumbarrow-sec">
                        <img
                          src="assets/img/arrow-white.png"
                          className="thumbarrow thumbarrow-white"
                          alt="play_img"
                        />
                        <img
                          src="assets/img/arrow-red.png"
                          className="thumbarrow thumbarrow-red"
                          alt="play_img"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="slider-play-sec">
                  <div>
                    <Link to="#">
                      <div className="slider-play-sec-outline">
                        <i className="fas fa-play" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="video-sec mylist-slider home-slider slider">
              <div className="sliderthumb">
                <img
                  className="sliderthumb-img hoverout-img placeholder"
                  alt="slider-img"
                  src="assets/img/placeholder.gif"
                  data-src="assets/img/thumb4.jpg"
                  srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x"
                  data-srcSet="assets/img/thumb4.jpg 1x,
                                        assets/img/thumb4.jpg 1.5x,
                                        assets/img/thumb4.jpg 2x"
                />
                <img
                  className="sliderthumb-img hoverin-img placeholder"
                  alt="slider-img"
                  src="assets/img/placeholder.gif"
                  data-src="assets/img/thumb5.jpg"
                  srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x"
                  data-srcSet="assets/img/thumb5.jpg 1x,
                                        assets/img/thumb5.jpg 1.5x,
                                        assets/img/thumb5.jpg 2x"
                />
                <div className="sliderthumb-text">
                  <div className="width-100">
                    <Link to="#">
                      <div className="thumb-playicon">
                        <i className="fas fa-play" />
                      </div>
                    </Link>
                    <h4 className="thumb-title">frozen</h4>
                    <h5 className="thumb-details">
                      <span className="green-clr">Aug 2018</span>
                      <span className="grey-box">
                        7<i className="fas fa-plus small" /> / 25{" "}
                        <span className="small">Views</span>
                      </span>
                    </h5>
                    <p className="thumb-desc">
                      An ordinary teen. An ancient relic pulled from the rubble.
                      And an underground civilization that needs a hero.An
                      ordinary teen. An ancient relic pulled from the rubble.
                      And an underground{" "}
                    </p>
                    <Link to="#">
                      <div className="text-center thumbarrow-sec">
                        <img
                          src="assets/img/arrow-white.png"
                          className="thumbarrow thumbarrow-white"
                          alt="play_img"
                        />
                        <img
                          src="assets/img/arrow-red.png"
                          className="thumbarrow thumbarrow-red"
                          alt="play_img"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="slider-play-sec">
                  <div>
                    <Link to="#">
                      <div className="slider-play-sec-outline">
                        <i className="fas fa-play" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="video-sec mylist-slider home-slider slider">
              <div className="sliderthumb">
                <img
                  className="sliderthumb-img hoverout-img placeholder"
                  alt="slider-img"
                  src="assets/img/placeholder.gif"
                  data-src="assets/img/thumb5.jpg"
                  srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x"
                  data-srcSet="assets/img/thumb5.jpg 1x,
                                        assets/img/thumb5.jpg 1.5x,
                                        assets/img/thumb5.jpg 2x"
                />
                <img
                  className="sliderthumb-img hoverin-img placeholder"
                  alt="slider-img"
                  src="assets/img/placeholder.gif"
                  data-src="assets/img/thumb4.jpg"
                  srcSet="assets/img/placeholder.gif 1x,
                                        assets/img/placeholder.gif 1.5x,
                                        assets/img/placeholder.gif 2x"
                  data-srcSet="assets/img/thumb4.jpg 1x,
                                        assets/img/thumb4.jpg 1.5x,
                                        assets/img/thumb4.jpg 2x"
                />
                <div className="sliderthumb-text">
                  <div className="width-100">
                    <Link to="#">
                      <div className="thumb-playicon">
                        <i className="fas fa-play" />
                      </div>
                    </Link>
                    <h4 className="thumb-title">frozen</h4>
                    <h5 className="thumb-details">
                      <span className="green-clr">Aug 2018</span>
                      <span className="grey-box">
                        7<i className="fas fa-plus small" /> / 25{" "}
                        <span className="small">Views</span>
                      </span>
                    </h5>
                    <p className="thumb-desc">
                      An ordinary teen. An ancient relic pulled from the rubble.
                      And an underground civilization that needs a hero.An
                      ordinary teen. An ancient relic pulled from the rubble.
                      And an underground{" "}
                    </p>
                    <Link to="#">
                      <div className="text-center thumbarrow-sec">
                        <img
                          src="assets/img/arrow-white.png"
                          className="thumbarrow thumbarrow-white"
                          alt="play_img"
                        />
                        <img
                          src="assets/img/arrow-red.png"
                          className="thumbarrow thumbarrow-red"
                          alt="play_img"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="slider-play-sec">
                  <div>
                    <Link to="#">
                      <div className="slider-play-sec-outline">
                        <i className="fas fa-play" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="slider-content">
            <div className="row m-0">
              <div className="col-3 col-md-3 col-lg-3 col-xl-3 p-0">
                <div className="banner-home home-left" />
              </div>
              <div className="col-9 col-md-9 col-lg-9 col-xl-9 p-0">
                <div className="banner-home relative">
                  <img
                    className="banner_right_img"
                    src="assets/img/slider-img1.jpg"
                    srcSet="assets/img/slider-img1.jpg 1x,
                                            assets/img/slider-img1.jpg 1.5x,
                                            assets/img/slider-img1.jpg 2x"
                    alt="slider-img"
                  />
                  <div className="banner_right_overlay" />
                </div>
              </div>
            </div>

            <div className="slider-content-close-sec">
              <div onClick={this.closeSliderContent}>
                <i className="fas fa-times" />
              </div>
            </div>

            <div className="slider-content-tabsec">
              <ul className="nav nav-pills" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="pill"
                    href="#overview"
                  >
                    overview
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#episode">
                    episodes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#trailers">
                    trailers & more
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#more_link">
                    more like this
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#details">
                    details
                  </a>
                </li>
              </ul>
            </div>

            <div className="modal fade confirmation-popup" id="spam-popup">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <form>
                    <div className="modal-header">
                      <h4 className="modal-title">Report This Video</h4>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        &times;
                      </button>
                    </div>

                    <div className="modal-body">
                      <p>
                        Note:If you report this video, you won't see again the
                        same video in anywhere in your account except "Spam
                        Videos". If you want to continue to report this video as
                        same. Click continue and proceed the same.
                      </p>

                      <div className="form-check">
                        <input
                          type="radio"
                          id="test1"
                          name="radio-group"
                          checked
                        />
                        <label for="test1">Sexual content</label>
                      </div>
                      <div className="form-check">
                        <input type="radio" id="test2" name="radio-group" />
                        <label for="test2">Violent or repulsive content.</label>
                      </div>
                      <div className="form-check">
                        <input type="radio" id="test3" name="radio-group" />
                        <label for="test3">Hateful or abusive content.</label>
                      </div>
                      <div className="form-check">
                        <input type="radio" id="test4" name="radio-group" />
                        <label for="test4">Harmful dangerous acts.</label>
                      </div>
                      <div className="form-check">
                        <input type="radio" id="test5" name="radio-group" />
                        <label for="test5">Child abuse.</label>
                      </div>
                      <div className="form-check">
                        <input type="radio" id="test6" name="radio-group" />
                        <label for="test6">Spam or misleading.</label>
                      </div>
                      <div className="form-check">
                        <input type="radio" id="test7" name="radio-group" />
                        <label for="test7">Infringes my rights.</label>
                      </div>
                      <div className="form-check">
                        <input type="radio" id="test8" name="radio-group" />
                        <label for="test8">Captions issue.</label>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger">
                        submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="slider-content-tabcontent">
              <div className="tab-content">
                <div id="overview" className="tab-pane active">
                  <div className="slider-topbottom-spacing">
                    <div className="overview-content">
                      <div>
                        <h1 className="banner_video_title">frozen</h1>
                        <h4 className="banner_video_details">
                          <span className="green-clr">Aug 2018</span>
                          <span className="grey-box">
                            7<i className="fas fa-plus small" /> / 25{" "}
                            <span className="small">Views</span>
                          </span>
                          <span>1h 26m</span>
                          <span className="small yellow-clr ml-1">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="far fa-star" />
                            <i className="far fa-star" />
                          </span>
                        </h4>
                        <h4 className="banner_video_details">
                          <span>
                            <i className="far fa-thumbs-up" />
                          </span>
                          <span className="mr-2">50</span>
                          <span>
                            <i className="far fa-thumbs-down" />
                          </span>
                          <span className="mr-2">40</span>
                        </h4>
                        <h4 className="slider_video_text">
                          an ordinary teen. An ancient relic pulled from the
                          rubble. And an underground civilization that needs a
                          hero.An ordinary teen. An ancient relic pulled from
                          the rubble. And an underground civilization that needs
                          a hero.
                        </h4>
                        <div className="banner-btn-sec">
                          <Link
                            to="#"
                            className="btn btn-danger btn-right-space br-0"
                          >
                            <i className="fas fa-play mr-2" />
                            play
                          </Link>
                          <Link
                            to="#"
                            className="btn btn-outline-secondary btn-right-space"
                          >
                            <i className="fas fa-plus mr-2" />
                            my list
                          </Link>
                          <Link to="#" className="btn express-btn mr-2">
                            <i className="far fa-thumbs-up" />
                          </Link>
                          <Link
                            to="#"
                            className="btn express-btn btn-right-space"
                          >
                            <i className="far fa-thumbs-down" />
                          </Link>
                          <Link
                            to="#"
                            data-toggle="modal"
                            data-target="#spam-popup"
                            className="btn express-btn btn-right-space"
                          >
                            <i className="fas fa-info" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="episode" className="tab-pane fade">
                  <div className="slider-topbottom-spacing pl-0 pr-0 slider-overlay">
                    <div className="pr-4per pl-4per">
                      <h1 className="banner_video_title">frozen</h1>
                      <form>
                        <div className="custom-select width-200">
                          <select>
                            <option value="0">season 1</option>
                            <option value="1">season 2</option>
                            <option value="2">season 3</option>
                            <option value="3">season 4</option>
                          </select>
                        </div>
                      </form>
                    </div>
                    <div>
                      <Slider
                        {...episodeSlider}
                        className="episode-slider slider"
                      >
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb1.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb1.jpg 1x,
                                                                    assets/img/thumb1.jpg 1.5x,
                                                                    assets/img/thumb1.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                            </div>
                            <div className="episode-number">1</div>
                          </div>
                          <div className="episode-content">
                            <div className="row">
                              <div className="col-xl-8 col-lg-8">
                                <h4 className="episode-content-head">
                                  eye of the beholder
                                </h4>
                              </div>
                              <div className="col-xl-4 col-lg-4">
                                <h4 className="episode-content-head text-right">
                                  52m
                                </h4>
                              </div>
                            </div>
                            <h4 className="episode-content-desc">
                              During their search for the escaped Dagur the
                              Deranged, Hiccup and the Dragon Riders discover a
                              mysterious object -- one that holds their destiny.
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb2.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb2.jpg 1x,
                                                                    assets/img/thumb2.jpg 1.5x,
                                                                    assets/img/thumb2.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                            </div>
                            <div className="episode-number">2</div>
                          </div>
                          <div className="episode-content">
                            <div className="row">
                              <div className="col-xl-8 col-lg-8">
                                <h4 className="episode-content-head">
                                  eye of the beholder
                                </h4>
                              </div>
                              <div className="col-xl-4 col-lg-4">
                                <h4 className="episode-content-head text-right">
                                  52m
                                </h4>
                              </div>
                            </div>
                            <h4 className="episode-content-desc">
                              During their search for the escaped Dagur the
                              Deranged, Hiccup and the Dragon Riders discover a
                              mysterious object -- one that holds their destiny.
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb3.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb3.jpg 1x,
                                                                    assets/img/thumb3.jpg 1.5x,
                                                                    assets/img/thumb3.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                            </div>
                            <div className="episode-number">3</div>
                          </div>
                          <div className="episode-content">
                            <div className="row">
                              <div className="col-xl-8 col-lg-8">
                                <h4 className="episode-content-head">
                                  eye of the beholder
                                </h4>
                              </div>
                              <div className="col-xl-4 col-lg-4">
                                <h4 className="episode-content-head text-right">
                                  52m
                                </h4>
                              </div>
                            </div>
                            <h4 className="episode-content-desc">
                              During their search for the escaped Dagur the
                              Deranged, Hiccup and the Dragon Riders discover a
                              mysterious object -- one that holds their destiny.
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb3.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb3.jpg 1x,
                                                                    assets/img/thumb3.jpg 1.5x,
                                                                    assets/img/thumb3.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                            </div>
                            <div className="episode-number">4</div>
                          </div>
                          <div className="episode-content">
                            <div className="row">
                              <div className="col-xl-8 col-lg-8">
                                <h4 className="episode-content-head">
                                  eye of the beholder
                                </h4>
                              </div>
                              <div className="col-xl-4 col-lg-4">
                                <h4 className="episode-content-head text-right">
                                  52m
                                </h4>
                              </div>
                            </div>
                            <h4 className="episode-content-desc">
                              During their search for the escaped Dagur the
                              Deranged, Hiccup and the Dragon Riders discover a
                              mysterious object -- one that holds their destiny.
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb4.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb4.jpg 1x,
                                                                    assets/img/thumb4.jpg 1.5x,
                                                                    assets/img/thumb4.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                            </div>
                            <div className="episode-number">5</div>
                          </div>
                          <div className="episode-content">
                            <div className="row">
                              <div className="col-xl-8 col-lg-8">
                                <h4 className="episode-content-head">
                                  eye of the beholder
                                </h4>
                              </div>
                              <div className="col-xl-4 col-lg-4">
                                <h4 className="episode-content-head text-right">
                                  52m
                                </h4>
                              </div>
                            </div>
                            <h4 className="episode-content-desc">
                              During their search for the escaped Dagur the
                              Deranged, Hiccup and the Dragon Riders discover a
                              mysterious object -- one that holds their destiny.
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb5.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb5.jpg 1x,
                                                                    assets/img/thumb5.jpg 1.5x,
                                                                    assets/img/thumb5.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                            </div>
                            <div className="episode-number">6</div>
                          </div>
                          <div className="episode-content">
                            <div className="row">
                              <div className="col-xl-8 col-lg-8">
                                <h4 className="episode-content-head">
                                  eye of the beholder
                                </h4>
                              </div>
                              <div className="col-xl-4 col-lg-4">
                                <h4 className="episode-content-head text-right">
                                  52m
                                </h4>
                              </div>
                            </div>
                            <h4 className="episode-content-desc">
                              During their search for the escaped Dagur the
                              Deranged, Hiccup and the Dragon Riders discover a
                              mysterious object -- one that holds their destiny.
                            </h4>
                          </div>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>
                <div id="trailers" className="tab-pane fade">
                  <div className="slider-topbottom-spacing pl-0 pr-0 slider-overlay">
                    <div className="pr-4per pl-4per">
                      <h1 className="banner_video_title">frozen</h1>
                    </div>
                    <div>
                      <Slider
                        {...trailerSlider}
                        className="trailer-slider slider"
                      >
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb8.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb8.jpg 1x,
                                                                    assets/img/thumb8.jpg 1.5x,
                                                                    assets/img/thumb8.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="episode-content">
                            <h4 className="episode-content-head">
                              eye of the beholder
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb9.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb9.jpg 1x,
                                                                    assets/img/thumb9.jpg 1.5x,
                                                                    assets/img/thumb9.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="episode-content">
                            <h4 className="episode-content-head">
                              eye of the beholder
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb1.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb1.jpg 1x,
                                                                    assets/img/thumb1.jpg 1.5x,
                                                                    assets/img/thumb1.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="episode-content">
                            <h4 className="episode-content-head">
                              eye of the beholder
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb4.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb4.jpg 1x,
                                                                    assets/img/thumb4.jpg 1.5x,
                                                                    assets/img/thumb4.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="episode-content">
                            <h4 className="episode-content-head">
                              eye of the beholder
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb5.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb5.jpg 1x,
                                                                    assets/img/thumb5.jpg 1.5x,
                                                                    assets/img/thumb5.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="episode-content">
                            <h4 className="episode-content-head">
                              eye of the beholder
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb6.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb6.jpg 1x,
                                                                    assets/img/thumb6.jpg 1.5x,
                                                                    assets/img/thumb6.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="episode-content">
                            <h4 className="episode-content-head">
                              eye of the beholder
                            </h4>
                          </div>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>
                <div id="more_link" className="tab-pane fade">
                  <div className="slider-topbottom-spacing pl-0 pr-0 slider-overlay">
                    <div className="pr-4per pl-4per">
                      <h1 className="banner_video_title">frozen</h1>
                    </div>
                    <div>
                      <Slider
                        {...morelikeSlider}
                        className="more-like-slider slider"
                      >
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb1.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb1.jpg 1x,
                                                                    assets/img/thumb1.jpg 1.5x,
                                                                    assets/img/thumb1.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                              <div className="add-to-wishlist">
                                <Link to="#">
                                  <i className="fas fa-plus-circle" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="episode-content">
                            <h4 className="episode-content-head">
                              <span>2018</span>&nbsp;
                              <span className="grey-box pt-0 pb-0">
                                7 <i className="fas fa-plus small" /> / 25{" "}
                                <small>Views</small>
                              </span>
                              &nbsp;
                              <span>1h 36m</span>&nbsp;
                            </h4>
                            <h4 className="episode-content-desc">
                              During their search for the escaped Dagur the
                              Deranged, Hiccup and the Dragon Riders discover a
                              mysterious object -- one that holds their destiny.
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb2.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb2.jpg 1x,
                                                                    assets/img/thumb2.jpg 1.5x,
                                                                    assets/img/thumb2.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                              <div className="add-to-wishlist">
                                <Link to="#">
                                  <i className="fas fa-plus-circle" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="episode-content">
                            <h4 className="episode-content-head">
                              <span>2018</span>&nbsp;
                              <span className="grey-box pt-0 pb-0">
                                7 <i className="fas fa-plus small" /> / 25{" "}
                                <small>Views</small>
                              </span>
                              &nbsp;
                              <span>1h 36m</span>&nbsp;
                            </h4>
                            <h4 className="episode-content-desc">
                              During their search for the escaped Dagur the
                              Deranged, Hiccup and the Dragon Riders discover a
                              mysterious object -- one that holds their destiny.
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb3.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb3.jpg 1x,
                                                                    assets/img/thumb3.jpg 1.5x,
                                                                    assets/img/thumb3.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                              <div className="add-to-wishlist">
                                <Link to="#">
                                  <i className="fas fa-plus-circle" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="episode-content">
                            <h4 className="episode-content-head">
                              <span>2018</span>&nbsp;
                              <span className="grey-box pt-0 pb-0">
                                7 <i className="fas fa-plus small" /> / 25{" "}
                                <small>Views</small>
                              </span>
                              &nbsp;
                              <span>1h 36m</span>&nbsp;
                            </h4>
                            <h4 className="episode-content-desc">
                              During their search for the escaped Dagur the
                              Deranged, Hiccup and the Dragon Riders discover a
                              mysterious object -- one that holds their destiny.
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb4.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb4.jpg 1x,
                                                                    assets/img/thumb4.jpg 1.5x,
                                                                    assets/img/thumb4.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                              <div className="add-to-wishlist">
                                <Link to="#">
                                  <i className="fas fa-plus-circle" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="episode-content">
                            <h4 className="episode-content-head">
                              <span>2018</span>&nbsp;
                              <span className="grey-box pt-0 pb-0">
                                7 <i className="fas fa-plus small" /> / 25{" "}
                                <small>Views</small>
                              </span>
                              &nbsp;
                              <span>1h 36m</span>&nbsp;
                            </h4>
                            <h4 className="episode-content-desc">
                              During their search for the escaped Dagur the
                              Deranged, Hiccup and the Dragon Riders discover a
                              mysterious object -- one that holds their destiny.
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb5.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb5.jpg 1x,
                                                                    assets/img/thumb5.jpg 1.5x,
                                                                    assets/img/thumb5.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                              <div className="add-to-wishlist">
                                <Link to="#">
                                  <i className="fas fa-plus-circle" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="episode-content">
                            <h4 className="episode-content-head">
                              <span>2018</span>&nbsp;
                              <span className="grey-box pt-0 pb-0">
                                7 <i className="fas fa-plus small" /> / 25{" "}
                                <small>Views</small>
                              </span>
                              &nbsp;
                              <span>1h 36m</span>&nbsp;
                            </h4>
                            <h4 className="episode-content-desc">
                              During their search for the escaped Dagur the
                              Deranged, Hiccup and the Dragon Riders discover a
                              mysterious object -- one that holds their destiny.
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div className="relative">
                            <img
                              className="trailers-img placeholder"
                              alt="episode-img"
                              src="assets/img/placeholder.gif"
                              data-src="assets/img/thumb6.jpg"
                              srcset="assets/img/placeholder.gif 1x,
                                                                    assets/img/placeholder.gif 1.5x,
                                                                    assets/img/placeholder.gif 2x"
                              data-srcset="assets/img/thumb6.jpg 1x,
                                                                    assets/img/thumb6.jpg 1.5x,
                                                                    assets/img/thumb6.jpg 2x"
                            />
                            <div className="trailers-img-overlay">
                              <Link to="#">
                                <div className="thumbslider-outline">
                                  <i className="fas fa-play" />
                                </div>
                              </Link>
                              <div className="add-to-wishlist">
                                <Link to="#">
                                  <i className="fas fa-plus-circle" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="episode-content">
                            <h4 className="episode-content-head">
                              <span>2018</span>&nbsp;
                              <span className="grey-box pt-0 pb-0">
                                7 <i className="fas fa-plus small" /> / 25{" "}
                                <small>Views</small>
                              </span>
                              &nbsp;
                              <span>1h 36m</span>&nbsp;
                            </h4>
                            <h4 className="episode-content-desc">
                              During their search for the escaped Dagur the
                              Deranged, Hiccup and the Dragon Riders discover a
                              mysterious object -- one that holds their destiny.
                            </h4>
                          </div>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>
                <div id="details" className="tab-pane fade">
                  <div className="slider-topbottom-spacing slider-overlay">
                    <h1 className="banner_video_title">frozen</h1>
                    <div className="row">
                      <div className="col-lg-2 col-xl-2">
                        <h4 className="detail-head">cast</h4>
                        <ul className="detail-list">
                          <li>
                            <Link to="#">jason</Link>
                          </li>
                          <li>
                            <Link to="#">jhon krasinski</Link>
                          </li>
                          <li>
                            <Link to="#">david cross</Link>
                          </li>
                          <li>
                            <Link to="#">joe ksandar</Link>
                          </li>
                          <li>
                            <Link to="#">kevin r</Link>
                          </li>
                          <li>
                            <Link to="#">constance wu</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-2 col-xl-2">
                        <h4 className="detail-head">genres</h4>
                        <ul className="detail-list">
                          <li>
                            <Link to="#">Action Comedies</Link>
                          </li>
                          <li>
                            <Link to="#">Children & Family Films</Link>
                          </li>
                          <li>
                            <Link to="#">Films for ages 8 to 10</Link>
                          </li>
                          <li>
                            <Link to="#">family features</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-8 col-xl-8">
                        <h4 className="detail-head">description</h4>
                        <p className="details-text">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchComponent;
