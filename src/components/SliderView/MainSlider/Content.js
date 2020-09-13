import React, { Component } from "react";
import IconCross from "./../Icons/IconCross";
import "./Content.scss";
import Helper from "../../Helper/helper";
import VideoOverView from "../../User/Video/videoOverView";
import VideoEpisode from "../../User/Video/videoEpisode";
import VideoTrailer from "../../User/Video/videoTrailer";
import VideoMoreLikeThis from "../../User/Video/videoMoreLikeThis";
import VideoDetails from "../../User/Video/videoDetails";
import ContentLoader from "../../Static/contentLoader";
import classNames from "classnames";

const $ = window.$;
const DATE_OPTIONS = {
  year: "numeric",
  month: "short"
};

class Content extends Helper {
  state = {
    videoDetailsFirst: null,
    loadingFirst: true,
    videoDetailsSecond: null,
    loadingSecond: true,
    suggestion: null,
    loadingSuggestion: true,
    nav: "overview",
    inputData: {
      admin_video_id: this.props.movie.admin_video_id,
      skip: 0
    }
  };

  showSliderContent() {
    $(".slider-content").css("display", "block");
  }

  closeSliderContent() {
    $(".slider-content").css("display", "none");
  }

  componentDidMount() {
    // Single video API call.
    // let maindata = { ...this.state.maindata };
    // let errorHandle = 0;

    this.singleVideoFirst(this.state.inputData);
  }

  componentWillReceiveProps(props) {
    this.setState({
      nav: "overview",
      loadingFirst: true,
      loadingSecond: true
    });

    // this.forceUpdate();
    let inputData = {
      admin_video_id: props.movie.admin_video_id
    };

    this.singleVideoFirst(inputData);
  }

  navToggle = (link, event) => {
    event.preventDefault();
    this.setState({
      nav: link
    });
    if (link == "related") {
      if (
        localStorage.getItem("current_video_id") ==
        this.props.movie.admin_video_id
      ) {
        // Do nothing.
      } else {
        localStorage.setItem(
          "current_video_id",
          this.props.movie.admin_video_id
        );
        this.suggestion(this.state.inputData);
      }
    }
  };

  render() {
    const movie = { ...this.props.movie };

    const {
      loadingFirst,
      videoDetailsFirst,
      videoDetailsSecond,
      loadingSecond,
      loadingSuggestion,
      suggestion
    } = this.state;
    return (
      <div className="content">
        <div className="content__background">
          <div className="content__background__shadow" />
          <div
            className="content__background__image"
            style={{ backgroundImage: `url(${movie.default_image})` }}
          />
        </div>
        <div className="content__area">
          <div className="content__area__container">
            {/*
              <div className="content__title">{movie.title}</div>
              <div className="content__description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                et euismod ligula. Morbi mattis pretium eros, ut mollis leo tempus
                eget. Sed in dui ac ipsum feugiat ultricies. Phasellus vestibulum enim
                quis quam congue, non fringilla orci placerat. Praesent sollicitudin
              </div> 
            */}
          </div>
          <div className="slider-content-tabsec">
            <ul className="nav nav-pills" role="tablist">
              <li className="nav-item">
                <a
                  className={classNames("nav-link", {
                    active: this.state.nav == "overview"
                  })}
                  onClick={event => this.navToggle("overview", event)}
                  href="#"
                >
                  overview
                </a>
              </li>
              {loadingFirst ? (
                ""
              ) : videoDetailsFirst.is_series ? (
                <li className="nav-item">
                  <a
                    className={classNames("nav-link", {
                      active: this.state.nav == "episodes"
                    })}
                    onClick={event => this.navToggle("episodes", event)}
                    href="#"
                  >
                    episodes
                  </a>
                </li>
              ) : (
                ""
              )}

              {loadingSecond
                ? ""
                : videoDetailsSecond.trailer_section.length && (
                    <li className="nav-item">
                      <a
                        className={classNames("nav-link", {
                          active: this.state.nav == "trailers"
                        })}
                        onClick={event => this.navToggle("trailers", event)}
                        href="#"
                      >
                        Trailer & More
                      </a>
                    </li>
                  )}

              <li className="nav-item">
                <a
                  className={classNames("nav-link", {
                    active: this.state.nav == "related"
                  })}
                  onClick={event => this.navToggle("related", event)}
                  href="#"
                >
                  more like this
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={classNames("nav-link", {
                    active: this.state.nav == "details"
                  })}
                  onClick={event => this.navToggle("details", event)}
                  href="#"
                >
                  details
                </a>
              </li>
            </ul>
          </div>

          <div className="slider-content-tabcontent">
            <div className="tab-content">
              {loadingFirst ? (
                <ContentLoader />
              ) : (
                <div
                  className={classNames("tab-pane", {
                    active: this.state.nav == "overview",
                    fade: this.state.nav != "overview"
                  })}
                >
                  <VideoOverView videoDetailsFirst={videoDetailsFirst} />
                </div>
              )}

              {loadingSecond ? (
                ""
              ) : (
                <div
                  className={classNames("tab-pane", {
                    active: this.state.nav == "episodes",
                    fade: this.state.nav != "episodes"
                  })}
                >
                  <VideoEpisode
                    genreVideos={videoDetailsSecond.genre_videos}
                    genres={videoDetailsSecond.genres}
                  />
                </div>
              )}

              {loadingSecond ? (
                ""
              ) : (
                <div
                  className={classNames("tab-pane", {
                    active: this.state.nav == "trailers",
                    fade: this.state.nav != "trailers"
                  })}
                >
                  <VideoTrailer trailer={videoDetailsSecond.trailer_section}  />
                </div>
              )}

              <div
                className={classNames("tab-pane", {
                  active: this.state.nav == "related",
                  fade: this.state.nav != "related"
                })}
              >
                {loadingSuggestion ? (
                  ""
                ) : (
                  <VideoMoreLikeThis suggestion={suggestion} />
                )}
              </div>

              {loadingFirst ? (
                ""
              ) : (
                <div
                  className={classNames("tab-pane", {
                    active: this.state.nav == "details",
                    fade: this.state.nav != "details"
                  })}
                >
                  <VideoDetails videoDetailsFirst={videoDetailsFirst} />
                </div>
              )}
            </div>
          </div>

          <button className="content__close" onClick={this.props.onClose}>
            <IconCross />
          </button>
        </div>
      </div>
    );
  }
}

export default Content;
