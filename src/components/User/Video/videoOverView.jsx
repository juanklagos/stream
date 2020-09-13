import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { withToastManager } from "react-toast-notifications";
import api from "../../../Environment";
import ToastDemo from "../../Helper/toaster";
import Helper from "../../Helper/helper";

import {
    setTranslations,
    setDefaultLanguage,
    translate,
    t
} from "react-multi-lang";
import en from "../../translation/en.json";
import pt from "../../translation/pt.json";

const DATE_OPTIONS = {
    year: "numeric",
    month: "short"
};

class VideoOverView extends Helper {
    state = {
        inputData: {
            admin_video_id: this.props.videoDetailsFirst.admin_video_id
        },
        likeApiCall: false,
        dislikeApiCall: false,
        likeReponse: null,
        disLikeReponse: null,
        wishlistApiCall: false,
        wishlistResponse: {
            wishlist_id: null
        },
        redirect: false,
        redirectPPV: false,
        redirectPaymentOption: false,
        playButtonClicked: false,
        wishlistStatusCheck: 0
    };
    componentDidMount() {
        this.setState({ playButtonClicked: false });

        let wishlistStatusCheck = 0;
        if (this.props.videoDetailsFirst.wishlist_status == 1) {
            wishlistStatusCheck = 1;
        } else {
            wishlistStatusCheck = 0;
        }
        this.setState({ wishlistStatusCheck });
    }
    handleOnClickLike = event => {
        event.preventDefault();

        api.postMethod("videos/like", this.state.inputData).then(response => {
            if (response.data.success === true) {
                ToastDemo(
                    this.props.toastManager,
                    "You liked this Video!",
                    "success"
                );
                this.setState({
                    likeReponse: response.data.data,
                    likeApiCall: true
                });
            } else {
                ToastDemo(
                    this.props.toastManager,
                    response.data.error_messages,
                    "error"
                );
            }
        });
    };

