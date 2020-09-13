import React, { Component } from "react";
import api from "../../../Environment";
import { Link } from "react-router-dom";
import {
    setTranslations,
    setDefaultLanguage,
    setLanguage,
    translate,
    getLanguage
} from "react-multi-lang";
import en from "../../translation/en.json";
import pt from "../../translation/pt.json";
import configuration from "react-global-configuration";

const $ = window.$;

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: this.props.data,
            footer_pages1: [],
            footer_pages2: [],
            loading: true,
            footerList: null
        };
    }

    componentDidMount() {
        api.getMethod("pages/list")
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        loading: false,
                        footerList: response.data.data
                    });
                } else {
                }
            })
            .catch(function(error) {});

        var footerHeight = $("#footer").outerHeight();
        var deviceheight = $(window).outerHeight();
        var contentheight = deviceheight - footerHeight - 66;
        $(".main-sec-content").css("min-height", contentheight);

        // $(".bottom-height").height(footerHeight);
        // Call api function

        if (configuration.get("configData.footer_pages1")) {
            this.setState({
                footer_pages1: configuration.get("configData.footer_pages1")
            });
        }
        if (configuration.get("configData.footer_pages2")) {
            this.setState({
                footer_pages2: configuration.get("configData.footer_pages2")
            });
        }
    }

    handleChangeLang = ({ currentTarget: input }) => {
        console.log(input.value);
        setLanguage(input.value);
        localStorage.setItem("lang", input.value);
        // window.location.reload();
    };

    render() {
        const { t } = this.props;
        const { loading, footerList } = this.state;
        return (
            <div className="main-footer-sec-content">
                <div className="bottom-height"></div>
                <div className="footer" id="footer">
                    <div className="site-footer">
                        <p className="footer-top">
                            <Link to="#">{t("questions_contact_us")}</Link>
                        </p>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                <ul className="footer-link">
                                    {loading
                                        ? t("loading")
                                        : footerList.length > 0
                                        ? footerList.map(
                                              (static_page, index) => (
                                                  <li
                                                      className="footer-link-list"
                                                      key={`page1${index}`}
                                                  >
                                                      <Link
                                                          to={{
                                                              pathname: `/page/${static_page.page_type}`,
                                                              state: {
                                                                  page_id:
                                                                      static_page.page_id
                                                              }
                                                          }}
                                                      >
                                                          {static_page.title}
                                                      </Link>
                                                  </li>
                                              )
                                          )
                                        : ""}
                                </ul>
                            </div>
                            {/* <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                                <ul className="footer-link">
                                {this.state.footer_pages2.length > 0
                                    ? this.state.footer_pages2.map((static_page, index) => (
                                        <li className="footer-link-list" key={`page2${index}`}>
                                        <Link to={`/page/${static_page.unique_id}`}>
                                            {static_page.heading}
                                        </Link>
                                        </li>
                                    ))
                                    : ""}
                                </ul>
                            </div> */}
                            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <div className="row">
                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                        <p className="footer-head">
                                            {t("get_app")}
                                        </p>
                                        <a
                                            href={configuration.get(
                                                "configData.appstore"
                                            )}
                                            target="_blank"
                                        >
                                            <img
                                                src="/assets/img/app-store.png"
                                                className="app-img"
                                                alt="Playstore"
                                            />
                                        </a>
                                        <a
                                            href={configuration.get(
                                                "configData.playstore"
                                            )}
                                            target="_blank"
                                        >
                                            <img
                                                src="/assets/img/play-store.png"
                                                className="app-img"
                                                alt="Playstore"
                                            />
                                        </a>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                        <p className="footer-head">
                                            {t("find_us")}
                                        </p>
                                        <div className="social-share">
                                            <span className="fa-stack fa-lg">
                                                <a
                                                    href={configuration.get(
                                                        "configData.facebook_link"
                                                    )}
                                                    target="_blank"
                                                >
                                                    <i className="fas fa-circle fa-stack-2x facebook"></i>
                                                    <i className="fab fa-facebook-f fa-stack-1x fa-inverse white-clr"></i>
                                                </a>
                                            </span>
                                            <span className="fa-stack fa-lg">
                                                <a
                                                    href={configuration.get(
                                                        "configData.twitter_link"
                                                    )}
                                                    target="_blank"
                                                >
                                                    <i className="fas fa-circle fa-stack-2x twitter"></i>
                                                    <i className="fab fa-twitter fa-stack-1x fa-inverse white-clr"></i>
                                                </a>
                                            </span>
                                            <span className="fa-stack fa-lg">
                                                <a
                                                    href={configuration.get(
                                                        "configData.linkedin_link"
                                                    )}
                                                    target="_blank"
                                                >
                                                    <i className="fas fa-circle fa-stack-2x linkedin"></i>
                                                    <i className="fab fa-linkedin-in fa-stack-1x fa-inverse white-clr"></i>
                                                </a>
                                            </span>

                                            <span className="fa-stack fa-lg">
                                                <a
                                                    href={configuration.get(
                                                        "configData.pinterest_link"
                                                    )}
                                                    target="_blank"
                                                >
                                                    <i className="fas fa-circle fa-stack-2x pinterest"></i>
                                                    <i className="fab fa-pinterest-p fa-stack-1x fa-inverse white-clr"></i>
                                                </a>
                                            </span>
                                        </div>
                                        <hr></hr>
                                        <select
                                            className="form-control mw-200 mb-3"
                                            onChange={this.handleChangeLang}
                                            name="lang"
                                        >
                                            <option
                                                value="en"
                                                selected={
                                                    localStorage.getItem(
                                                        "lang"
                                                    ) == "en"
                                                        ? true
                                                        : false
                                                }
                                            >
                                                English
                                            </option>
                                            <option
                                                value="pt"
                                                selected={
                                                    localStorage.getItem(
                                                        "lang"
                                                    ) == "pt"
                                                        ? true
                                                        : false
                                                }
                                            >
                                                Spanish
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="footer-bottom">
                            {configuration.get("configData.site_name")}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default translate(Footer);
