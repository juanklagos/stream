import React from "react";
import { Link } from "react-router-dom";
import ContentLoader from "../../Static/contentLoader";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";
import api from "../../../Environment";
import Helper from "../../Helper/helper";
import configuration from "react-global-configuration";
import { translate, t } from "react-multi-lang";

class PayPerView extends Helper {
    state = {
        loadingFirst: true,
        data: {},
        promoCode: null,
        loadingPromoCode: true,
        paymentMode: "card",
        loadingContent: null,
        buttonDisable: false,
        loadingContentCard: null,
        buttonDisableCard: false
    };
    componentDidMount() {
        if (this.props.location.state) {
            this.setState({ loadingFirst: false });
        } else {
            window.location = "/home";
        }
    }

    handlePromoCode = event => {
        event.preventDefault();
        this.setState({
            loadingContent: this.props.t("button_loading"),
            buttonDisable: true
        });
        let inputData = {
            coupon_code: this.state.data.coupon_code,
            admin_video_id: this.props.location.state.videoDetailsFirst
                .admin_video_id
        };
        api.postMethod("apply/coupon/ppv", inputData)
            .then(response => {
                if (response.data.success) {
                    ToastDemo(
                        this.props.toastManager,
                        this.props.t("promo_code_applied_success"),
                        "success"
                    );
                    this.setState({
                        loadingContent: null,
                        buttonDisable: false,
                        loadingPromoCode: false,
                        promoCode: response.data.data
                    });
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
        ToastDemo(
            this.props.toastManager,
            this.props.t("promo_code_removed"),
            "error"
        );
    };

    handleChangePayment = ({ currentTarget: input }) => {
        this.setState({ paymentMode: input.value });
    };
    handlePayment = event => {
        event.preventDefault();
        this.setState({
            loadingContentCard: this.props.t("button_loading"),
            buttonDisableCard: true
        });
        let inputData;
        if (this.state.promoCode == null) {
            inputData = {
                admin_video_id: this.props.location.state.videoDetailsFirst
                    .admin_video_id,
                payment_mode: this.state.paymentMode
            };
        } else {
            inputData = {
                coupon_code: this.state.data.coupon_code,

                admin_video_id: this.props.location.state.videoDetailsFirst
                    .admin_video_id,
                payment_mode: this.state.paymentMode
            };
        }
        this.paymentApiCall(inputData);
    };

    paymentApiCall = inputData => {
        api.postMethod("v4/ppv_payment", inputData)
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
                    this.props.history.push(
                        `/video/${this.props.location.state.videoDetailsFirst.admin_video_id}`,
                        this.props.location.state
                    );
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
        var billingImg = {
            backgroundImage: "url(assets/img/billing.jpg)"
        };
        if (this.state.loadingFirst) {
            return <ContentLoader />;
        } else {
            const { videoDetailsFirst } = this.props.location.state;
            const {
                data,
                loadingPromoCode,
                promoCode,
                paymentMode
            } = this.state;

            const onSuccess = payment => {
                // Congratulation, it came here means everything's fine!

                let inputData;
                if (this.state.promoCode == null) {
                    inputData = {
                        admin_video_id: this.props.location.state
                            .videoDetailsFirst.admin_video_id,
                        payment_mode: this.state.paymentMode,
                        payment_id: payment.paymentID
                    };
                } else {
                    inputData = {
                        coupon_code: this.state.data.coupon_code,

                        admin_video_id: this.props.location.state
                            .videoDetailsFirst.admin_video_id,
                        payment_mode: this.state.paymentMode,
                        payment_id: payment.paymentID
                    };
                }
                this.paymentApiCall(inputData);

                // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
            };

            const onCancel = data => {
                // User pressed "cancel" or close Paypal's popup!
                // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
            };

            const onError = err => {
                console.log("PayPal Error", err);
                // The main Paypal's script cannot be loaded or somethings block the loading of that script!
                // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
                // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
            };

            let env = configuration.get("configData.PAYPAL_MODE"); // you can set here to 'production' for production
            let currency = "USD"; // or you can set this value from your props or state
            let total = loadingPromoCode
                ? videoDetailsFirst.ppv_amount
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
                                <div className="col-sm-10 col-md-11 col-lg-9 col-xl-8 auto-margin">
                                    <div className="row m-0">
                                        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 p-0">
                                            <div
                                                className="billing-img"
                                                style={billingImg}
                                            >
                                                <div className="billing-img-overlay">
                                                    {/* <div className="display-inline">
                                                        <div className="icon-left">
                                                        <h5 className="billing-head">
                                                            <i className="fas fa-th-large" />
                                                        </h5>
                                                        </div>
                                                        <div className="content-right">
                                                        <h5 className="billing-head mb-3">category</h5>
                                                        <p className="m-0">TV series</p>
                                                        </div>
                                                    </div>
                                                    <div className="clearfix" />
                                                    <p className="grey-line" />
                                                    <div className="display-inline">
                                                        <div className="icon-left">
                                                        <h5 className="billing-head">
                                                            <i className="fas fa-th-large" />
                                                        </h5>
                                                        </div>
                                                        <div className="content-right">
                                                        <h5 className="billing-head mb-3">
                                                            sub category
                                                        </h5>
                                                        <p className="m-0">english series</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="clearfix" />
                                                    <p className="grey-line" /> */}

                                                    <div className="display-inline">
                                                        <div className="icon-left">
                                                            <h5 className="billing-head">
                                                                <i className="far fa-file-alt" />
                                                            </h5>
                                                        </div>
                                                        <div className="content-right">
                                                            <h5 className="billing-head mb-3">
                                                                {t("title")}
                                                            </h5>
                                                            <p className="m-0">
                                                                {
                                                                    videoDetailsFirst.title
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="clearfix" />
                                                    <p className="grey-line" />
                                                    <div className="display-inline">
                                                        <div className="icon-left">
                                                            <h5 className="billing-head">
                                                                <i className="fas fa-user" />
                                                            </h5>
                                                        </div>
                                                        <div className="content-right">
                                                            <h5 className="billing-head mb-3">
                                                                {t("user_type")}
                                                            </h5>
                                                            <p className="m-0">
                                                                {videoDetailsFirst.type_of_user ==
                                                                1
                                                                    ? "Normal User"
                                                                    : videoDetailsFirst.type_of_user ==
                                                                      2
                                                                    ? "Paid User"
                                                                    : "Both User"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="clearfix" />
                                                    <p className="grey-line" />
                                                    <div className="display-inline">
                                                        <div className="icon-left">
                                                            <h5 className="billing-head">
                                                                <i className="far fa-hand-point-up" />
                                                            </h5>
                                                        </div>
                                                        <div className="content-right">
                                                            <h5 className="billing-head mb-3">
                                                                {t(
                                                                    "subscription_type"
                                                                )}
                                                            </h5>
                                                            <p className="m-0">
                                                                {videoDetailsFirst.type_of_subscription ==
                                                                1
                                                                    ? "one type payment"
                                                                    : "recurring Payment"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="clearfix" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 p-0">
                                            <div className="billing-content-sec">
                                                <h4 className="billing-head">
                                                    <i className="far fa-credit-card" />
                                                    {t("pay_per_view")}
                                                </h4>
                                                <p className="grey-line" />
                                                <div className="">
                                                    <h5 className="">
                                                        {t("amount")}
                                                    </h5>
                                                    <p className="grey-clr pay-perview-text">
                                                        {t(
                                                            "pay_for_video_text"
                                                        )}
                                                    </p>
                                                </div>
                                                {/* <!-- table1 --> */}
                                                <div className="table-responsive">
                                                    <table className="table white-bg m-0">
                                                        <tbody>
                                                            <tr className="table-secondary">
                                                                <td>
                                                                    {t(
                                                                        "amount"
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        videoDetailsFirst.currency
                                                                    }
                                                                    {
                                                                        videoDetailsFirst.ppv_amount
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    {t(
                                                                        "promo_code_amount"
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        videoDetailsFirst.currency
                                                                    }
                                                                    {loadingPromoCode
                                                                        ? "0"
                                                                        : promoCode.coupon_amount}
                                                                </td>
                                                            </tr>
                                                            <tr className="table-secondary">
                                                                <td>
                                                                    {t("total")}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        videoDetailsFirst.currency
                                                                    }
                                                                    {loadingPromoCode
                                                                        ? videoDetailsFirst.ppv_amount
                                                                        : promoCode.remaining_amount}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* <!-- table --> */}

                                                {/* <!-- coupon --> */}
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
                                                                        {this
                                                                            .state
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
                                                            Promo code applied -{" "}
                                                            {
                                                                promoCode.coupon_code
                                                            }{" "}
                                                            for{" "}
                                                            {
                                                                promoCode.original_coupon_amount
                                                            }{" "}
                                                            -{" "}
                                                            <Link
                                                                to="#"
                                                                className="btn-danger"
                                                                onClick={
                                                                    this
                                                                        .handlePromoCodeCancel
                                                                }
                                                            >
                                                                {t("cancel")}
                                                            </Link>
                                                        </p>
                                                    )}
                                                </div>
                                                {/* <!-- coupon --> */}

                                                {/* <!-- payment option --> */}
                                                <div className="mt-4">
                                                    <h5 className="capitalize">
                                                        {t(
                                                            "choose_payment_option"
                                                        )}
                                                    </h5>
                                                    <form
                                                        className="mt-3"
                                                        action=""
                                                    >
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
                                                                    paypal
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
                                                                card payment
                                                            </label>
                                                        </div>
                                                        <Link
                                                            to="/add-card"
                                                            className="float-right btn-link"
                                                        >
                                                            add card
                                                        </Link>
                                                        <div className="text-right mb-3 mt-3">
                                                            {paymentMode ==
                                                            "card" ? (
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={
                                                                        this
                                                                            .handlePayment
                                                                    }
                                                                    disabled={
                                                                        this
                                                                            .state
                                                                            .buttonDisableCard
                                                                    }
                                                                >
                                                                    {this.state
                                                                        .loadingContentCard !=
                                                                    null
                                                                        ? this
                                                                              .state
                                                                              .loadingContentCard
                                                                        : "pay now using Card"}
                                                                </button>
                                                            ) : (
                                                                <PaypalExpressBtn
                                                                    env={env}
                                                                    client={
                                                                        client
                                                                    }
                                                                    currency={
                                                                        currency
                                                                    }
                                                                    total={
                                                                        total
                                                                    }
                                                                    onError={
                                                                        onError
                                                                    }
                                                                    onSuccess={
                                                                        onSuccess
                                                                    }
                                                                    onCancel={
                                                                        onCancel
                                                                    }
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
                    </div>
                </div>
            );
        }
    }
}

export default withToastManager(translate(PayPerView));
