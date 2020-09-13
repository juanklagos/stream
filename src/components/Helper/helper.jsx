import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import api from "../../Environment";
import { apiConstants } from "../Constant/constants";
import ToastDemo from "./toaster";

class Helper extends Component {
  state = {
    categories: {
      data: []
    },
    recentUpload: [
      {
        data: []
      },
      {
        data: []
      }
    ],
    userDetails: {},
    data: {},
    errors: {},
    activeProfile: null,
    loading: true,
    videoDetailsFirst: null,
    loadingFirst: true,
    videoDetailsSecond: null,
    suggestion: null,
    loadingSuggestion: true,
    maindata: null,
    banner: null,
    wishlistApiCall: false,
    wishlistResponse: null,
    redirect: false,
    redirectPPV: false,
    redirectPaymentOption: false,
    redirectSubscription: false,
    loadingHomeSecondSection: false,
    homeSecondData: null,
    addNewProfileOption: null,
    onPlayStarted: false
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  getUserDetails() {
    api.postMethod("profile").then(response => {
      if (response.data.success === true) {
        let data = response.data.data;
        this.setState({ loading: false, data: data });
      }
    });
  }

  viewProfiles() {
    api.postMethod("sub_profiles").then(response => {
      if (response.data.success === true) {
        let activeProfile = response.data.data.sub_profiles;
        this.setState({
          loading: false,
          activeProfile: activeProfile,
          addNewProfileOption: response.data.data.is_new_sub_profile_allowed
        });
      }
    });
  }

  singleVideoFirst(inputData) {
    api
      .postMethod("videos/view", inputData)
      .then(response => {
        if (response.data.success === true) {
          let videoDetailsFirst = response.data.data;

          this.setState({
            loadingFirst: false,
            videoDetailsFirst: videoDetailsFirst
          });
          this.singleVideoSecond(inputData);
        } else {
        }
      })
      .catch(function(error) {});
  }
  async onlySingleVideoFirst(inputData) {
    await api
      .postMethod("videos/view", inputData)
      .then(response => {
        if (response.data.success === true) {
          let videoDetailsFirst = response.data.data;

          this.setState({
            loadingFirst: false,
            videoDetailsFirst: videoDetailsFirst
          });
        } else {
          this.setState({ videoDetailsFirst: response.data });
        }
      })
      .catch(function(error) {});
  }
  singleVideoSecond(inputData) {
    api
      .postMethod("videos/view/second", inputData)
      .then(response => {
        if (response.data.success === true) {
          let videoDetailsSecond = response.data.data;

          this.setState({
            loadingSecond: false,
            videoDetailsSecond: videoDetailsSecond
          });
        } else {
        }
      })
      .catch(function(error) {});
  }
  suggestion(inputData) {
    api
      .postMethod("suggestions", inputData)
      .then(response => {
        if (response.data.success === true) {
          let suggestion = response.data.data;

          this.setState({
            loadingSuggestion: false,
            suggestion: suggestion
          });
        } else {
        }
      })
      .catch(function(error) {});
  }
  homeFirstSection(inputData) {
    api
      .postMethod("home_first_section", inputData)
      .then(response => {
        if (response.data.success === true) {
          let maindata = response.data.data;
          let banner = response.data.banner;

          this.setState({ loading: false, maindata: maindata, banner: banner });
        } else {
          let errorHandle = 1;
          this.setState({ errorHandle });
        }
        this.homeSecondSection(inputData);
      })
      .catch(function(error) {});
  }

  homeSecondSection(inputData) {
    api
      .postMethod("home_second_section", inputData)
      .then(response => {
        if (response.data.success === true) {
          this.setState({
            loadingHomeSecondSection: false,
            homeSecondData: response.data.data
          });
        } else {
          let errorHandle = 1;
          this.setState({ errorHandle });
        }
      })
      .catch(function(error) {});
  }

  wishlistUpdate(inputData) {
    api.postMethod("wishlists/operations", inputData).then(response => {
      if (response.data.success === true) {
        ToastDemo(this.props.toastManager, response.data.message, "success");
        this.setState({
          wishlistResponse: response.data,
          wishlistApiCall: true
        });
      } else {
        ToastDemo(
          this.props.toastManager,
          response.data.error_messages,
          "error"
        );
      }
    });
  }

  redirectStatus(StatusData) {
    if (StatusData.should_display_ppv != 0) {
      if (StatusData.ppv_page_type == 2) {
        this.setState({ redirectPaymentOption: true });
      } else {
        this.setState({ redirectPPV: true });
      }
    } else {
      if (StatusData.is_user_need_subscription == 0) {
        this.setState({ redirect: true });
      } else {
        this.setState({ redirectSubscription: true });
      }
    }
  }

  renderRedirectPage(videoDetailsFirst, pageType) {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      if (pageType == "videoPage") {
        // Don't do anything.
      } else {
        return (
          <Redirect
            to={{
              pathname: `/video/${videoDetailsFirst.admin_video_id}`,
              state: { videoDetailsFirst: videoDetailsFirst }
            }}
          />
        );
      }
    } else if (this.state.redirectPPV) {
      this.setState({ redirectPPV: false });

      return (
        <Redirect
          to={{
            pathname: "/pay-per-view",
            state: {
              videoDetailsFirst: videoDetailsFirst
            }
          }}
        />
      );
    } else if (this.state.redirectPaymentOption) {
      this.setState({ redirectPaymentOption: false });

      return (
        <Redirect
          to={{
            pathname: "/payment-options",
            state: {
              videoDetailsFirst: videoDetailsFirst
            }
          }}
        />
      );
    } else if (this.state.redirectSubscription) {
      this.setState({ redirectSubscription: false });
      return (
        <Redirect
          to={{
            pathname: "/subscription",
            state: {
              videoDetailsFirst: videoDetailsFirst
            }
          }}
        />
      );
    } else {
      return null;
    }
  }
}

export default Helper;
