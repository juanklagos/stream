import React, { Component } from "react";
import { Link } from "react-router-dom";
import Helper from "../../Helper/helper";

import {
    setTranslations,
    setDefaultLanguage,
    translate
} from "react-multi-lang";
import en from "../../translation/en.json";
import pt from "../../translation/pt.json";

class VideoDetails extends Helper {
    render() {
        const { t } = this.props;

        const { videoDetailsFirst } = this.props;

        console.log("video details,", videoDetailsFirst);

        return (
            <div className="slider-topbottom-spacing slider-overlay">
                <h1 className="banner_video_title">
                    {videoDetailsFirst.title}
                </h1>
                <div className="row">
                    {videoDetailsFirst.cast_crews.length > 0 ? (
                        <div className="col-lg-2 col-xl-2">
                            <h4 className="detail-head">{t("cast_crews")}</h4>
                            <ul className="detail-list">
                                {videoDetailsFirst.cast_crews.map(cast => (
                                    <li>
                                        <Link
                                            to={{
                                                pathname: "/view-all",
                                                state: {
                                                    cast_crew_id:
                                                        cast.cast_crew_id,
                                                    title: cast.name,
                                                    videoType: "cast"
                                                }
                                            }}
                                        >
                                            {cast.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        ""
                    )}
                    {/* <div className="col-lg-2 col-xl-2">
                        <h4 className="detail-head">{t("genres")}</h4>
                        <ul className="detail-list">
                        <li>
                            <Link to="#">{t("action_comedies")}</Link>
                        </li>
                        <li>
                            <Link to="`#">{t("family_films")}</Link>
                        </li>
                        <li>
                            <Link to="#">{t("childeren_films")}</Link>
                        </li>
                        <li>
                            <Link to="#">{t("family_features")}</Link>
                        </li>
                        </ul>
                    </div> */}
                    <div className="col-lg-8 col-xl-8">
                        <h4 className="detail-head">{t("description")}</h4>
                        <p className="details-text">
                            {videoDetailsFirst.description}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default translate(VideoDetails);
