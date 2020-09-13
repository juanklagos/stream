import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import {
  setTranslations,
  setDefaultLanguage,
  translate
} from "react-multi-lang";
import en from "../../translation/en.json";
import pt from "../../translation/pt.json";

class VideoTrailer extends Component {
  state = {};

  render() {
    const { t } = this.props;
    const trailerDetails = this.props.trailer;

    let slidesToShowCount = 1;

    if (trailerDetails.length > 3) {
      slidesToShowCount = 4;
    } else {
      slidesToShowCount = trailerDetails.length;
    }
    var trailerSlider = {
      dots: false,
      arrow: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false
    };

    return (
      <div className="slider-topbottom-spacing pl-0 pr-0 slider-overlay">
        <div className="pr-4per pl-4per">
          <h1 className="banner_video_title">{t("trailer_and_more")}</h1>
        </div>
        <div>
          <Slider {...trailerSlider} className="more-like-slider slider">
            {trailerDetails.map(trailer => (
              <div key={Math.random()}>
                <div className="relative">
                  <img
                    className="trailers-img placeholder"
                    alt="episode-img"
                    src={trailer.default_image}
                    data-src="assets/img/thumb8.jpg"
                    srcSet={
                      trailer.default_image +
                      " 1x," +
                      trailer.default_image +
                      " 1.5x," +
                      trailer.default_image +
                      " 2x"
                    }
                  />
                  <div className="trailers-img-overlay">
                    <Link
                      to={{
                        pathname: `/video/${trailer.name}`,
                        state: {
                          videoDetailsFirst: trailer,
                          videoFrom: "trailer"
                        }
                      }}
                    >
                      <div className="thumbslider-outline">
                        <i className="fas fa-play" />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="episode-content">
                  <h4 className="episode-content-head">{trailer.name}</h4>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

export default translate(VideoTrailer);
