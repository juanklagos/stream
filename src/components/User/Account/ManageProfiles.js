import React, { Component } from "react";

import { Link, Redirect } from "react-router-dom";

import api from "../../../Environment";
import Helper from "../../Helper/helper";
import { withToastManager } from "react-toast-notifications";

import ToastDemo from "../../Helper/toaster";

import {
    setTranslations,
    setDefaultLanguage,
    translate
} from "react-multi-lang";

import configuration from "react-global-configuration";

class ManageProfilesComponent extends Helper {
    state = {
        renderManageProfile: "",
        data: {},
        renderAddProfile: "",
        loading: true,
        activeProfile: [],
        loadingContent: null,
        buttonDisable: false,
        inputData: [],
        imagePreviewUrl: null,
        addNewProfileOption: null
    };
    componentDidMount() {
        // view all sub profile
        this.viewProfiles();
    }
    handleClick = (data, event) => {
        event.preventDefault();

        this.setState({ renderManageProfile: 1 });
        this.setState({ data });

        this.render();
    };
    handleChangeImage = ({ currentTarget: input }) => {
        const inputData = { ...this.state.inputData };
        if (input.type === "file") {
            inputData[input.name] = input.files[0];
            this.setState({ inputData });
        }
        let reader = new FileReader();
        let file = input.files[0];

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        let data;

        if (this.state.inputData == undefined) {
            data = {
                sub_profile_id: this.state.data.sub_profile_id,
                name: this.state.data.name
            };
        } else {
            data = {
                sub_profile_id: this.state.data.sub_profile_id,
                name: this.state.data.name,
                picture: this.state.inputData.picture
            };
        }

        this.setState({
            loadingContent: this.props.t("button_loading"),
            buttonDisable: true
        });
        console.log("Data", data);
        api.postMethod("edit-sub-profile", data).then(response => {
            if (response.data.success) {
                // this.props.history.push("/manage-profiles");
                ToastDemo(
                    this.props.toastManager,
                    response.data.message,
                    "success"
                );
                this.setState({ loadingContent: null, buttonDisable: false });
                window.location = "/manage-profiles";
            } else {
                ToastDemo(
                    this.props.toastManager,
                    response.data.error_messages,
                    "error"
                );
                this.setState({ loadingContent: null, buttonDisable: false });
            }
        });
    };

    handleDelete = (event, sub_profile_id) => {
        event.preventDefault();

        const data = {
            delete_sub_profile_id: sub_profile_id
        };

        api.postMethod("sub_profiles/delete", data).then(response => {
            if (response.data.success) {
                ToastDemo(
                    this.props.toastManager,
                    response.data.message,
                    "success"
                );
                localStorage.setItem(
                    "active_profile_id",
                    response.data.sub_profile_id
                );

                window.location = "/manage-profiles";
            } else {
                ToastDemo(
                    this.props.toastManager,
                    response.data.error_messages,
                    "error"
                );
            }
        });
    };

    backToManageProfile = event => {
        event.preventDefault();
        this.setState({ renderManageProfile: 0 });
        this.setState({ renderAddProfile: 0 });

        this.render();
    };

    addProfile = event => {
        event.preventDefault();
        this.setState({ renderAddProfile: 1 });
        this.setState({ renderManageProfile: 0 });
        this.setState({ data: {} });

        this.render();
    };

    handleAddProfileSubmit = event => {
        event.preventDefault();
        let data;

        if (this.state.inputData == undefined) {
            data = {
                name: this.state.data.name
            };
        } else {
            data = {
                name: this.state.data.name,
                picture: this.state.inputData.picture
            };
        }

        api.postMethod("add-profile", data).then(response => {
            if (response.data.success === true) {
                window.location = "/manage-profiles";
                ToastDemo(
                    this.props.toastManager,
                    response.data.message,
                    "success"
                );
            } else {
                ToastDemo(
                    this.props.toastManager,
                    response.data.error_messages,
                    "info"
                );
            }
        });
    };

    renderProfile = activeProfile => {
        return (
            <React.Fragment>
                {activeProfile.map(detail => (
                    <li className="profile" key={detail.sub_profile_id}>
                        <Link
                            onClick={event => this.handleClick(detail, event)}
                            to="#"
                        >
                            <div className="relative">
                                <img
                                    src={detail.picture}
                                    className="profile-img"
                                    alt="profile_img"
                                />
                                <div className="edit-overlay">
                                    <div className="edit-icon-outline">
                                        <i className="fas fa-pencil-alt" />
                                    </div>
                                </div>
                            </div>
                            <p className="profile-name">{detail.name}</p>
                        </Link>
                    </li>
                ))}
            </React.Fragment>
        );
    };

