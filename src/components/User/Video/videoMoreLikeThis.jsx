import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Helper from "../../Helper/helper";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";

import {
  setTranslations,
  setDefaultLanguage,
  translate
} from "react-multi-lang";
import en from "../../translation/en.json";
import pt from "../../translation/pt.json";

class VideoMoreLikeThis extends Helper {
  state = {
    redirect: false,
    redirectPPV: false,
    redirectPaymentOption: false,
    videoDetailsFirst: null,
    playButtonClicked: false,
    inputData: {}
  };
  componentDidMount() {
    this.setState({ playButtonClicked: false });
  }
  handlePlayVideo = async (event, admin_video_id) => {
    event.preventDefault();

    let inputData = {
      ...this.state.inputData,
      admin_video_id: admin_video_id
    };

    await this.onlySingleVideoFirst(inputData);

    if (this.state.videoDetailsFirst.success === false) {
      ToastDemo(
        this.props.toastManager,
        this.state.videoDetailsFirst.error_messages,
        "error"
      );
    } else {
      this.redirectStatus(this.state.videoDetailsFirst);
      this.setState({ playButtonClicked: true });
    }
  };
  render() {
    const { t } = this.props;

    if (this.state.playButtonClicked) {
      const returnToVideo = this.renderRedirectPage(
        this.state.videoDetailsFirst
      );

      if (returnToVideo != null) {
        return returnToVideo;
      }
    }
    const { suggestion } = this.props;
    let slidesToShowCount = 1;
    if (suggestion.length > 3) {
      slidesToShowCount = 4;
    } else {
      slidesToShowCount = suggestion.length;
    }
    var morelikeSlider = {
      dots: false,
      arrow: true,
      infinite: false,
      slidesToShow: slidesToShowCount,
      slidesToScroll: 1
    };
    return (
      <div className="slider-topbottom-spacing pl-0 pr-0 slider-overlay">
        <div className="pr-4per pl-4per">
          <h1 className="banner_video_title">{t("more_like_this")}</h1>
        </div>
        <div>
          <Slider {...morelikeSlider} className="more-like-slider slider">
            {suggestion.map(suggest => (
              <div key={suggest.admin_video_id}>
                <div className="relative">
                  <img
                    className="trailers-img placeholder"
                    alt="episode-img"
                    src={suggest.default_image}
                    data-src="assets/img/thumb1.jpg"
                    srcSet={
                      suggest.default_image +
                      " 1x," +
                      suggest.default_image +
                      " 1.5x," +
                      suggest.default_image +
                      " 2x"
                    }
                    data-srcset="assets/img/thumb1.jpg 1x,
                                                          assets/img/thumb1.jpg 1.5x,
                                                          assets/img/thumb1.jpg 2x"
                  />
                  <div className="trailers-img-overlay">
                    <Link
                      to="#"
                      onClick={event =>
                        this.handlePlayVideo(event, suggest.admin_video_id)
                      }
                    >
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
                    <span>{suggest.publish_time}</span>&nbsp;
                    <span className="grey-box pt-0 pb-0">
                      {suggest.age} <i className="fas fa-plus small" /> /{" "}
                      {suggest.category_id} <small>{t("views")}</small>
                    </span>
                    &nbsp;
                    <span>{suggest.duration}</span>&nbsp;
                  </h4>
                  <h4 className="episode-content-desc">
                    {suggest.description}
                  </h4>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

export default withToastManager(translate(VideoMoreLikeThis));
