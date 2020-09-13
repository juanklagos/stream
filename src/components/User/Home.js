import React, { Component } from "react";
import { Link } from "react-router-dom";

import api from "../../Environment";

import Slider from "../SliderView/MainSlider";
import HomePageBanner from "./homePageBanner";
import ContentLoader from "../Static/contentLoader";

import {
    // setTranslations,
    // setDefaultLanguage,
    translate
} from "react-multi-lang";
// import en from "../translation/en.json";
// import pt from "../translation/pt.json";

class Home extends Component {
    state = {
        maindata: null,
        errorHandle: 0,
        loading: true,
        banner: null
    };

    componentDidMount() {
        const inputData = {
            page_type: "HOME"
        };
        api.postMethod("home_first_section", inputData)
            .then(response => {
                if (response.data.success === true) {
                    let maindata = response.data.data;
                    let banner = response.data.banner;

                    this.setState({
                        loading: false,
                        maindata: maindata,
                        banner: banner
                    });
                } else {
                    let errorHandle = 1;
                    this.setState({ errorHandle });
                }
            })
            .catch(function(error) {});
    }

    renderVideoList = (maindata, index) => {
        return (
            <React.Fragment key={index}>
                <div className="main-slidersec">
                    <Link
                        to={{
                            pathname: "/view-all",
                            state: {
                                url_type: maindata.url_type,
                                url_type_id: maindata.url_type_id,
                                page_type: "HOME",
                                title: maindata.title
                            }
                        }}
                    >
                        <h3 className="">
                            {maindata.title}
                            <i className="fas fa-angle-right ml-2" />
                        </h3>
                    </Link>

                    <Slider>
                        {maindata.data.map(movie => (
                            <Slider.Item
                                movie={movie}
                                key={movie.admin_video_id}
                            >
                                item1
                            </Slider.Item>
                        ))}
                    </Slider>
                </div>
            </React.Fragment>
        );
    };

    render() {
        const { t } = this.props;

        const { loading, maindata, banner } = this.state;

        return (
            <div className="main-sec-content">
                {loading ? (
                    <ContentLoader />
                ) : (
                    <HomePageBanner banner={banner} />
                )}
                <div className="main p-40">
                    {/* {renderMyList} */}

                    {loading
                        ? ""
                        : maindata.map((mainDa, index) =>
                              mainDa.data.length === 0
                                  ? ""
                                  : loading
                                  ? "loading"
                                  : this.renderVideoList(mainDa, index)
                          )}

                    <div className="height-100" />
                </div>
            </div>
        );
    }
}

export default translate(Home);
