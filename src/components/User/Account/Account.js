import React, { Component } from "react";

import { Link } from "react-router-dom";
import Helper from "../../Helper/helper";
import ContentLoader from "../../Static/contentLoader";

import {
    setTranslations,
    setDefaultLanguage,
    translate
} from "react-multi-lang";
import en from "../../translation/en.json";
import pt from "../../translation/pt.json";

class AccountComponent extends Helper {
    state = {
        data: null,
        loading: true
    };

    componentDidMount() {
        this.getUserDetails();
    }
    render() {
        const { t } = this.props;

        const { loading, data } = this.state;

        return (
            <div>
                <div className="main">
                    <div className="top-bottom-spacing">
                        {loading ? (
                            <ContentLoader />
                        ) : (
                            <div className="row">
                                <div className="col-sm-12 col-md-11 col-lg-10 col-xl-9 auto-margin">
                                    <div className="account-title-sec">
                                        <h1 className="">{t("account")}</h1>
                                    </div>

                                    <div className="account-sec">
                                        <div className="row">
                                            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                                <h4 className="account-sec-head">
                                                    {t("profile")}
                                                </h4>
                                            </div>
                                            <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                                <h5 className="email">
                                                    {data.email}
                                                </h5>
                                                <h5 className="password">
                                                    {t("password")}
                                                    <span className="asterisk">
                                                        <i className="fas fa-asterisk" />
                                                        <i className="fas fa-asterisk" />
                                                        <i className="fas fa-asterisk" />
                                                        <i className="fas fa-asterisk" />
                                                        <i className="fas fa-asterisk" />
                                                        <i className="fas fa-asterisk" />
                                                    </span>
                                                </h5>
                                            </div>
                                            <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                                <ul className="account-nav-link">
                                                    <li>
                                                        <Link to="/edit-account">
                                                            {t("edit")}{" "}
                                                            {t("profile")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/change-password">
                                                            {t(
                                                                "change_password"
                                                            )}
                                                        </Link>
                                                    </li>
                                                    {data.login_by ==
                                                    "manual" ? (
                                                        <li>
                                                            <Link to="/delete-account">
                                                                {t(
                                                                    "delete_account"
                                                                )}
                                                            </Link>
                                                        </li>
                                                    ) : (
                                                        ""
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="account-sec">
                                        <div className="row">
                                            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                                <h4 className="account-sec-head">
                                                    {t("plan_details")}
                                                </h4>
                                            </div>
                                            <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                                <h5 className="email capitalize">
                                                    {data.subscription_title}
                                                </h5>
                                            </div>
                                            <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                                <ul className="account-nav-link">
                                                    <li>
                                                        <Link to="/subscription">
                                                            {t("change_plan")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/billing-details">
                                                            {t(
                                                                "billing_details"
                                                            )}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="account-sec">
                                        <div className="row">
                                            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                                <h4 className="account-sec-head">
                                                    {t("manage_profile")}
                                                </h4>
                                            </div>
                                            <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                                <div>
                                                    <img
                                                        src={localStorage.getItem(
                                                            "active_profile_image"
                                                        )}
                                                        className="account-profile-img"
                                                        alt="profile_img"
                                                    />
                                                    <span className="capitalize size-16">
                                                        {data.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                                <ul className="account-nav-link">
                                                    <li>
                                                        <Link to="/manage-profiles">
                                                            {t(
                                                                "manage_profile"
                                                            )}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="account-sec">
                                        <div className="row">
                                            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                                <h4 className="account-sec-head">
                                                    {t("card_details")}
                                                </h4>
                                            </div>
                                            <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                                {data.card_last_four_number ==
                                                "" ? (
                                                    ""
                                                ) : (
                                                    <h5 className="email">
                                                        XXXX XXXX XXXX{" "}
                                                        {
                                                            data.card_last_four_number
                                                        }
                                                    </h5>
                                                )}
                                            </div>
                                            <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                                <ul className="account-nav-link">
                                                    <li>
                                                        <Link to="/add-card">
                                                            {t("add")}{" "}
                                                            {t("card")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/card-details">
                                                            {t("card_details")}
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="clearfix" />
                </div>
            </div>
        );
    }
}

export default translate(AccountComponent);
