import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import api from "../../../Environment";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";
import Helper from "../../Helper/helper";
// import ContentLoader from "../../Static/contentLoader";

class VideoEpisode extends Helper {
    state = {
        data: {
            value: ""
        },
        redirect: false,
        redirectPPV: false,
        redirectPaymentOption: false,
        videoDetailsFirst: null,
        playButtonClicked: false,
        inputData: {},
        loading: true,
        genreVideos: null
    };

    componentDidMount() {
        this.setState({ playButtonClicked: false });
    }

    handleGenre = ({ currentTarget: input }) => {
        let inputData = {
            ...this.state.inputData,
            genre_id: input.value,
            skip: 0
        };
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data });

        api.postMethod("genre_videos", inputData)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        loading: false,
                        genreVideos: response.data.data
                    });
                } else {
                    // Do nothing
                }
            })
            .catch(function(error) {});
    };

    handlePlayVideo = async (event, admin_video_id) => {
        event.preventDefault();

        let inputData = {
            ...this.state.inputData,
            admin_video_id: admin_video_id
        };

        await this.onlySingleVideoFirst(inputData);

        if (this.state.videoDetailsFirst.success === false) {
            ToastDemo(
                this.props.toastManager,
                this.state.videoDetailsFirst.error_messages,
                "error"
            );
        } else {
            this.redirectStatus(this.state.videoDetailsFirst);
            this.setState({ playButtonClicked: true });
        }
    };

    render() {
        var episodeSlider = {
            dots: false,
            arrow: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false
        };
        if (this.state.playButtonClicked) {
            const returnToVideo = this.renderRedirectPage(
                this.state.videoDetailsFirst
            );

            if (returnToVideo != null) {
                return returnToVideo;
            }
        }
        let genreVideos;
        const { genres } = this.props;
        const { loading } = this.state;
        if (loading) {
            genreVideos = this.props.genreVideos;
        } else {
            genreVideos = this.state.genreVideos;
        }

        return (
            <div className="slider-topbottom-spacing pl-0 pr-0 slider-overlay">
                <div className="pr-4per pl-4per">
                    <h1 className="banner_video_title">Episode</h1>
                    <form>
                        <select
                            className="form-control mw-200 mb-3"
                            onChange={this.handleGenre}
                            name="genre_id"
                            value={this.state.data.genre_id}
                        >
                            {genres.map(genre => (
                                <option
                                    key={genre.genre_id}
                                    value={genre.genre_id}
                                >
                                    {genre.genre_name}
                                </option>
                            ))}
                        </select>
                    </form>
                </div>
                <div>
                    {genreVideos.length == 0 ? (
                        "Coming Soon"
                    ) : (
                        <Slider
                            {...episodeSlider}
                            className="episode-slider slider"
                        >
                            {genreVideos.map(video => (
                                <div key={video.admin_video_id}>
                                    <div className="relative">
                                        <img
                                            className="trailers-img placeholder"
                                            alt="episode-img"
                                            src={video.default_image}
                                            data-src="assets/img/thumb1.jpg"
                                            srcSet={
                                                video.default_image +
                                                " 1x," +
                                                video.default_image +
                                                " 1.5x," +
                                                video.default_image +
                                                " 2x"
                                            }
                                            data-srcset="assets/img/thumb1.jpg 1x,
                      assets/img/thumb1.jpg 1.5x,
                      assets/img/thumb1.jpg 2x"
                                        />
                                        <div className="trailers-img-overlay">
                                            <Link
                                                to="#"
                                                onClick={event =>
                                                    this.handlePlayVideo(
                                                        event,
                                                        video.admin_video_id
                                                    )
                                                }
                                            >
                                                <div className="thumbslider-outline">
                                                    <i className="fas fa-play" />
                                                </div>
                                            </Link>
                                        </div>
                                        {/* <div className="episode-number">1</div> */}
                                    </div>
                                    <div className="episode-content">
                                        <div className="row">
                                            <div className="col-xl-8 col-lg-8">
                                                <h4 className="episode-content-head">
                                                    {video.title}
                                                </h4>
                                            </div>
                                            <div className="col-xl-4 col-lg-4">
                                                <h4 className="episode-content-head text-right">
                                                    {video.duration}
                                                </h4>
                                            </div>
                                        </div>
                                        <h4 className="episode-content-desc">
                                            {video.description}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>
            </div>
        );
    }
}

export default withToastManager(VideoEpisode);
