import React, { Component } from "react";
import { Link } from "react-router-dom";
import Helper from "../../Helper/helper";
import { apiConstants } from "../../Constant/constants";
import SuggestionInputSearch from "suggestion-react-input-search";
import api from "../../../Environment";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";
import configuration from "react-global-configuration";

import {
    setTranslations,
    setDefaultLanguage,
    translate
} from "react-multi-lang";

const $ = window.$;

class UserHeader extends Helper {
    constructor(props) {
        super(props);
    }
    state = {
        loading: true,
        activeProfile: null,
        loadingCategory: true,
        categories: null,
        loadingNotification: true,
        notificationCount: null,
        notifications: null,
        playButtonClicked: false,
        value: "",
        suggestions: null,
        mobileSidebar: false,
        loadingSuggesstion: true,
        displaySuggesstion: "none"
    };

    componentDidMount() {
        var headerHeight = $("#header").outerHeight();

        $(".header-height").height(headerHeight);
        this.viewProfiles();
        let inputData = {};
        api.postMethod("v4/categories/list", inputData)
            .then(response => {
                if (response.data.success === true) {
                    let categories = response.data.data;

                    this.setState({
                        loadingCategory: false,
                        categories: categories
                    });
                } else {
                }
            })
            .catch(function(error) {});
        // Notification count API
        let notificationInputData = {
            skip: 0,
            take: 4
        };
        api.postMethod("notifications", notificationInputData)
            .then(response => {
                if (response.data.success === true) {
                    let notificationCount = response.data.count;
                    let notifications = response.data.data;
                    this.setState({
                        loadingNotification: false,
                        notificationCount: notificationCount,
                        notifications: notifications
                    });
                } else {
                }
            })
            .catch(function(error) {});
    }

    handleSearchChange = ({ currentTarget: input }) => {
        console.log("Input:", input);
        if (input.value != "") {
            this.setState({ displaySuggesstion: "block" });
        } else {
            this.setState({ displaySuggesstion: "none" });
        }
        api.postMethod("search_videos", { key: input.value })
            .then(response => {
                if (response.data.success === true) {
                    console.log("REsponse", response.data);
                    this.setState({
                        suggestions: response.data.data,
                        loadingSuggesstion: false
                    });
                } else {
                }
            })
            .catch(function(error) {});
    };

    handleOnSubmit = (event, value) => {
        event.preventDefault();
        console.log("submit", value);
    };

    searchResult = () => {
        api.postMethod("search_videos")
            .then(response => {
                if (response.data.success === true) {
                    let notificationCount = response.data.count;
                    let notifications = response.data.data;
                    this.setState({
                        loadingNotification: false,
                        notificationCount: notificationCount,
                        notifications: notifications
                    });
                } else {
                }
            })
            .catch(function(error) {});
    };

