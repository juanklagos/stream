import React, { Component } from "react";
import api from "../../Environment";
import renderHTML from "react-render-html";

class Page extends Component {
  state = {
    data: {},
    loading: true
  };

  componentDidMount() {
    this.singlePageAPICall(this.props.location.state.page_id);
  }

  singlePageAPICall = page_id => {
    api.getMethod("pages/list?page_id" + "=" + page_id).then(response => {
      if (response.data.success === true) {
        this.setState({
          loading: false,
          data: response.data.data
        });
      }
    });
  };

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true });
    this.singlePageAPICall(nextProps.location.state.page_id);
  }

  render() {
    const { loading, data } = this.state;

    return (
      <div className="top-bottom-spacing">
        <div className="">
          <div className="static-head">
            <h1>{loading ? "Loading.." : data.title}</h1>
          </div>
          <div className="static-content">
            {loading ? "Loadin..." : renderHTML(data.description)}
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
