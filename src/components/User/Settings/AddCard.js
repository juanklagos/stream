import React, { Component } from "react";

import { Link } from "react-router-dom";
import Helper from "../../Helper/helper";
import { injectStripe, CardElement } from "react-stripe-elements";
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

class AddCardComponent extends Helper {
    state = {
        data: {
            card_number: "",
            month: "",
            year: "",
            cvv: ""
        },
        loadingContent: null,
        buttonDisable: false
    };

    addCard = ev => {
        ev.preventDefault();
        this.setState({
            loadingContent: "Loading... Please wait..",
            buttonDisable: true
        });
        if (this.props.stripe) {
            this.props.stripe
                .createToken({
                    type: "card",
                    name: localStorage.getItem("username")
                })
                .then(payload => {
                    if (payload.error) {
                        ToastDemo(
                            this.props.toastManager,
                            payload.error.message,
                            "error"
                        );
                        this.setState({
                            loadingContent: null,
                            buttonDisable: false
                        });
                    } else {
                        const inputData = {
                            card_token: payload.token.id
                        };
                        api.postMethod("payment_card_add", inputData)
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
                                    this.props.history.push("/card-details");
                                } else {
                                    ToastDemo(
                                        this.props.toastManager,
                                        response.data.error_message,
                                        "error"
                                    );
                                    this.setState({
                                        loadingContent: null,
                                        buttonDisable: false
                                    });
                                }
                            })
                            .catch(error => {
                                ToastDemo(
                                    this.props.toastManager,
                                    error,
                                    "error"
                                );
                                this.setState({
                                    loadingContent: null,
                                    buttonDisable: false
                                });
                            });
                    }
                });
        } else {
            ToastDemo(
                this.props.toastManager,
                "Stripe.js hasn't loaded yet.",
                "error"
            );
            this.setState({ loadingContent: null, buttonDisable: false });
        }
    };

    render() {
        const { t } = this.props;
        const { data } = this.state;
        var billingImg = {
            backgroundImage: "url(../assets/img/card-image.png)"
        };
        return (
            <div>
                <div className="main">
                    <div className="top-bottom-spacing">
                        <div className="row">
                            <div className="col-sm-10 col-md-11 col-lg-9 col-xl-8 auto-margin">
                                <div className="row m-0">
                                    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 p-0">
                                        <div
                                            className="billing-img relative"
                                            style={billingImg}
                                        >
                                            <div className="view-cards d-none d-md-block do-lg-block d-xl-block">
                                                <Link
                                                    to="/card-details"
                                                    className="capitalize"
                                                >
                                                    <i className="fas fa-chevron-right mr-1" />
                                                    {t("card_details")}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 p-0">
                                        <div className="billing-content-sec">
                                            <h4 className="billing-head">
                                                <i className="far fa-credit-card" />
                                                {t("add")} {t("card")}
                                            </h4>
                                            <p className="grey-line" />
                                            <form
                                                className="auth-form"
                                                onSubmit={this.addCard}
                                            >
                                                <CardElement />
                                                <div className="mt-4">
                                                    <button
                                                        className="btn btn-danger auth-btn btn-block"
                                                        disabled={
                                                            this.state
                                                                .buttonDisable
                                                        }
                                                    >
                                                        {this.state
                                                            .loadingContent !=
                                                        null
                                                            ? this.state
                                                                  .loadingContent
                                                            : this.props.t(
                                                                  "save"
                                                              )}
                                                    </button>
                                                </div>
                                            </form>
                                            {/* <form className="auth-form" onSubmit={this.addCard}>
                        <div className="form-group">
                          <label htmlFor="card-number">card number</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                            id="card-number"
                            placeholder="card number"
                            name="card_number"
                            value={data.card_number}
                          />
                        </div>
                        <div className="form-group">
                          <label>valid upto</label>
                          <div className="row">
                            <div className="col-6">
                              <input
                                type="text"
                                className="form-control"
                                onChange={this.handleChange}
                                placeholder="MM"
                                name="month"
                                value={data.month}
                              />
                            </div>
                            <div className="col-6">
                              <input
                                type="text"
                                className="form-control"
                                onChange={this.handleChange}
                                placeholder="YY"
                                name="year"
                                value={data.year}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="cvv">CVV number</label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                            id="cvv"
                            placeholder="CVV number"
                            name="cvv"
                            value={data.cvv}
                          />
                        </div>
                        <div className="mt-4">
                          <button className="btn btn-danger auth-btn btn-block">
                            save card
                          </button>
                        </div>
                      </form> */}
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

export default injectStripe(withToastManager(translate(AddCardComponent)));
