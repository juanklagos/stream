import React, { Component } from "react";
import Helper from "../../Helper/helper";
import api from "../../../Environment";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";

import {
    setTranslations,
    setDefaultLanguage,
    translate
} from "react-multi-lang";
import en from "../../translation/en.json";
import pt from "../../translation/pt.json";
import configuration from "react-global-configuration";

class ChangePasswordComponent extends Helper {
    state = {
        data: {},
        loadingContent: null,
        buttonDisable: false
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            loadingContent: "Loading... Please wait..",
            buttonDisable: true
        });
        this.changePassword();
    };

    changePassword = () => {
        api.postMethod("changePassword", this.state.data)
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
        let { data } = this.state;
        return (
            <div>
                <div className="common-bg-img" style={bgImg}>
                    <div className="main">
                        <div className="row">
                            <div className="col-sm-9 col-md-7 col-lg-5 col-xl-4 auto-margin">
                                <div className="register-box">
                                    <h3 className="register-box-head">
                                        {t("change_password")}
                                    </h3>
                                    <form
                                        className="auth-form"
                                        onSubmit={this.handleSubmit}
                                    >
                                        <div className="form-group">
                                            <label htmlFor="old">
                                                {t("old_password")}
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="old"
                                                name="old_password"
                                                value={data.old_password}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="new">
                                                {t("new_password")}
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="new"
                                                name="password"
                                                value={data.password}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirm">
                                                {t("confirm_password")}
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="confirm"
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <button
                                            className="btn btn-danger auth-btn mt-4"
                                            disabled={this.state.buttonDisable}
                                        >
                                            {this.state.loadingContent != null
                                                ? this.state.loadingContent
                                                : this.props.t(
                                                      "change_password"
                                                  )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withToastManager(translate(ChangePasswordComponent));
