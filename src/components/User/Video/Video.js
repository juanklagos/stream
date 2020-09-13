import React, { Component } from "react";

import { Link } from "react-router-dom";

import ReactPlayer from "react-player";

import Helper from "../../Helper/helper";

import ContentLoader from "../../Static/contentLoader";

import api from "../../../Environment";

import io from "socket.io-client";

import { apiConstants } from "../../Services/Constants";

const socket = io(apiConstants.socketUrl);

let userId = localStorage.getItem("userId");

let accessToken = localStorage.getItem("accessToken");

class VideoComponent extends Helper {

  state = {
    loadingFirst: true,
    videoDetailsFirst: null,
    onPlayStarted: false,
    videoList: {},
    videoData: null,
    videoId: 0,
    socket: false,
    query:'',
    onSeekPlay:true,
    socketConnection:true,
    videoDuration: 0
  };

  componentDidMount() {

    if (this.props.location.state) {
      this.setState({ loadingFirst: false });
    } else {
      window.location = "/home";
    }
  }


  timer = async () => {
    if (this.state.onPlayStarted) {
     await this.socketConnectionfun(userId,accessToken);
    }
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  onCompleteVideo = () => {
    this.addHistory(this.props.location.state.videoDetailsFirst.admin_video_id);
    this.setState({ onPlayStarted: false,socketConnection: false });

    socket.emit('disconnect'); 
  };

  onVideoPlay = async () => {
    let intervalId = setInterval(this.timer, 3000);

    this.setState({intervalId: intervalId});

    this.setState({ onPlayStarted: true,socketConnection: true });

    let inputData = {
      admin_video_id: this.props.location.state.videoDetailsFirst.admin_video_id
    };
    await this.onlySingleVideoFirst(inputData);

    this.redirectStatus(this.state.videoDetailsFirst);

    const seekTime = this.state.videoDetailsFirst.seek_time_in_seconds ? this.state.videoDetailsFirst.seek_time_in_seconds : 0;
    
    console.log(seekTime);

    if (this.state.onSeekPlay) {

      this.player.seekTo(parseFloat(seekTime));

    }

    this.setState({ onSeekPlay: false });

  };
  
  addHistory = admin_video_id => {
    api
      .postMethod("addHistory", { admin_video_id: admin_video_id })
      .then(response => {
        if (response.data.success === true) {
        } else {
        }
      })
      .catch(function(error) {});
  };

  socketConnectionfun = (userId,accessToken) => {
    console.log('Inside')
    let videoId = this.props.location.state.videoDetailsFirst.admin_video_id;

    socket.on('connect', function(){
      let query = `user_id=` +
        userId +
        `&video_id=` +
        videoId
    });

    socket.on('connected', function () {
      console.log('Connected');
    });

    socket.on('disconnect', function () {
      console.log('disconnect');
    });

    console.log(this.state.videoDuration);

    let videoData = [
      {
        sub_profile_id: '',
        admin_video_id: videoId,
        id: userId,
        token: accessToken,
        duration:this.state.videoDuration
      }
    ];

    socket.emit("save_continue_watching_video", videoData[0]);
  };

  onPauseVideo = async () => {
    console.log('onPause')
    socket.emit('disconnect'); 
    clearInterval(this.state.intervalId);
  };
  
  onVideoTimeUpdate = (duration) => {
    let video_duration = duration.target.currentTime;

    let sec = parseInt(video_duration % 60);
    let min = parseInt((video_duration / 60) % 60);
    let hours = parseInt(video_duration / 3600);

    if(hours > 1) {
      this.setState({videoDuration: hours + ':' + min + ':' + sec}); 
    } else {
      this.setState({videoDuration: min + ':' + sec});
    }
    
  }

  ref = (player) => {
    this.player = player
  }
  
  render() {
    
    const pageType = "videoPage";
    if (this.state.onPlayStarted) {
      const returnToVideo = this.renderRedirectPage(
        this.state.videoDetailsFirst,
        pageType
      );

      if (returnToVideo != null) {
        return returnToVideo;
      }
    }
    const { loadingFirst } = this.state;
    let mainVideo;
    let videoTitle;

    if (loadingFirst) {
      return <ContentLoader />;
    } else {
      // Check the whether we need to play the trailer or main video
      
      if (this.props.location.state.videoFrom != undefined) {
        if (this.props.location.state.videoFrom == "trailer") {
          mainVideo = this.props.location.state.videoDetailsFirst.resolutions
            .original;
        } else {
          mainVideo = this.props.location.state.videoDetailsFirst.resolutions
            .original;
        }

        videoTitle = this.props.location.state.videoDetailsFirst.name;

        
      } else {
        mainVideo = this.props.location.state.videoDetailsFirst.main_video;

        videoTitle = this.props.location.state.videoDetailsFirst.title;

      }

      return (
        <div>
          <div className="single-video">
            <ReactPlayer
              ref={this.ref}
              // url={[
              //   {
              //     src:
              //       "http://adminview.streamhash.com:8080/426x240SV-201…8-59-443b8c7d4d68e41bb9a618a0de9a5f4003710241.mp4",
              //     type: "video/webm"
              //   },

              //   {
              //     src:
              //       "http://adminview.streamhash.com:8080/640x360SV-2019-09-23-05-18-59-443b8c7d4d68e41bb9a618a0de9a5f4003710241.mp4",
              //     type: "video/ogg"
              //   }
              // ]}
              url={mainVideo}
              controls={true}
              width="100%"
              height="100vh"
              playing={true}
              onStart={this.onLoad}
              onPause={this.onPauseVideo}
              onPlay={
                this.props.location.state.videoFrom == "trailer"
                  ? ""
                  : this.onVideoPlay
              }
              onEnded={this.onCompleteVideo}
              onTimeUpdate={this.onVideoTimeUpdate.bind(this)}
              config={{
                file: {
                  tracks: [
                    {
                      kind: "subtitles",
                      src: "subs/subtitles.en.vtt",
                      srcLang: "en",
                      default: true
                    },
                    {
                      kind: "subtitles",
                      src: "subs/subtitles.ja.vtt",
                      srcLang: "ja"
                    },
                    {
                      kind: "subtitles",
                      src: "subs/subtitles.de.vtt",
                      srcLang: "de"
                    }
                  ],
                  attributes: {
                    controlsList: "nodownload"
                  }
                }
              }}
            />
            <div className="back-arrowsec">
              <Link to="/home">
                <img
                  src={window.location.origin + "/assets/img/left-arrow.png"}
                  alt="arrow"
                />
                <span className="txt-overflow capitalize ml-3">
                  {videoTitle}
                </span>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default VideoComponent;
