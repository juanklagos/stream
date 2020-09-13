import React, { Component } from "react";
import {
  setTranslations,
  setDefaultLanguage,
  translate,
  getLanguage,
  setLanguage
} from "react-multi-lang";
import en from "../translation/en.json";
import pt from "../translation/pt.json";
import { Link } from "react-router-dom";
import configuration from "react-global-configuration";
import { apiConstants } from "../../components/Constant/constants";

class LandingPage extends Component {
  state = {
    HomeSettings: [],
    loading: true
  };
  componentDidMount() {
    // Call api function
    console.log(getLanguage());

    this.fetchConfig();
  }

  async fetchConfig() {
    const response = await fetch(apiConstants.homeSettingsUrl);

    const homeResonse = await response.json();

    this.setState({
      loading: false,
      HomeSettings: homeResonse.data
    });
  }

  render() {
    const { t } = this.props;
    const { loading, HomeSettings } = this.state;

    return (
      <div>
        <div className="landing-page-header">
          <Link to="/">
            <img
              src={configuration.get("configData.site_logo")}
              className="site-logo"
              alt="site_logo"
            />
          </Link>
          <Link to="/login" className="btn btn-danger">
            {t("signin")}
          </Link>
        </div>

        {loading ? (
          <div>
            <div className="landing-banner-sec">
              <img
                className="landing-banner-img"
                src="assets/img/default-banner.jpg"
                // srcSet="assets/img/banner_small.jpg 1000w,
                //             assets/img/banner_medium.jpg 1500w,
                //             assets/img/banner_large.jpg 1800w"
                alt="banner_image"
              />
              <div className="banner-black-overlay">
                <div className="text-center">
                  <h1 className="benner-text-head">{t("see_whats_next")}</h1>
                  <h4 className="banner-text-para">
                    {t("watch_and_cancel_text")}
                  </h4>
                  <Link
                    to="/register"
                    className="btn btn-danger banner-large-btn"
                  >
                    {t("join_free_a_month")}
                    <i className="fas fa-chevron-right ml-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="main">
              <div className="landing-nav">
                <div className="landing-nav-list">
                  <ul className="nav nav-pills" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="pill"
                        href="#home"
                      >
                        <p className="m-0">
                          <i className="fas fa-copy" />
                        </p>
                        <p className="hide-xs landing-nav-list-text">
                          {t("no_commitments")}
                          <br />
                          {t("cancel_online_anytime")}
                        </p>
                        <p className="show-xs landing-nav-list-text-xs">
                          {t("cancel")}
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="pill" href="#menu1">
                        <p className="m-0">
                          <i className="fas fa-mobile-alt" />
                        </p>
                        <p className="hide-xs landing-nav-list-text">
                          {t("watch_anywhere")}
                        </p>
                        <p className="show-xs landing-nav-list-text-xs">
                          {t("devices")}
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="pill" href="#menu2">
                        <i className="fas fa-tags" />
                        <p className="hide-xs landing-nav-list-text">
                          {t("pick_price")}
                        </p>
                        <p className="show-xs landing-nav-list-text-xs">
                          {t("devices")}
                        </p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="black-bg">
                <div className="tab-module-wrapper">
                  <div className="tab-content">
                    <div id="home" className="tab-pane active">
                      <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 center-align">
                          <h2 className="cancel-text">
                            {t("cancel_online_text")}
                          </h2>
                          <Link
                            to={"/register"}
                            className="btn btn-danger join-btn"
                          >
                            {t("join_free_a_month")}
                          </Link>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                          <div className="cancel-online-img">
                            <img src="assets/img/cancel.png" alt="Canel" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="menu1" className="tab-pane fade">
                      <div className="row center-align">
                        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8">
                          <h3 className="devices-text">
                            {t("personalised_tv_programmes_text")}
                          </h3>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                          <Link
                            to={"/register"}
                            className="btn btn-danger join-btn"
                          >
                            {t("join_free_a_month")}
                          </Link>
                        </div>
                      </div>
                      <div className="row text-center">
                        <div className="col-md-12 col-lg-4 col-xl-4">
                          <div className="devices-img">
                            <img src="assets/img/tv.png" alt="Tv" />
                          </div>
                          <h4 className="device-img-txt">
                            {t("watch_on_your_tv")}
                          </h4>
                          <p className="device-img-para">
                            {t("watch_on_your_tv_text")}
                          </p>
                        </div>
                        <div className="col-md-12 col-lg-4 col-xl-4">
                          <div className="devices-img">
                            <img src="assets/img/tab.png" alt="Tab" />
                          </div>
                          <h4 className="device-img-txt">
                            {t("watch_instantly")}
                          </h4>
                          <p className="device-img-para">
                            {t("watch_instantly_text")}
                          </p>
                        </div>
                        <div className="col-md-12 col-lg-4 col-xl-4">
                          <div className="devices-img">
                            <img src="assets/img/lap.png" alt="Lap" />
                          </div>
                          <h4 className="device-img-txt">
                            {t("use_any_computer")}
                          </h4>
                          <p className="device-img-para">
                            {t("watch_instantly_in_browser")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div id="menu2" className="tab-pane fade">
                      <div className="text-center">
                        <h3 className="devices-text">
                          {t("watch_instantly_in_browser_text")}
                        </h3>
                        <Link
                          to={"/register"}
                          className="btn btn-danger join-btn"
                        >
                          {t("join_free_a_month")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="landing-banner-sec">
              <img
                className="landing-banner-img"
                src={HomeSettings.home_page_bg_image}
                // srcSet="assets/img/banner_small.jpg 1000w,
                // assets/img/banner_medium.jpg 1500w,
                // assets/img/banner_large.jpg 1800w"
                alt={configuration.get("configData.site_name")}
              />
              <div className="banner-black-overlay">
                <div className="text-center">
                  <h1 className="benner-text-head">
                    {HomeSettings.home_banner_heading}
                  </h1>
                  <h4 className="banner-text-para">
                    {HomeSettings.home_banner_description}
                  </h4>
                  <Link
                    to="/register"
                    className="btn btn-danger banner-large-btn"
                  >
                    {t("join_free_a_month")}
                    <i className="fas fa-chevron-right ml-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="main">
              <div className="landing-nav">
                <div className="landing-nav-list">
                  <ul className="nav nav-pills" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="pill"
                        href="#home"
                      >
                        <p className="m-0">
                          <i className="fas fa-copy" />
                        </p>
                        <p className="hide-xs landing-nav-list-text">
                          {t("no_commitments")}
                          <br />
                          {t("cancel_online_anytime")}
                        </p>
                        <p className="show-xs landing-nav-list-text-xs">
                          {t("cancel")}
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="pill" href="#menu1">
                        <p className="m-0">
                          <i className="fas fa-mobile-alt" />
                        </p>
                        <p className="hide-xs landing-nav-list-text">
                          {t("watch_anywhere")}
                        </p>
                        <p className="show-xs landing-nav-list-text-xs">
                          {t("devices")}
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="pill" href="#menu2">
                        <i className="fas fa-tags" />
                        <p className="hide-xs landing-nav-list-text">
                          {t("about")}{" "}
                          {configuration.get("configData.site_name")}
                        </p>
                        <p className="show-xs landing-nav-list-text-xs">
                          {t("devices")}
                        </p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="black-bg">
                <div className="tab-module-wrapper">
                  <div className="tab-content">
                    <div id="home" className="tab-pane active">
                      <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 center-align">
                          <h2 className="cancel-text">
                            {HomeSettings.home_cancel_content}
                          </h2>
                          <Link
                            to={"/register"}
                            className="btn btn-danger join-btn"
                          >
                            {t("join_free_a_month")}
                          </Link>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                          <div className="cancel-online-img">
                            <img
                              src={HomeSettings.home_cancel_image}
                              alt="Canel"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="menu1" className="tab-pane fade">
                      <div className="row center-align">
                        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8">
                          <h3 className="devices-text">
                            {t("personalised_tv_programmes_text")}
                          </h3>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                          <Link
                            to={"/register"}
                            className="btn btn-danger join-btn"
                          >
                            {t("join_free_a_month")}
                          </Link>
                        </div>
                      </div>
                      <div className="row text-center">
                        <div className="col-md-12 col-lg-4 col-xl-4">
                          <div className="devices-img">
                            <img
                              src={HomeSettings.home_browse_tv_image}
                              alt="Tv"
                            />
                          </div>
                          <h4 className="device-img-txt">
                            {t("watch_on_your_tv")}
                          </h4>
                          <p className="device-img-para">
                            {t("watch_on_your_tv_text")}
                          </p>
                        </div>
                        <div className="col-md-12 col-lg-4 col-xl-4">
                          <div className="devices-img">
                            <img
                              src={HomeSettings.home_browse_mobile_image}
                              alt="Tab"
                            />
                          </div>
                          <h4 className="device-img-txt">
                            {t("watch_instantly")}
                          </h4>
                          <p className="device-img-para">
                            {t("watch_instantly_text")}
                          </p>
                        </div>
                        <div className="col-md-12 col-lg-4 col-xl-4">
                          <div className="devices-img">
                            <img
                              src={HomeSettings.home_browse_desktop_image}
                              alt="Lap"
                            />
                          </div>
                          <h4 className="device-img-txt">
                            {t("use_any_computer")}
                          </h4>
                          <p className="device-img-para">
                            {t("watch_instantly_in_browser")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div id="menu2" className="tab-pane fade">
                      <div className="text-center">
                        <h3 className="devices-text">
                          {HomeSettings.home_about_site}
                        </h3>
                        <Link
                          to={"/register"}
                          className="btn btn-danger join-btn"
                        >
                          {t("join_free_a_month")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default translate(LandingPage);
