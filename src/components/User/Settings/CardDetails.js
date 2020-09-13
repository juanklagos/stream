import React, { Component } from "react";

import { Link } from "react-router-dom";

import api from "../../../Environment";
import ContentLoader from "../../Static/contentLoader";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";

import {
    // setTranslations,
    // setDefaultLanguage,
    translate
} from "react-multi-lang";
// import en from "../../translation/en.json";
// import pt from "../../translation/pt.json";

class CardDetailsComponent extends Component {
    state = {
        cardDetails: null,
        loading: true
    };
    componentDidMount() {
        this.getCardDetails();
    }

    getCardDetails = () => {
        api.postMethod("card_details")
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        loading: false,
                        cardDetails: response.data.data
                    });
                } else {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.error_message,
                        "error"
                    );
                }
            })
            .catch(error => {
                ToastDemo(this.props.toastManager, error, "error");
            });
    };

    setDefaultCard = (event, card) => {
        event.preventDefault();
        api.postMethod("default_card", { card_id: card.card_id })
            .then(response => {
                if (response.data.success) {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.message,
                        "success"
                    );
                    this.getCardDetails();
                } else {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.error_message,
                        "error"
                    );
                }
            })
            .catch(error => {
                ToastDemo(this.props.toastManager, error, "error");
            });
    };

    deleteCard = (event, card) => {
        event.preventDefault();
        api.postMethod("delete_card", { card_id: card.card_id })
            .then(response => {
                if (response.data.success) {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.message,
                        "success"
                    );
                    this.getCardDetails();
                } else {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.error_message,
                        "error"
                    );
                }
            })
            .catch(error => {
                ToastDemo(this.props.toastManager, error, "error");
            });
    };

    render() {
        const { t } = this.props;

        var billingImg = {
            backgroundImage: "url(../assets/img/card-image.png)"
        };
        const { loading, cardDetails } = this.state;
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
                                                    to="/add-card"
                                                    className="capitalize"
                                                >
                                                    <i className="fas fa-chevron-right mr-1" />
                                                    {t("add")} {t("card")}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 p-0">
                                        <div className="billing-content-sec">
                                            <h4 className="billing-head">
                                                <i className="far fa-credit-card" />
                                                {t("card_details")}
                                            </h4>
                                            <p className="grey-line" />
                                            {loading ? (
                                                <ContentLoader />
                                            ) : (
                                                <div>
                                                    {cardDetails.map(card => (
                                                        <div key={card.card_id}>
                                                            <div className="display-inline">
                                                                <div className="card-left">
                                                                    <img
                                                                        src="../assets/img/credit-card.png"
                                                                        alt="card_img"
                                                                    />
                                                                </div>
                                                                <div className="card-deatils">
                                                                    {card.is_default ? (
                                                                        ""
                                                                    ) : (
                                                                        <Link
                                                                            to="#"
                                                                            onClick={event =>
                                                                                this.deleteCard(
                                                                                    event,
                                                                                    card
                                                                                )
                                                                            }
                                                                            className="float-right"
                                                                        >
                                                                            <i className="far fa-trash-alt" />
                                                                        </Link>
                                                                    )}
                                                                    <h5>
                                                                        XXXX
                                                                        XXXX
                                                                        XXXX{" "}
                                                                        {
                                                                            card.last_four
                                                                        }
                                                                    </h5>
                                                                    <p className="m-0">
                                                                        {card.is_default ? (
                                                                            <div className="green-clr">
                                                                                {t(
                                                                                    "card_default"
                                                                                )}
                                                                            </div>
                                                                        ) : (
                                                                            <Link
                                                                                to="#"
                                                                                onClick={event =>
                                                                                    this.setDefaultCard(
                                                                                        event,
                                                                                        card
                                                                                    )
                                                                                }
                                                                                className="red-clr"
                                                                            >
                                                                                {t(
                                                                                    "set_card_default"
                                                                                )}
                                                                            </Link>
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <p className="grey-line" />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div>
                                                <div className="display-inline">
                                                    <div className="card-left">
                                                        <img
                                                            src="../assets/img/card.png"
                                                            alt="card_img"
                                                        />
                                                    </div>
                                                    <div className="card-deatils">
                                                        <div className="add-card">
                                                            <Link
                                                                to={"/add-card"}
                                                                className="btn-link"
                                                            >
                                                                {t("add")}{" "}
                                                                {t("card")}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

export default withToastManager(translate(CardDetailsComponent));