    handleOnClickDislike = event => {
        event.preventDefault();

        api.postMethod("videos/dis_like", this.state.inputData).then(
            response => {
                if (response.data.success === true) {
                    ToastDemo(
                        this.props.toastManager,
                        "You Disliked this Video!",
                        "success"
                    );
                    this.setState({
                        disLikeReponse: response.data.data,
                        dislikeApiCall: true
                    });
                } else {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.error,
                        "error"
                    );
                }
            }
        );
    };

    handleWishList = event => {
        event.preventDefault();

        // this.wishlistUpdate(this.state.inputData);

        api.postMethod("wishlists/operations", this.state.inputData).then(
            response => {
                if (response.data.success) {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.message,
                        "success"
                    );
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
            }
        );
    };

    handlePlayVideo = event => {
        event.preventDefault();
        this.redirectStatus(this.props.videoDetailsFirst);
        this.setState({ playButtonClicked: true });
    };
    render() {
        const { videoDetailsFirst } = this.props;

        const {
            likeReponse,
            likeApiCall,
            disLikeReponse,
            dislikeApiCall,
            wishlistApiCall,
            wishlistResponse,
            wishlistStatusCheck
        } = this.state;

        if (this.state.playButtonClicked) {
            const returnToVideo = this.renderRedirectPage(
                this.props.videoDetailsFirst
            );

            if (returnToVideo != null) {
                return returnToVideo;
            }
        }
        return (
            <div className="slider-topbottom-spacing">
                <div className="overview-content">
                    <h1 className="banner_video_title">
                        {videoDetailsFirst.title}
                    </h1>
                    <h4 className="banner_video_details">
                        <span className="green-clr">
                            {new Date(
                                videoDetailsFirst.publish_time
                            ).toLocaleDateString("en-US", DATE_OPTIONS)}
                        </span>
                        <span className="grey-box">
                            {videoDetailsFirst.age}
                            <i className="fas fa-plus small" /> /{" "}
                            {videoDetailsFirst.watch_count}{" "}
                            <span className="small">Views</span>
                        </span>
                        <span>{videoDetailsFirst.duration}</span>
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
                        <span className="mr-2">
                            {likeApiCall
                                ? likeReponse.like_count
                                : videoDetailsFirst.likes}
                        </span>
                        <span>
                            <i className="far fa-thumbs-down" />
                        </span>
                        <span className="mr-2">
                            {dislikeApiCall
                                ? disLikeReponse.dislike_count
                                : videoDetailsFirst.dislikes}
                        </span>
                        {videoDetailsFirst.should_display_ppv == 1 ? (
                            <span className="red-box">
                                {videoDetailsFirst.currency}{" "}
                                {videoDetailsFirst.ppv_amount}
                                {/* <span className="small">Views</span> */}
                            </span>
                        ) : (
                            ""
                        )}
                    </h4>
                    <h4 className="slider_video_text">
                        {videoDetailsFirst.description}
                    </h4>
                    <div className="banner-btn-sec">
                        <Link
                            to="#"
                            className="btn btn-danger btn-right-space br-0"
                            onClick={this.handlePlayVideo}
                        >
                            <i className="fas fa-play mr-2" />
                            play
                        </Link>
                        <Link
                            to="#"
                            onClick={this.handleWishList}
                            className="btn btn-outline-secondary btn-right-space"
                        >
                            {wishlistStatusCheck == 1 ? (
                                <div>
                                    <i
                                        className=""
                                        style={{ display: "none" }}
                                    />
                                    <img
                                        src={
                                            window.location.origin +
                                            "/images/tick.png"
                                        }
                                        className="mr-2"
                                    />
                                    My list
                                </div>
                            ) : (
                                <div>
                                    <i
                                        className=""
                                        style={{ display: "none" }}
                                    ></i>
                                    <img
                                        src={
                                            window.location.origin +
                                            "/images/add.png"
                                        }
                                        className="mr-2"
                                    />
                                    my list
                                </div>
                            )}
                        </Link>

                        <Link
                            to="#"
                            onClick={this.handleOnClickLike}
                            className="btn express-btn mr-2"
                        >
                            <i className="far fa-thumbs-up" />
                        </Link>
                        <Link
                            to="#"
                            onClick={event => this.handleOnClickDislike(event)}
                            className="btn express-btn btn-right-space"
                        >
                            <i className="far fa-thumbs-down" />
                        </Link>
                        {/* <Link
              to="#"
              data-toggle="modal"
              data-target="#spam-popup"
              className="btn express-btn btn-right-space"
            >
              <i className="fas fa-info" />
            </Link> */}
                    </div>
                </div>

                <div className="modal fade confirmation-popup" id="spam-popup">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <form>
                                <div className="modal-header">
                                    <h4 className="modal-title">
                                        {t("report_this_video")}
                                    </h4>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                    >
                                        &times;
                                    </button>
                                </div>

                                <div className="modal-body">
                                    <p>{t("report_video_note")}</p>

                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="test1"
                                            name="radio-group"
                                            checked
                                        />
                                        <label htmlFor="test1">
                                            {t("sexual_content")}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="test2"
                                            name="radio-group"
                                        />
                                        <label htmlFor="test2">
                                            {t("violent_repulsive")}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="test3"
                                            name="radio-group"
                                        />
                                        <label htmlFor="test3">
                                            {t("hateful_or_abusive")}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="test4"
                                            name="radio-group"
                                        />
                                        <label htmlFor="test4">
                                            {t("harmful_act")}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="test5"
                                            name="radio-group"
                                        />
                                        <label htmlFor="test5">
                                            {t("child_abuse")}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="test6"
                                            name="radio-group"
                                        />
                                        <label htmlFor="test6">
                                            {t("spam_or_misleading")}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="test7"
                                            name="radio-group"
                                        />
                                        <label htmlFor="test7">
                                            {t("infringers")}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            id="test8"
                                            name="radio-group"
                                        />
                                        <label htmlFor="test8">
                                            {t("caption_issue")}
                                        </label>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                    >
                                        {t("submit")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withToastManager(translate(VideoOverView));
