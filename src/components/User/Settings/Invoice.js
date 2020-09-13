import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

import { Link } from "react-router-dom";
import ContentLoader from "../../Static/contentLoader";
import Helper from "../../Helper/helper";
import api from "../../../Environment";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";

import { translate } from "react-multi-lang";
import configuration from "react-global-configuration";

class InvoiceComponent extends Helper {
    state = {
        loading: true,
        data: {},
        promoCode: null,
        loadingPromoCode: true,
        paymentMode: "card",
        loadingContent: null,
        buttonDisable: false,
        loadingContentCard: null,
        buttonDisableCard: false,
        freeSubscription: false
    };

    componentDidMount() {
        if (this.props.location.state) {
            this.setState({ loading: false });
        } else {
            window.location = "/subscription";
        }
    }

    handlePromoCode = event => {
        event.preventDefault();
        this.setState({
            loadingContent: "Loading... Please wait..",
            buttonDisable: true
        });
        let inputData = {
            coupon_code: this.state.data.coupon_code,

            subscription_id: this.props.location.state.subscription
                .subscription_id
        };
        api.postMethod("apply/coupon/subscription", inputData)
            .then(response => {
                if (response.data.success) {
                    ToastDemo(
                        this.props.toastManager,
                        "Promo code applied successfully!",
                        "success"
                    );
                    this.setState({
                        loadingContent: null,
                        buttonDisable: false,
                        loadingPromoCode: false,
                        promoCode: response.data.data
                    });
                    if (response.data.data.remaining_amount <= 0) {
                        this.setState({
                            freeSubscription: true
                        });
                    } else {
                        this.setState({
                            freeSubscription: false
                        });
                    }
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

    handlePromoCodeCancel = event => {
        event.preventDefault();
        this.setState({ promoCode: null, loadingPromoCode: true });
        ToastDemo(this.props.toastManager, "Promo code removed..", "error");
    };

    handleChangePayment = ({ currentTarget: input }) => {
        this.setState({ paymentMode: input.value });
    };

    handlePayment = event => {
        event.preventDefault();
        this.setState({
            loadingContentCard: "Loading... Please wait..",
            buttonDisableCard: true
        });
        let inputData;
        if (this.state.promoCode == null) {
            inputData = {
                subscription_id: this.props.location.state.subscription
                    .subscription_id,
                payment_mode: this.state.paymentMode
            };
        } else {
            inputData = {
                coupon_code: this.state.data.coupon_code,

                subscription_id: this.props.location.state.subscription
                    .subscription_id,
                payment_mode: this.state.paymentMode
            };
        }
        this.paymentApiCall(inputData);
    };

    paymentApiCall = inputData => {
        api.postMethod("v4/subscriptions_payment", inputData)
            .then(response => {
                if (response.data.success) {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.message,
                        "success"
                    );
                    this.setState({
                        loadingContentCard: null,
                        buttonDisableCard: false
                    });
                    this.setState({
                        loadingContentCard: null,
                        buttonDisableCard: false
                    });
                    this.props.history.push("/billing-details");
                } else {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.error_messages,
                        "error"
                    );
                    this.setState({
                        loadingContentCard: null,
                        buttonDisableCard: false
                    });
                }
            })
            .catch(error => {
                ToastDemo(this.props.toastManager, error, "error");
                this.setState({
                    loadingContentCard: null,
                    buttonDisableCard: false
                });
            });
    };

    render() {
        const { t } = this.props;

        if (this.state.loading) {
            return <ContentLoader />;
        } else {
            var invoiceImg = {
                backgroundImage: "url(../assets/img/invoice.gif)"
            };
            const { subscription } = this.props.location.state;
            const {
                data,
                loadingPromoCode,
                promoCode,
                paymentMode
            } = this.state;

            const onSuccess = payment => {
                console.log("Success");
                // Congratulation, it came here means everything's fine!

                let inputData;
                if (this.state.promoCode == null) {
                    inputData = {
                        subscription_id: this.props.location.state.subscription
                            .subscription_id,
                        payment_mode: this.state.paymentMode,
                        payment_id: payment.paymentID
                    };
                } else {
                    inputData = {
                        coupon_code: this.state.data.coupon_code,

                        subscription_id: this.props.location.state.subscription
                            .subscription_id,
                        payment_mode: this.state.paymentMode,
                        payment_id: payment.paymentID
                    };
                }
                this.paymentApiCall(inputData);

                // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
            };

            const onCancel = data => {
                console.log("ERROR");
                // User pressed "cancel" or close Paypal's popup!
                // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
            };

            const onError = err => {
                console.log("ERROR");
                // The main Paypal's script cannot be loaded or somethings block the loading of that script!
                // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
                // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
            };

            let env = "production"; // you can set here to 'production' for production
            let currency = "USD"; // or you can set this value from your props or state
            let total = loadingPromoCode
                ? subscription.amount
                : promoCode.remaining_amount; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout

            const client = {
                sandbox: configuration.get("configData.PAYPAL_ID"),
                production: configuration.get("configData.PAYPAL_ID")
            };

            return (
                <div>
                    <div className="main">
                        <div className="top-bottom-spacing">
                            <div className="row">
                                <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 auto-margin">
                                    <div
                                        style={invoiceImg}
                                        className="invoice-img"
                                    >
                                        <h1>invoice</h1>
                                    </div>
                                    <div className="payment-option">
                                        <h4 className="billing-head">
                                            <i className="far fa-file" />
                                            {subscription.title}
                                        </h4>
                                        <p className="grey-line" />
                                        <div className="">
                                            <p className="grey-clr pay-perview-text">
                                                {subscription.description}
                                            </p>
                                            <h5 className="">
                                                {t("no_of_accounts")} -{" "}
                                                {subscription.no_of_account}
                                            </h5>
                                        </div>
                                        {/* <!-- table1 --> */}
                                        <div className="table-responsive">
                                            <table className="table white-bg m-0 mt-3">
                                                <tbody>
                                                    <tr className="table-secondary">
                                                        <td>{t("amount")}</td>
                                                        <td>
                                                            {
                                                                subscription.currency
                                                            }
                                                            {
                                                                subscription.amount
                                                            }
                                                        </td>
                                                    </tr>
                                                    {subscription.amount > 0 ? (
                                                        <tr>
                                                            <td>
                                                                {t(
                                                                    "promo_code_amount"
                                                                )}
                                                            </td>
                                                            <td>
                                                                {
                                                                    subscription.currency
                                                                }
                                                                {loadingPromoCode
                                                                    ? "0"
                                                                    : promoCode.coupon_amount}
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        ""
                                                    )}
                                                    <tr className="table-secondary">
                                                        <td>{t("total")}</td>
                                                        <td>
                                                            {
                                                                subscription.currency
                                                            }
                                                            {loadingPromoCode
                                                                ? subscription.amount
                                                                : promoCode.remaining_amount}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <!-- table --> */}

                                        {/* <!-- coupon --> */}
                                        {subscription.amount > 0 ? (
                                            <div className="mt-4">
                                                <h5 className="capitalize">
                                                    {t("have_a_coupon")}
                                                </h5>
                                                <form
                                                    className="auth-form"
                                                    onSubmit={
                                                        this.handlePromoCode
                                                    }
                                                >
                                                    <div className="form-group mt-3">
                                                        <div className="input-group mb-3 mt-1">
                                                            <input
                                                                type="text"
                                                                className="form-control m-0 mb-0"
                                                                placeholder="promo code"
                                                                name="coupon_code"
                                                                value={
                                                                    data.coupon_code
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handleChange
                                                                }
                                                            />
                                                            <div className="input-group-append">
                                                                <button
                                                                    className="btn btn-danger"
                                                                    type="submit"
                                                                >
                                                                    {this.state
                                                                        .loadingContent !=
                                                                    null
                                                                        ? this
                                                                              .state
                                                                              .loadingContent
                                                                        : "send"}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                                {loadingPromoCode ? (
                                                    ""
                                                ) : (
                                                    <p className="capitalize">
                                                        {t(
                                                            "promo_code_applied"
                                                        )}{" "}
                                                        -{" "}
                                                        {promoCode.coupon_code}{" "}
                                                        for{" "}
                                                        {
                                                            promoCode.original_coupon_amount
                                                        }{" "}
                                                        -{" "}
                                                        <Link
                                                            to="#"
                                                            className="btn btn-outline-danger"
                                                            onClick={
                                                                this
                                                                    .handlePromoCodeCancel
                                                            }
                                                        >
                                                            {t("remove")}
                                                        </Link>
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {/* <!-- coupon --> */}

                                        {/* <!-- payment option --> */}

                                        <div className="mt-4">
                                            <form className="mt-3">
                                                {subscription.amount > 0 &&
                                                this.state.freeSubscription ==
                                                    false ? (
                                                    <div>
                                                        <h5 className="capitalize">
                                                            {t(
                                                                "choose_payment_option"
                                                            )}
                                                        </h5>
                                                        {configuration.get(
                                                            "configData.PAYPAL_ID"
                                                        ) ? (
                                                            <div className="form-check-inline">
                                                                <input
                                                                    type="radio"
                                                                    id="paypal"
                                                                    name="payment_mode"
                                                                    value="paypal"
                                                                    onChange={
                                                                        this
                                                                            .handleChangePayment
                                                                    }
                                                                />
                                                                <label htmlFor="paypal">
                                                                    {t(
                                                                        "paypal"
                                                                    )}
                                                                </label>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        <div className="form-check-inline">
                                                            <input
                                                                type="radio"
                                                                id="card"
                                                                name="payment_mode"
                                                                defaultChecked={
                                                                    true
                                                                }
                                                                value="card"
                                                                onChange={
                                                                    this
                                                                        .handleChangePayment
                                                                }
                                                            />
                                                            <label htmlFor="card">
                                                                {t(
                                                                    "card_payment"
                                                                )}
                                                            </label>
                                                        </div>

                                                        <Link
                                                            to="/add-card"
                                                            className="float-right btn-link"
                                                        >
                                                            {t("add")}{" "}
                                                            {t("card")}
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}

                                                <div className="text-right mb-3 mt-3">
                                                    {paymentMode == "card" ? (
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={
                                                                this
                                                                    .handlePayment
                                                            }
                                                            disabled={
                                                                this.state
                                                                    .buttonDisableCard
                                                            }
                                                        >
                                                            {this.state
                                                                .freeSubscription ==
                                                            false
                                                                ? this.state
                                                                      .loadingContentCard !=
                                                                  null
                                                                    ? this.state
                                                                          .loadingContentCard
                                                                    : subscription.amount >
                                                                      0
                                                                    ? "pay now using Card"
                                                                    : "Subscribe Now"
                                                                : "Subscribe Now"}
                                                        </button>
                                                    ) : (
                                                        <PaypalExpressBtn
                                                            env={env}
                                                            client={client}
                                                            currency={currency}
                                                            total={total}
                                                            onError={onError}
                                                            onSuccess={
                                                                onSuccess
                                                            }
                                                            onCancel={onCancel}
                                                        />
                                                    )}
                                                </div>
                                            </form>
                                        </div>

                                        {/* <!-- payment option --> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default withToastManager(translate(InvoiceComponent));
