import React, { Component } from "react";

import { Link } from "react-router-dom";

import ContentLoader from "../../Static/contentLoader";

import {
    setTranslations,
    setDefaultLanguage,
    translate
} from "react-multi-lang";
import en from "../../translation/en.json";
import pt from "../../translation/pt.json";

class PaymentOptions extends Component {
    state = {
        loadingFirst: true
    };
    componentDidMount() {
        if (this.props.location.state) {
            this.setState({ loadingFirst: false });
        } else {
            window.location = "/home";
        }
    }
    render() {
        const { t } = this.props;

        if (this.state.loadingFirst) {
            return <ContentLoader />;
        } else {
            const { videoDetailsFirst } = this.props.location.state;
            return (
                <div>
                    <div className="main">
                        <div className="top-bottom-spacing">
                            <div className="row">
                                <div className="col-sm-10 col-md-9 col-lg-7 col-xl-6 auto-margin">
                                    <div className="payment-option">
                                        <h4 className="billing-head">
                                            <i className="far fa-credit-card" />
                                            {t("select_option")}
                                        </h4>
                                        <div className="payment-note">
                                            <p className="mb-0">
                                                <span className="bold">
                                                   {t("note")}:
                                                </span>{" "}
                                                {t("payment_option_note")}
                                            </p>
                                        </div>

                                        <div className="payment-method">
                                            <div className="left">
                                                <h4>{t("plans")}</h4>
                                            </div>
                                            <div className="right">
                                                <h4>{t("subscription_plan")}</h4>
                                                <Link
                                                    to="/subscription"
                                                    className="btn-link"
                                                >
                                                    {t("click_to_subscribe")}
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="payment-method">
                                            <div className="left">
                                                <h4>
                                                    {videoDetailsFirst.currency}
                                                    {
                                                        videoDetailsFirst.ppv_amount
                                                    }
                                                </h4>
                                            </div>
                                            <div className="right">
                                                <h4>
                                                    {t("pay_per_video")} (
                                                    {videoDetailsFirst.ppv_page_type ==
                                                    1 ? (
                                                        <span>
                                                            {t(
                                                                "one_time_payment"
                                                            )}
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            {t(
                                                                "recurring_payment"
                                                            )}
                                                        </span>
                                                    )}
                                                    )
                                                </h4>
                                                <Link
                                                    to={{
                                                        pathname:
                                                            "/pay-per-view",
                                                        state: {
                                                            videoDetailsFirst: videoDetailsFirst
                                                        }
                                                    }}
                                                    className="btn-link"
                                                >
                                                    {t("click_to_pay")} 
                                                </Link>
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
export default translate(PaymentOptions);
