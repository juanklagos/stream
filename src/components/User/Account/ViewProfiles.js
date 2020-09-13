import React, { Component } from "react";

import { Link } from "react-router-dom";
import Helper from "../../Helper/helper";
import ContentLoader from "../../Static/contentLoader";
import ProgressiveImage from "react-progressive-image";

import {
    setTranslations,
    setDefaultLanguage,
    translate
} from "react-multi-lang";
import en from "../../translation/en.json";
import pt from "../../translation/pt.json";
import configuration from "react-global-configuration";

class ViewProfilesComponent extends Helper {
    state = {
        loading: true,
        activeProfile: null
    };
    componentDidMount() {
        // view all sub profile

        this.viewProfiles();
    }

    handleClick = (profile, event) => {
        event.preventDefault();

        localStorage.setItem("active_profile_id", profile.sub_profile_id);
        localStorage.setItem("active_profile_image", profile.picture);
        localStorage.setItem("active_profile_name", profile.name);
    };

    renderProfile = activeProfile => {
        // let renderActiveProfile;
        return (
            <div>
                {activeProfile.map(detail => (
                    <li
                        className="profile"
                        key={detail.id}
                        onClick={event => this.handleClick(detail, event)}
                    >
                        <Link to="/home">
                            <ProgressiveImage
                                src={detail.picture}
                                placeholder="../assets/img/placeholder.gif"
                            >
                                {(src, loading) => (
                                    <img
                                        src={src}
                                        style={{ opacity: loading ? 0.5 : 1 }}
                                        className="profile-img"
                                        alt="profile_img"
                                    />
                                )}
                            </ProgressiveImage>

                            <p className="profile-name">{detail.name}</p>
                        </Link>
                    </li>
                ))}
            </div>
        );
    };

    render() {
        const { t } = this.props;

        var bgImg = {
            backgroundImage: `url(${configuration.get(
                "configData.common_bg_image"
            )})`
        };
        const { loading, activeProfile } = this.state;

        return (
            <div>
                <div className="common-bg-img" style={bgImg}>
                    <div className="account-page-header">
                        <Link to="/home">
                            <img
                                src={configuration.get("configData.site_logo")}
                                className="logo-img"
                                alt="logo_img"
                            />
                        </Link>
                    </div>

                    <div className="main">
                        <div className="view-profile">
                            <div className="view-profile-content">
                                <div className="head-section">
                                    <h1 className="view-profiles-head">
                                        {t("who_is_watching")}
                                    </h1>
                                </div>
                                <ul className="choose-profile">
                                    {loading ? (
                                        <ContentLoader />
                                    ) : (
                                        this.renderProfile(activeProfile)
                                    )}
                                </ul>
                                <div>
                                    <Link
                                        to="/manage-profiles"
                                        className="grey-outline-btn"
                                    >
                                        {t("manage")} {t("profiles")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default translate(ViewProfilesComponent);
