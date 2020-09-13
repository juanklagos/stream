import React, { Component } from "react";

import Slider from "../../SliderView/MainSlider";

import api from "../../../Environment";
import ContentLoader from "../../Static/contentLoader";

class Wishlist extends Component {
  state = {
    wishlists: null,
    loading: true
  };
  componentDidMount() {
    const inputData = {
      skip: 0
    };
    // let maindata = { ...this.state.maindata };
    // let errorHandle = 0;
    api
      .postMethod("wishlists/list", inputData)
      .then(response => {
        if (response.data.success === true) {
          let wishlists = response.data.data;
          this.setState({ loading: false, wishlists: wishlists });
        } else {
        }
      })
      .catch(function(error) {});
  }

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
      result = this.chunkArray(this.state.wishlists, 5);
    }

    // Outputs : [ [1,2,3] , [4,5,6] ,[7,8] ]

    return (
      <div className="main p-40">
        <div className="main-slidersec">
          <h3 className="">
            Wishlist
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

export default Wishlist;
