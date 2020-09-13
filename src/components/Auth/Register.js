import React, { Component } from "react";
import { Link } from "react-router-dom";
import Helper from "../Helper/helper";
import api from "../../Environment";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../Helper/toaster";
import GoogleLogin from "react-google-login";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { apiConstants } from "../Constant/constants";

import configuration from "react-global-configuration";

import {
    setTranslations,
    setDefaultLanguage,
    translate
} from "react-multi-lang";
var const_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

class RegisterComponent extends Helper {
    state = {
        data: {
            email: "",
            password: "",
            name: "",
            timezone: const_time_zone
        },
        loadingContent: null,
        buttonDisable: false
    };

    handleSubmit = event => {
        event.preventDefault();
        const { state } = this.props.location;
        this.setState({
            loadingContent: this.props.t("button_loading"),
            buttonDisable: true
        });
        api.postMethod("v4/register", this.state.data)
            .then(response => {
                if (response.data.success) {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.message,
                        "success"
                    );
                    this.setState({
                        loadingContent: null,
                        buttonDisable: false
                    });
                    console.log("Yes");
                    window.location = state ? state.from.pathname : "/";
                } else {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.error_messages,
                        "error"
                    );
                    this.setState({
                        loadingContent: null,
                        buttonDisable: false
                    });

                    if (response.data.error_code == 3001) {
                        setTimeout(function() {
                            window.location = "/login";
                        }, 3000);
                    }
                }
            })
            .catch(error => {
                this.setState({ loadingContent: null, buttonDisable: false });
                ToastDemo(this.props.toastManager, error, "error");
            });
    };

    responseFacebook = response => {
        const path = this.props.location;
        const googleLoginInput = {
            social_unique_id: response.profileObj.googleId,
            login_by: "google",
            email: response.profileObj.email,
            name: response.profileObj.name,
            picture: response.profileObj.imageUrl,
            device_type: "web",
            device_token: "123466",
            timezone: const_time_zone
        };
        api.postMethod("v4/register", googleLoginInput)
            .then(response => {
                if (response.data.success === true) {
                    localStorage.setItem("userId", response.data.data.user_id);
                    localStorage.setItem(
                        "accessToken",
                        response.data.data.token
                    );
                    localStorage.setItem(
                        "userType",
                        response.data.data.user_type
                    );
                    localStorage.setItem(
                        "push_status",
                        response.data.data.push_status
                    );
                    localStorage.setItem("username", response.data.data.name);
                    localStorage.setItem(
                        "active_profile_id",
                        response.data.data.sub_profile_id
                    );
                    ToastDemo(
                        this.props.toastManager,
                        response.data.message,
                        "success"
                    );
                    this.props.history.push("/view-profiles");
                    this.setState({
                        loadingContent: null,
                        buttonDisable: false
                    });
                } else {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.error_messages,
                        "error"
                    );
                    this.setState({
                        loadingContent: null,
                        buttonDisable: false
                    });
                }
            })
            .catch(error => {
                ToastDemo(this.props.toastManager, error, "error");
                this.setState({ loadingContent: null, buttonDisable: false });
            });
    };

    responseGoogle = response => {
        const path = this.props.location;
        const googleLoginInput = {
            social_unique_id: response.profileObj.googleId,
            login_by: "google",
            email: response.profileObj.email,
            name: response.profileObj.name,
            picture: response.profileObj.imageUrl,
            device_type: "web",
            device_token: "123466",
            timezone: const_time_zone
        };
        api.postMethod("v4/register", googleLoginInput)
            .then(response => {
                if (response.data.success === true) {
                    localStorage.setItem("userId", response.data.data.user_id);
                    localStorage.setItem(
                        "accessToken",
                        response.data.data.token
                    );
                    localStorage.setItem(
                        "userType",
                        response.data.data.user_type
                    );
                    localStorage.setItem(
                        "push_status",
                        response.data.data.push_status
                    );
                    localStorage.setItem("username", response.data.data.name);
                    localStorage.setItem(
                        "active_profile_id",
                        response.data.data.sub_profile_id
                    );
                    ToastDemo(
                        this.props.toastManager,
                        response.data.message,
                        "success"
                    );
                    this.props.history.push("/view-profiles");
                    this.setState({
                        loadingContent: null,
                        buttonDisable: false
                    });
                } else {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.error_messages,
                        "error"
                    );
                    this.setState({
                        loadingContent: null,
                        buttonDisable: false
                    });
                }
            })
            .catch(error => {
                ToastDemo(this.props.toastManager, error, "error");
                this.setState({ loadingContent: null, buttonDisable: false });
            });
    };

    render() {
        const { t } = this.props;
        var bgImg = {
            backgroundImage: `url(${configuration.get(
                "configData.common_bg_image"
            )})`
        };
        const { data } = this.state;
        return (
            <div>
                <div className="common-bg-img" style={bgImg}>
                    <div className="auth-page-header">
                        <Link to={"/"}>
                            <img
                                src={configuration.get("configData.site_logo")}
                                className="site-logo"
                                alt="logo_img"
                            />
                        </Link>
                    </div>

                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 col-xl-4 auto-margin">
                            <div className="register-box">
                                <h3 className="register-box-head">
                                    {t("signup")}
                                </h3>
                                <form
                                    className="auth-form"
                                    onSubmit={this.handleSubmit}
                                >
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            {t("full_name")}
                                        </label>
                                        <input
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={data.name}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            {t("email_address")}
                                        </label>
                                        <input
                                            type="email"
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={data.email}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd">
                                            {t("password")}
                                        </label>
                                        <input
                                            type="password"
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="pwd"
                                            name="password"
                                            value={data.password}
                                        />
                                    </div>
                                    <button
                                        className="btn btn-danger auth-btn mt-4"
                                        disabled={this.state.buttonDisable}
                                    >
                                        {this.state.loadingContent != null
                                            ? this.state.loadingContent
                                            : "sign up"}
                                    </button>
                                </form>

                                <div>
                                    {apiConstants.FACEBOOK_APP_ID == "" ? (
                                        ""
                                    ) : (
                                        <FacebookLogin
                                            appId={apiConstants.FACEBOOK_APP_ID}
                                            // autoLoad
                                            callback={this.responseFacebook}
                                            render={renderProps => (
                                                <button
                                                    className="social"
                                                    onClick={
                                                        renderProps.onClick
                                                    }
                                                    disabled={
                                                        renderProps.disabled
                                                    }
                                                >
                                                    <i className="fab fa-facebook fb social-icons" />{" "}
                                                    {t("login_with")}{" "}
                                                    {t("facebook")}
                                                </button>
                                            )}
                                        />
                                    )}
                                </div>
                                <div>
                                    {apiConstants.GOOGLE_CLIENT_ID == "" ? (
                                        ""
                                    ) : (
                                        <GoogleLogin
                                            clientId={
                                                apiConstants.GOOGLE_CLIENT_ID
                                            }
                                            render={renderProps => (
                                                <button
                                                    className="social"
                                                    onClick={
                                                        renderProps.onClick
                                                    }
                                                    disabled={
                                                        renderProps.disabled
                                                    }
                                                >
                                                    <i className="fab fa-google-plus-square google social-icons" />{" "}
                                                    {t("login_with")}{" "}
                                                    {t("google")}
                                                </button>
                                            )}
                                            buttonText="Login"
                                            onSuccess={this.responseGoogle}
                                            onFailure={this.responseGoogle}
                                            cookiePolicy={"single_host_origin"}
                                        />
                                    )}
                                </div>

                                <p className="auth-link">
                                    {t("already_have_account")}{" "}
                                    <Link to={"/login"} className="btn-link">
                                        {t("sign_in_now")}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withToastManager(translate(RegisterComponent));
