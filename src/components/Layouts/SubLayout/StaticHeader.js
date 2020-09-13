import React, { Component } from "react";
import { Link } from "react-router-dom";
import configuration from "react-global-configuration";

const $ = window.$;

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: this.props.data
        };
    }

    componentDidMount() {
        var headerHeight = $("#header").outerHeight();

        $(".header-height").height(headerHeight);

        // Call api function
    }

    render() {
        return (
            <div>
                <nav
                    className="navbar navbar-expand navbar-dark main-nav fixed-top"
                    id="header"
                >
                    <Link className="navbar-brand" to="/home">
                        <img
                            src={configuration.get("configData.site_logo")}
                            className="logo-img desktop-logo"
                            alt="logo_img"
                        />
                        <img
                            src={configuration.get("configData.site_icon")}
                            className="logo-img mobile-logo"
                            alt="logo_img"
                        />
                    </Link>
                </nav>
                <div className="header-height"></div>
            </div>
        );
    }
}

export default Header;