    handleNotificationChange = ({ currentTarget: input }) => {
        let inputData;
        if (input.checked) {
            inputData = 1;
        } else {
            inputData = 0;
        }
        api.postMethod("settings", { status: inputData })
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem(
                        "push_status",
                        response.data.push_status
                    );
                } else {
                }
            })
            .catch(function(error) {});
    };

    changeProfile = (profile, event) => {
        event.preventDefault();

        localStorage.removeItem("active_profile_id");
        localStorage.setItem("active_profile_id", profile.sub_profile_id);
        localStorage.setItem("active_profile_image", profile.picture);
        localStorage.setItem("active_profile_name", profile.name);

        window.location = "/home";
    };

    handlePlayVideo = async (event, admin_video_id) => {
        event.preventDefault();

        let inputData = {
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

    renderList = activeProfile => {
        return (
            <div>
                {activeProfile.map(profile =>
                    profile.sub_profile_id ==
                    localStorage.getItem("active_profile_id") ? (
                        ""
                    ) : (
                        <Link
                            className="dropdown-item"
                            key={profile.sub_profile_id}
                            to="/view-profiles"
                            onClick={event =>
                                this.changeProfile(profile, event)
                            }
                        >
                            <div className="display-inline">
                                <div className="left-sec">
                                    <img
                                        src={profile.picture}
                                        alt="profile_img"
                                    />
                                </div>
                                <div className="right-name">{profile.name}</div>
                            </div>
                        </Link>
                    )
                )}
            </div>
        );
    };

    toggleMobileSidebar = () => {
        this.setState({
            mobileSidebar: !this.state.mobileSidebar
        });
    };

    render() {
        const { t } = this.props;

        const {
            loading,
            activeProfile,
            loadingCategory,
            categories,
            loadingNotification,
            notificationCount,
            notifications,
            value,
            suggestions,
            loadingSuggesstion
        } = this.state;
        const recentSearches = [
            "star wars 1",
            "star wars 2",
            "star trek 3",
            "star wars 4",
            "aaa"
        ];

        const placeholder = "title...";

        const inputPosition = "center";

        if (this.state.playButtonClicked) {
            const returnToVideo = this.renderRedirectPage(
                this.state.videoDetailsFirst
            );

            if (returnToVideo != null) {
                return returnToVideo;
            }
        }

        const inputProps = {
            placeholder: "Type...",
            value,
            onChange: this.onChange
        };

        return (
            <div>
                <nav
                    className="navbar navbar-expand navbar-dark main-nav fixed-top"
                    id="header"
                >
                    <span
                        className="menu-icon"
                        id="menu_icon"
                        onClick={() => this.toggleMobileSidebar()}
                    >
                        <img
                            src={
                                window.location.origin + "/assets/img/menu.png"
                            }
                            alt="menu_img"
                        />
                    </span>
                    <Link className="navbar-brand abs" to="/home">
                        <img
                            src={configuration.get("configData.site_logo")}
                            className="logo-img desktop-logo"
                            alt="Streamview"
                        />
                        <img
                            src={configuration.get("configData.site_icon")}
                            className="logo-img mobile-logo"
                            alt="Streamview"
                        />
                    </Link>
                    <ul className="navbar-nav mobile-nav">
                        <li className="nav-item active dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                data-toggle="dropdown"
                                to="#"
                            >
                                browse
                            </Link>
                            <div className="dropdown-menu browse">
                                {loadingCategory
                                    ? ""
                                    : categories.map((category, index) => (
                                          <Link
                                              className="dropdown-item"
                                              to="#"
                                              key={`category-drop-${index}`}
                                          >
                                              {category.name}
                                          </Link>
                                      ))}
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav desktop-nav ">
                        <li className="nav-item active" key="home">
                            <Link className="nav-link" to={"/home"}>
                                {t("home")}
                            </Link>
                        </li>
                        <li className="nav-item" key="series-header">
                            <Link
                                className="nav-link"
                                to={`/genre/${apiConstants.SERIES}`}
                            >
                                {t("series")}
                            </Link>
                        </li>
                        <li className="nav-item" key="movies-header">
                            <Link
                                className="nav-link"
                                to={`/genre/${apiConstants.MOVIES}`}
                            >
                                {t("movies")}
                            </Link>
                        </li>
                        <li className="nav-item" key="kids-header">
                            <Link
                                className="nav-link"
                                to={`/genre/${apiConstants.KIDS}`}
                            >
                                {t("kids")}
                            </Link>
                        </li>
                        <li className="nav-item dropdown" key="browse-header">
                            <Link
                                className="nav-link dropdown-toggle"
                                data-toggle="dropdown"
                                to="#"
                            >
                                {t("browse")}
                            </Link>
                            <div className="dropdown-menu browse">
                                {loadingCategory
                                    ? ""
                                    : categories.map(category => (
                                          <Link
                                              key={category.category_id}
                                              className="dropdown-item"
                                              to={`/category/${category.category_id}`}
                                          >
                                              {category.name}
                                          </Link>
                                      ))}
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <form className="search-suggestion-form">
                                <div className="search-input-container center">
                                    <div className="search-input-container__inner">
                                        <input
                                            type="text"
                                            name="search"
                                            placeholder="title..."
                                            className="form-control search-form"
                                            onChange={this.handleSearchChange}
                                        />
                                        <div
                                            className="suggestions-container center"
                                            style={{
                                                maxHeight: "207.95px",
                                                display: this.state
                                                    .displaySuggesstion
                                            }}
                                        >
                                            <ul>
                                                {loadingSuggesstion ? (
                                                    t("loading")
                                                ) : suggestions.length > 0 ? (
                                                    suggestions.map(
                                                        (
                                                            suggesstion,
                                                            index
                                                        ) => (
                                                            <li
                                                                className=""
                                                                key={`suggestion-video/${index}`}
                                                                onClick={event =>
                                                                    this.handlePlayVideo(
                                                                        event,
                                                                        suggesstion.admin_video_id
                                                                    )
                                                                }
                                                            >
                                                                <span>
                                                                    {
                                                                        suggesstion.title
                                                                    }
                                                                </span>
                                                            </li>
                                                        )
                                                    )
                                                ) : (
                                                    <li
                                                        className=""
                                                        key="suggestion-no-result"
                                                    >
                                                        <span>{t("no_results_found")}</span>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </li>
                        <li className="nav-item dropdown mobile-view">
                            <Link
                                className="nav-link notification dropdown-toggle"
                                to="#"
                                data-toggle="dropdown"
                            >
                                <div className="notification-count">
                                    {loadingNotification
                                        ? ""
                                        : notificationCount}
                                </div>
                                <i className="fas fa-bell" />
                            </Link>
                            <div className="dropdown-menu notification-drop">
                                <div className="notification-onoff">
                                    {t("notification")}
                                    {/* <div className="float-right">
                                        <label className="switch">
                                        <input
                                            type="checkbox"
                                            defaultChecked={
                                            localStorage.getItem("push_status") == 1
                                                ? true
                                                : false
                                            }
                                            onChange={this.handleNotificationChange}
                                            name="notificationStatus"
                                        />
                                        <span className="switch-slider round" />
                                        </label>
                                    </div> */}
                                    <div className="clearfix" />
                                </div>
                                <div className="notification-drop-height">
                                    {loadingNotification
                                        ? ""
                                        : notifications.map(notification => (
                                              <Link
                                                  className="dropdown-item"
                                                  to="#"
                                                  onClick={event =>
                                                      this.handlePlayVideo(
                                                          event,
                                                          notification.admin_video_id
                                                      )
                                                  }
                                              >
                                                  <div className="display-inline">
                                                      <div className="video-left">
                                                          <img
                                                              src={
                                                                  notification.img
                                                              }
                                                              alt="Notification"
                                                          />
                                                      </div>
                                                      <div className="video-right-details">
                                                          <h5>
                                                              {
                                                                  notification.title
                                                              }
                                                          </h5>
                                                          <p>
                                                              {
                                                                  notification.time
                                                              }
                                                          </p>
                                                      </div>
                                                  </div>
                                              </Link>
                                          ))}
                                </div>
                                <div className="notification-seeall">
                                    <Link to={"notification/view-all"}>
                                        {t("see_all")}
                                        <i className="fas fa-chevron-right" />
                                    </Link>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item dropdown mobile-view">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                data-toggle="dropdown"
                            >
                                <img
                                    src={localStorage.getItem(
                                        "active_profile_image"
                                    )}
                                    className="nav-profile-img"
                                    alt="profile_img"
                                />
                            </Link>
                            <div className="dropdown-menu profile-drop">
                                <div className="pro-sec-height">
                                    {loading
                                        ? "Loading"
                                        : this.renderList(activeProfile)}

                                    <Link
                                        className="dropdown-item"
                                        to="/manage-profiles"
                                    >
                                        {t("manage_profile")}
                                    </Link>
                                </div>
                                <p className="profile-drop-line" />
                                <Link className="dropdown-item" to="/account">
                                    {t("account")}
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    to="/payment-history"
                                >
                                    {t("payment_history")}
                                </Link>
                                <Link className="dropdown-item" to={"/logout"}>
                                    {t("signout")}
                                </Link>
                            </div>
                        </li>
                    </ul>
                </nav>
                <div className="header-height" />

                <div
                    className="mobile-sidebar"
                    id="menu_content"
                    style={{
                        display: this.state.mobileSidebar ? "block" : "none"
                    }}
                >
                    <div className="sidebar-content">
                        <div className="p-3">
                            <Link to="/view-profiles">
                                <div className="display-inline">
                                    <div className="left-sec">
                                        <img
                                            src={localStorage.getItem(
                                                "active_profile_image"
                                            )}
                                            alt="User "
                                        />
                                    </div>
                                    <div className="right-name">
                                        <h5>
                                            {localStorage.getItem(
                                                "active_profile_name"
                                            )}
                                        </h5>
                                        <h6>{t("switch_profiles")}</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <ul className="sidebar-menu" id="mobile-side-menu">
                            <li className="active" key="account-sidemenu">
                                <Link to="/account">{"account"}</Link>
                            </li>
                            <li key="logout-sidemenu">
                                <Link to="/">{t("logout")}</Link>
                            </li>
                            <li className="line" />
                            <li key="home-sidemenu">
                                <Link to="/home">{t("home")}</Link>
                            </li>

                            <li key="series-mobile-header">
                                <Link to={`/genre/${apiConstants.SERIES}`}>
                                    {t("series")}
                                </Link>
                            </li>

                            <li key="movies-mobile-header">
                                <Link to={`/genre/${apiConstants.MOVIES}`}>
                                    {t("movies")}
                                </Link>
                            </li>

                            <li key="kids-mobile-header">
                                <Link to={`/genre/${apiConstants.KIDS}`}>
                                    {t("kids")}
                                </Link>
                            </li>

                            <li className="dropdown" key="browse-mobile-header">
                                <Link
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                    to="#"
                                >
                                    {t("browse")}
                                </Link>
                                <div className="dropdown-menu browse">
                                    {loadingCategory
                                        ? ""
                                        : categories.map(category => (
                                              <Link
                                                  key={category.category_id}
                                                  className="dropdown-item"
                                                  to={`/category/${category.category_id}`}
                                              >
                                                  {category.name}
                                              </Link>
                                          ))}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default withToastManager(translate(UserHeader));
