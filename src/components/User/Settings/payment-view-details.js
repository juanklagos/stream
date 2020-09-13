import React, { Component } from "react";

// import {Link} from 'react-router-dom';

import {
    setTranslations,
    setDefaultLanguage,
    translate
} from "react-multi-lang";
import en from "../../translation/en.json";
import pt from "../../translation/pt.json";

class PaymentViewDetails extends Component {
    state = {
        loadingFirst: true
    };
    componentDidMount() {
        if (this.props.location.state) {
            this.setState({ loadingFirst: false });
        } else {
            window.location = "/payment-history";
        }
    }

    render() {
        const { t } = this.props;

        const { loadingFirst } = this.state;
        if (loadingFirst) {
            return "Loading...";
        } else {
            const ppvDetails = this.props.location.state;
            var videoImg = {
                backgroundImage: "url(" + ppvDetails.default_image + ")"
            };
            return (
                <div>
                    <div className="main">
                        <div className="top-bottom-spacing">
                            <div className="row">
                                <div className="col-sm-10 col-md-10 col-lg-7 col-xl-6 auto-margin">
                                    <div className="payment-history p-4">
                                        <h4 className="mt-0 mb-3 capitalize">
                                            {t("payment_history")}
                                        </h4>
                                        <div
                                            style={videoImg}
                                            className="paid-video-img"
                                        >
                                            <div className="black-sec">
                                                {ppvDetails.currency}
                                                {ppvDetails.amount}
                                            </div>
                                        </div>

                                        <h4 className="billing-head mt-3">
                                            {ppvDetails.title}
                                        </h4>
                                        {/* <p className="grey-clr pay-perview-text mt-2">
                      An ordinary teen. An ancient relic pulled from the rubble.
                      And an underground civilization that needs a hero.An
                      ordinary teen. An ancient relic pulled from{" "}
                    </p> */}

                                        <div className="row">
                                            <div className="col-sm-6 col-md-6">
                                                <ul className="paid-video-details">
                                                    <li className="">
                                                        <p>
                                                            {t("paid_amount")}
                                                        </p>
                                                        <h4>
                                                            {
                                                                ppvDetails.currency
                                                            }
                                                            {
                                                                ppvDetails.total_amount
                                                            }
                                                        </h4>
                                                    </li>
                                                    <li className="">
                                                        <p>
                                                            {t("coupon_amount")}
                                                        </p>
                                                        <h4>
                                                            {
                                                                ppvDetails.currency
                                                            }
                                                            {
                                                                ppvDetails.coupon_amount
                                                            }
                                                        </h4>
                                                    </li>

                                                    <li className="">
                                                        <p>
                                                            {t("payment_mode")}
                                                        </p>
                                                        <h4>
                                                            {
                                                                ppvDetails.payment_mode
                                                            }
                                                        </h4>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <ul className="paid-video-details">
                                                    <li className="">
                                                        <p>
                                                            {t(
                                                                "subscription_type"
                                                            )}
                                                        </p>
                                                        <h4>
                                                            {
                                                                ppvDetails.type_of_subscription
                                                            }
                                                        </h4>
                                                    </li>
                                                    <li className="">
                                                        <p>{t("user_type")}</p>
                                                        <h4>
                                                            {
                                                                ppvDetails.type_of_user
                                                            }
                                                        </h4>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-sm-12 col-md-12">
                                                <ul className="paid-video-details">
                                                    <li className="">
                                                        <p>{t("payment_id")}</p>
                                                        <h4>
                                                            {
                                                                ppvDetails.payment_id
                                                            }
                                                        </h4>
                                                    </li>
                                                </ul>
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

export default translate(PaymentViewDetails);
