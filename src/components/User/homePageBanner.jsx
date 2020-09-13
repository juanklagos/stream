import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import Helper from "../Helper/helper";
import api from "../../Environment";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../Helper/toaster";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import {
  setTranslations,
  setDefaultLanguage,
  translate
} from "react-multi-lang";
import en from "../translation/en.json";
import pt from "../translation/pt.json";

class HomePageBanner extends Helper {
  state = {
    wishlistApiCall: false,
    wishlistResponse: null,
    inputData: {},
    redirect: false,
    redirectPPV: false,
    redirectPaymentOption: false,
    videoDetailsFirst: null,
    playButtonClicked: false,
    wishlistStatusCheck: 0,
    wishlistResponse: null,
    wishlistApiCall: false
  };
  componentDidMount() {
    this.setState({ playButtonClicked: false });
    let wishlistStatusCheck = 0;
    if (this.props.banner.wishlist_status == 1) {
      wishlistStatusCheck = 1;
    } else {
      wishlistStatusCheck = 0;
    }
    this.setState({ wishlistStatusCheck });
  }
  handleWishList = (event, admin_video_id) => {
    event.preventDefault();
    let inputData = {
      ...this.state.inputData,
      admin_video_id: admin_video_id
    };

    api.postMethod("wishlists/operations", inputData).then(response => {
      if (response.data.success === true) {
        ToastDemo(this.props.toastManager, response.data.message, "success");
        this.setState({
          wishlistResponse: response.data,
          wishlistApiCall: true
        });
        if (response.data.wishlist_id != null) {
          this.setState({
            wishlistStatusCheck: 1
          });
        } else {
          this.setState({
            wishlistStatusCheck: 0
          });
        }
      } else {
        ToastDemo(
          this.props.toastManager,
          response.data.error_messages,
          "error"
        );
      }
    });
  };

  handlePlayVideo = async (event, admin_video_id) => {
    event.preventDefault();

    this.setState({ playButtonClicked: true });
    let inputData = {
      ...this.state.inputData,
      admin_video_id: admin_video_id
    };

    await this.onlySingleVideoFirst(inputData);

    this.redirectStatus(this.state.videoDetailsFirst);
  };

  render() {
    const { t } = this.props;

    const { banner } = this.props;

    if (this.state.playButtonClicked) {
      const returnToVideo = this.renderRedirectPage(
        this.state.videoDetailsFirst
      );

      if (returnToVideo != null) {
        return returnToVideo;
      }
    }
    const {
      wishlistStatusCheck,
      wishlistApiCall,
      wishlistResponse
    } = this.state;
    return (
      <section className="banner-slider slider">
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          showStatus={false}
          showArrows={true}
          showIndicators={false}
          autoPlay={false}
          stopOnHover={true}
          swipeable={true}
        >
          {banner.data.map(video => (
            <div className="banner-sec" key={video.admin_video_id}>
              <div className="row m-0">
                <div className="col-3 col-md-3 col-lg-3 col-xl-3 p-0">
                  <div className="banner-home home-left" />
                </div>
                <div className="col-9 col-md-9 col-lg-9 col-xl-9 p-0">
                  <div className="banner-home relative">
                    <img
                      className="banner_right_img"
                      src={video.default_image}
                      srcSet={
                        video.default_image +
                        " 1x," +
                        video.default_image +
                        " 1.5x," +
                        video.default_image +
                        " 2x"
                      }
                      alt="banner img"
                    />
                    <div className="banner_right_overlay" />
                  </div>
                </div>
              </div>
              <div className="banner-content">
                <div className="banner-text-centeralign">
                  <div>
                    <h1 className="banner_video_title">{video.title}</h1>
                    <h4 className="banner_video_text">{video.description}</h4>
                    <div className="banner-btn-sec">
                      <Link
                        to="#"
                        onClick={event =>
                          this.handlePlayVideo(event, video.admin_video_id)
                        }
                        className="btn btn-grey"
                      >
                        <i className="fas fa-play mr-2" />
                        {t("play")}
                      </Link>
                      <Link
                        to="#"
                        className="btn btn-grey"
                        onClick={event =>
                          this.handleWishList(event, video.admin_video_id)
                        }
                        value={video.admin_video_id}
                      >
                        {wishlistStatusCheck == 1 ? (
                          <div>
                            <i className="" style={{ display: "none" }} />
                            <img
                              src={window.location.origin + "/images/tick.png"}
                              className="mr-2 banner-wishlist-icon"
                            />
                            {t("my_list")}
                          </div>
                        ) : (
                          <div>
                            <i className="" style={{ display: "none" }}></i>
                            <img
                              src={window.location.origin + "/images/add.png"}
                              className="mr-2 banner-wishlist-icon"
                            />
                            {t("my_list")}
                          </div>
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
    );
  }
}

export default withToastManager(translate(HomePageBanner));