    render() {
        const { t } = this.props;

        var bgImg = {
            backgroundImage: `url(${configuration.get(
                "configData.common_bg_image"
            )})`
        };
        const {
            data,
            loading,
            activeProfile,
            imagePreviewUrl,
            addNewProfileOption
        } = this.state;
        let renderData;
        if (this.state.renderManageProfile === 1) {
            renderData = (
                <div className="main">
                    <div className="view-profile">
                        <div className="edit-profile-content">
                            <div className="head-section">
                                <h1 className="view-profiles-head">
                                    {t("edit")} {t("profile")}
                                </h1>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="edit-profile-sec">
                                    <div className="display-inline">
                                        <div className="edit-left-sec">
                                            <div className="edit-profile-imgsec">
                                                <img
                                                    src={
                                                        imagePreviewUrl
                                                            ? imagePreviewUrl
                                                            : data.picture
                                                    }
                                                    alt="profile_img"
                                                />
                                                <div className="edit-icon">
                                                    <div className="edit-icon-circle">
                                                    {/*   <input
                                                            type="file"
                                                            className="form-control"
                                                            accept="image/*"
                                                            onChange={
                                                                this
                                                                    .handleChangeImage
                                                            }
                                                            name="picture"
                                                        />
                                                        <i className="fas fa-pencil-alt" /> */}
                                                        <div class="image-upload">
                                                            <label for="file-input">
                                                            <i className="fas fa-pencil-alt" />
                                                            </label>
                                                            <input id="file-input" type="file" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="edit-right-sec">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    onChange={this.handleChange}
                                                    name="name"
                                                    value={data.name}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="button-topspace">
                                    <button
                                        type="submit"
                                        className="white-btn"
                                        disabled={this.state.buttonDisable}
                                    >
                                        {this.state.loadingContent != null
                                            ? this.state.loadingContent
                                            : "save"}
                                    </button>
                                    <Link
                                        to="#"
                                        onClick={this.backToManageProfile}
                                        className="grey-outline-btn"
                                    >
                                        {t("cancel")}
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={event =>
                                            this.handleDelete(
                                                event,
                                                data.sub_profile_id
                                            )
                                        }
                                        className="grey-outline-btn"
                                    >
                                        {t("delete")} {t("profile")}
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.renderAddProfile === 1) {
            renderData = (
                <div className="main">
                    <div className="view-profile">
                        <div className="edit-profile-content">
                            <div className="head-section">
                                <h1 className="view-profiles-head">
                                    {t("add")} {"profile"}
                                </h1>
                            </div>
                            <form onSubmit={this.handleAddProfileSubmit}>
                                <div className="edit-profile-sec">
                                    <div className="display-inline">
                                        <div className="edit-left-sec">
                                            <div className="edit-profile-imgsec">
                                                <img
                                                    src={
                                                        imagePreviewUrl
                                                            ? imagePreviewUrl
                                                            : "../assets/img/icon1.png"
                                                    }
                                                    alt="profile_img"
                                                />
                                                <div className="edit-icon">
                                                    <div className="edit-icon-circle">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="form-control"
                                                            onChange={
                                                                this
                                                                    .handleChangeImage
                                                            }
                                                            name="picture"
                                                        />
                                                        <i className="fas fa-pencil-alt" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="edit-right-sec">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    onChange={this.handleChange}
                                                    name="name"
                                                    value={data.name}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="button-topspace">
                                    <button type="submit" className="white-btn">
                                        {t("save")}
                                    </button>
                                    <Link
                                        to="#"
                                        onClick={this.backToManageProfile}
                                        className="grey-outline-btn"
                                    >
                                        {t("cancel")}
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            renderData = (
                <div className="main">
                    <div className="view-profile">
                        <div className="view-profile-content">
                            <div className="head-section">
                                <h1 className="view-profiles-head">
                                    {t("manage")} {t("profiles")}
                                </h1>
                            </div>
                            <ul className="choose-profile">
                                {loading
                                    ? "Loading.."
                                    : this.renderProfile(activeProfile)}
                                {loading ? (
                                    ""
                                ) : addNewProfileOption == 1 ? (
                                    <li className="profile">
                                        <Link to="#" onClick={this.addProfile}>
                                            <div className="relative">
                                                <div className="">
                                                    <i className="fa fa-plus-circle fa-5x" />
                                                </div>
                                            </div>
                                            <p className="profile-name">
                                                {t("add")} {t("profile")}
                                            </p>
                                        </Link>
                                    </li>
                                ) : (
                                    ""
                                )}
                            </ul>
                            <div>
                                <Link to="/view-profiles" className="white-btn">
                                    {t("done")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="common-bg-img" style={bgImg}>
                <div className="account-page-header">
                    <Link to="/home">
                        <img
                            src={configuration.get("configData.site_logo")}
                            className="logo-img"
                            alt="logo_img"
                        />
                    </Link>
                </div>
                {renderData}
            </div>
        );
    }
}

export default withToastManager(translate(ManageProfilesComponent));
