import React, { Component } from "react";

import { Link } from "react-router-dom";
import configuration from "react-global-configuration";

const $ = window.$;

class KidsHeader extends Component {
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
                    className="navbar navbar-expand navbar-dark kids-nav fixed-top"
                    id="header"
                >
                    <span className="menu-icon" id="menu_icon">
                        <img src="assets/img/menu-black.png" alt="menu_img" />
                    </span>
                    <Link className="navbar-brand abs" to="/home">
                        <img
                            src={configuration.get("configData.site_logo")}
                            className="logo-img desktop-logo"
                            alt={configuration.get("configData.site_name")}
                        />
                        <img
                            src={configuration.get("configData.site_icon")}
                            className="logo-img mobile-logo"
                            alt={configuration.get("configData.site_name")}
                        />
                    </Link>
                    <ul className="navbar-nav hidden-kids-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="#">
                                Children
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                data-toggle="dropdown"
                            >
                                categories
                            </Link>
                            <div className="dropdown-menu kids-dropmenu">
                                <div className="row m-0">
                                    <div className="col-md-3 p-0">
                                        <ul className="kids-category-list">
                                            <Link to="/kids/characters">
                                                <li>characters</li>
                                            </Link>
                                            <Link to="/kids/originals">
                                                <li>originals</li>
                                            </Link>
                                        </ul>
                                    </div>
                                    <div className="col-md-9 p-0">
                                        <ul className="kids-category-list2">
                                            <li className="section">
                                                <ul className="kids-category-list3">
                                                    <Link to="/kids/category">
                                                        <li>christmas</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>action</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>adventures</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>animals</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>sports</li>
                                                    </Link>
                                                </ul>
                                            </li>
                                            <li className="section">
                                                <ul className="kids-category-list3">
                                                    <Link to="/kids/category">
                                                        <li>christmas</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>action</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>adventures</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>animals</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>sports</li>
                                                    </Link>
                                                </ul>
                                            </li>
                                            <li className="section">
                                                <ul className="kids-category-list3">
                                                    <Link to="/kids/category">
                                                        <li>christmas</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>action</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>adventures</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>animals</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>sports</li>
                                                    </Link>
                                                </ul>
                                            </li>
                                            <li className="section">
                                                <ul className="kids-category-list3">
                                                    <Link to="/kids/category">
                                                        <li>christmas</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>action</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>adventures</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>animals</li>
                                                    </Link>
                                                    <Link to="/kids/category">
                                                        <li>sports</li>
                                                    </Link>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <form>
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="title.."
                                    className="form-control white-search-form"
                                />
                            </form>
                        </li>
                        <li className="nav-item mobile-view">
                            <Link className="nav-link" to="#">
                                <img
                                    src="assets/img/icon1.png"
                                    className="nav-profile-img"
                                    alt="profile_img"
                                />
                            </Link>
                        </li>
                        <li className="nav-item mobile-view">
                            <Link className="nav-link" to="/home">
                                <button className="btn btn-danger exit-btn">
                                    exit Children
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="header-height"></div>

                <div className="mobile-sidebar white-sidebar" id="menu_content">
                    <div className="sidebar-content">
                        <div className="p-3">
                            <Link to="/view-profiles">
                                <div className="display-inline">
                                    <div className="left-sec">
                                        <img
                                            src="assets/img/icon1.png"
                                            alt="User "
                                        />
                                    </div>
                                    <div className="right-name">
                                        <h5>ronan</h5>
                                        <h6>switch profiles</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <ul className="sidebar-menu">
                            <li>
                                <Link to="/kids/characters">characters</Link>
                            </li>
                            <li>
                                <Link to="/kids/originals">originals</Link>
                            </li>
                            <li>
                                <Link to="/home">exit chidren</Link>
                            </li>
                            <li className="line"></li>
                            <li>
                                <Link to="/kids/category">holidays</Link>
                            </li>
                            <li>
                                <Link to="/kids/category">actions</Link>
                            </li>
                            <li>
                                <Link to="/kids/category">adventures</Link>
                            </li>
                            <li>
                                <Link to="/kids/category">animals</Link>
                            </li>
                            <li>
                                <Link to="/kids/category">sports</Link>
                            </li>
                            <li>
                                <Link to="/kids/category">sports</Link>
                            </li>
                            <li>
                                <Link to="/kids/category">cute</Link>
                            </li>
                            <li>
                                <Link to="/kids/category">funny</Link>
                            </li>
                            <li>
                                <Link to="/kids/category">animated</Link>
                            </li>
                            <li>
                                <Link to="/kids/category">early learning</Link>
                            </li>
                            <li>
                                <Link to="/kids/category">fantasy</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default KidsHeader;
