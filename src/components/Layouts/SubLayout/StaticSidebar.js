import React, { Component } from "react";
import api from "../../../Environment";
import { Link } from "react-router-dom";
import configuration from "react-global-configuration";

class StaticSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            footer_pages1: [],
            footer_pages2: [],
            footer_pages3: [],
            footer_pages4: [],
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

        if (configuration.get("configData.footer_pages3")) {
            this.setState({
                footer_pages3: configuration.get("configData.footer_pages3")
            });
        }

        if (configuration.get("configData.footer_pages4")) {
            this.setState({
                footer_pages4: configuration.get("configData.footer_pages4")
            });
        }
    }

    render() {
        // const { t } = this.props;

        const { loading, footerList } = this.state;
        return (
            <div>
                <div className="top-bottom-spacing">
                    <ul className="static-sidebar-list">
                        {loading
                            ? this.state.loading
                            : footerList.length > 0
                            ? footerList.map((static_page, index) => (
                                  <li className="" key={`page1${index}`}>
                                      <Link
                                          to={{
                                              pathname: `/page/${static_page.page_type}`,
                                              state: {
                                                  page_id: static_page.page_id
                                              }
                                          }}
                                      >
                                          {static_page.title}
                                      </Link>
                                  </li>
                              ))
                            : ""}

                        {/* {this.state.footer_pages2.length > 0
              ? this.state.footer_pages2.map((static_page2, index) => (
                  <li className="active" key={`page2${index}`}>
                    <Link to={`/page/${static_page2.unique_id}`}>
                      {static_page2.heading}
                    </Link>
                  </li>
                ))
              : ""} */}
                    </ul>
                </div>
            </div>
        );
    }
}

export default StaticSidebar;
