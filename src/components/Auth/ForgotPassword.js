import React, { Component } from "react";

import { Link } from "react-router-dom";

import api from "../../Environment";
import Helper from "../Helper/helper";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../Helper/toaster";

import { translate } from "react-multi-lang";
import configuration from "react-global-configuration";

class ForgotPasswordComponent extends Helper {
    state = {
        data: {
            email: ""
        },
        loadingContent: null,
        buttonDisable: false
    };

    handleSubmit = event => {
        event.preventDefault();
        const { state } = this.props.location;
        this.setState({
            loadingContent: this.props.t("loading_text"),
            buttonDisable: true
        });
        api.postMethod("forgotpassword", this.state.data)
            .then(response => {
                if (response.data.success) {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.message,
                        "success"
                    );
                    this.props.history.push("/login");

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
                this.setState({ loadingContent: null, buttonDisable: false });
                ToastDemo(this.props.toastManager, error, "error");
            });
    };
    render() {
        const { t } = this.props;

        var bgImg = {
            backgroundImage: `url(${configuration.get(
                "configData.common_bg_image"
            )})`
        };

        return (
            <div>
                <div className="common-bg-img" style={bgImg}>
                    <div className="auth-page-header">
                        <Link to={"/"}>
                            <img
                                src={configuration.get("configData.site_logo")}
                                className="site-logo"
                                alt={configuration.get("configData.site_name")}
                            />
                        </Link>
                    </div>

                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 col-xl-4 auto-margin">
                            <div className="register-box">
                                <h3 className="register-box-head">
                                    {t("forgot_password")}
                                </h3>
                                <form
                                    className="auth-form"
                                    onSubmit={this.handleSubmit}
                                >
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
                                            placeholder="name@example.com"
                                            value={this.state.data.email}
                                        />
                                    </div>
                                    <p className="mt-4 black-clr">
                                        {t("forgot_password_text")}
                                    </p>
                                    <button
                                        className="btn btn-danger auth-btn"
                                        disabled={this.state.buttonDisable}
                                    >
                                        {this.state.loadingContent != null
                                            ? this.state.loadingContent
                                            : this.props.t("submit")}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withToastManager(translate(ForgotPasswordComponent));
