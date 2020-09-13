import React, { Component } from "react";

import Slider from "../SliderView/MainSlider";

import api from "../../Environment";
import ContentLoader from "../Static/contentLoader";

class ViewAll extends Component {
  state = {
    videoList: null,
    loading: true
  };
  componentDidMount() {
    if (this.props.location.state) {
      //
    } else {
      window.location = "/home";
    }
    let inputData;
    let apiURL;
    if (this.props.location.state.videoType != undefined) {
      inputData = {
        skip: 0,
        cast_crew_id: this.props.location.state.cast_crew_id
      };
      apiURL = "v4/cast_crews/videos";
    } else {
      inputData = {
        skip: 0,
        url_type: this.props.location.state.url_type,
        url_type_id: this.props.location.state.url_type_id,
        page_type: this.props.location.state.page_type,
        category_id: this.props.location.state.category_id,
        sub_category_id: this.props.location.state.sub_category_id
      };
      apiURL = "see_all";
    }
    this.viewAllApiCall(inputData, apiURL);
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    let inputData;
    let apiURL;
    if (nextProps.location.state.videoType != undefined) {
      inputData = {
        skip: 0,
        cast_crew_id: nextProps.location.state.cast_crew_id
      };
      apiURL = "v4/cast_crews/videos";
    } else {
      inputData = {
        skip: 0,
        url_type: nextProps.location.state.url_type,
        url_type_id: nextProps.location.state.url_type_id,
        page_type: nextProps.location.state.page_type,
        category_id: nextProps.location.state.category_id,
        sub_category_id: nextProps.location.state.sub_category_id
      };
      apiURL = "see_all";
    }
    this.viewAllApiCall(inputData, apiURL);
  }

  viewAllApiCall = (inputData, apiURL) => {
    api
      .postMethod(apiURL, inputData)
      .then(response => {
        if (response.data.success) {
          this.setState({
            loading: false,
            videoList: response.data.data
          });
        } else {
        }
      })
      .catch(function(error) {});
  };

  chunkArray(myArray, chunk_size) {
    let results = [];

    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }

    return results;
  }

  render() {
    // Usage

    let result = null;

    // Split in group of 3 items
    if (this.state.loading) {
      return <ContentLoader />;
    } else {
      result = this.chunkArray(this.state.videoList, 5);
    }

    // Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]

    return (
      <div className="main p-40">
        <div className="main-slidersec">
          <h3 className="">
            {this.props.location.state.title}
            <i className="fas fa-angle-right ml-2" />
          </h3>
          {result.map(res => (
            <Slider key={res.index}>
              {res.map(movie => (
                <Slider.Item movie={movie} key={movie.admin_video_id}>
                  item1
                </Slider.Item>
              ))}
            </Slider>
          ))}
        </div>
        <div className="height-100" />
      </div>
    );
  }
}

export default ViewAll;
