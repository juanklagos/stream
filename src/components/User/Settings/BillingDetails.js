import React, { Component } from "react";

import { Link, Redirect } from "react-router-dom";

import api from "../../../Environment";
import ToastDemo from "../../Helper/toaster";
import { withToastManager } from "react-toast-notifications";
import Helper from "../../Helper/helper";

import {

    translate, t
} from "react-multi-lang";


import $ from "jquery";


class BillingDetailsComponent extends Helper {
  state = {
    subscriptions: [],
    loading: true,
    redirect: false,
    data: {},
    loadingContent: null,
    buttonDisable: false,
    cancelled_status: 0
  };
  componentDidMount() {
    // api call
    const data = {
      sub_profile_id: ""
    };

    api.postMethod("subscribedPlans", data).then(response => {
      if (response.data.success) {
        if (response.data.data != "") {
          this.setState({
            loading: false,
            subscriptions: response.data.data,
            cancelled_status: response.data.data
              ? response.data.data[0].cancelled_status
              : 0
          });
        } else {
          this.setState({
            loading: false,
            subscriptions: response.data.data
          });
        }
      } else {
        this.props.history.push("/account");
        ToastDemo(this.props.toastManager, response.data.error, "error");
      }
    });
  }

  handleCancelAutoRenewal = event => {
    event.preventDefault();
    this.setState({
      loadingContent: "Loading... Please wait..",
      buttonDisable: true
    });
    let inputData = {
      cancel_reason: this.state.data.cancel_reason
    };
    api
      .postMethod("cancel/subscription", inputData)
      .then(response => {
        if (response.data.success) {
          ToastDemo(this.props.toastManager, response.data.message, "success");
          this.setState({
            loadingContent: null,
            buttonDisable: false,
            cancelled_status: 1
          });
          window.$("#cancel-subs").modal("toggle");
        } else {
          ToastDemo(
            this.props.toastManager,
            response.data.error_messages,
            "error"
          );
          this.setState({ loadingContent: null, buttonDisable: false });
        }
      })
      .catch(error => {
        ToastDemo(this.props.toastManager, error, "error");
        this.setState({ loadingContent: null, buttonDisable: false });
      });
  };

  handleEnableAutoRenewal = event => {
    event.preventDefault();
    this.setState({
      loadingContent: "Loading... Please wait..",
      buttonDisable: true
    });
    let inputData = {
      cancel_reason: this.state.data.cancel_reason
    };
    api
      .postMethod("autorenewal/enable", inputData)
      .then(response => {
        if (response.data.success) {
          ToastDemo(this.props.toastManager, response.data.message, "success");
          this.setState({
            loadingContent: null,
            buttonDisable: false,
            cancelled_status: 0
          });
        } else {
          ToastDemo(
            this.props.toastManager,
            response.data.error_messages,
            "error"
          );
          this.setState({ loadingContent: null, buttonDisable: false });
        }
      })
      .catch(error => {
        ToastDemo(this.props.toastManager, error, "error");
        this.setState({ loadingContent: null, buttonDisable: false });
      });
  };

  render() {
    const { loading, subscriptions, data, cancelled_status } = this.state;
    // if (loading) {
    //   return "Loading...";
    // } else {
    //   if (subscriptions.length == 0) {
    //     this.props.history.push("/account");
    //     ToastDemo(this.props.toastManager, "No Data found", "error");
    //   }
    // }

    return (
      <div>
        <div className="main">
          <div className="top-bottom-spacing">
            <div className="row">
              <div className="col-sm-10 col-md-11 col-lg-9 col-xl-8 auto-margin">
                <div className="row m-0">
                  <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 p-0">
                    {loading ? (
                      "Loading..."
                    ) : subscriptions.length > 0 ? (
                      <div
                        className="billing-img"
                        style={{
                          backgroundImage: "url(../assets/img/billing.jpg)"
                        }}
                      >
                        <div className="billing-img-overlay">
                          <div className="display-inline">
                            <div className="icon-left">
                              <h4 className="billing-head">
                                <i className="far fa-calendar-alt" />
                              </h4>
                            </div>
                            <div className="content-right">
                              <h4 className="billing-head">{t("billing_details")}</h4>
                            </div>
                          </div>
                          <div className="clearfix" />
                          <p className="grey-line" />
                          <div className="display-inline">
                            <div className="icon-left">
                              <h5 className="billing-head">
                                <i className="far fa-hand-point-right" />
                              </h5>
                            </div>
                            <div className="content-right">
                              <h5 className="billing-head mb-3">
                                {t("next_billing_date")}
                              </h5>
                              <p className="m-0">
                                {subscriptions[0].expiry_date}
                              </p>
                            </div>
                          </div>
                          <div className="clearfix" />
                          <p className="grey-line" />
                          <div className="display-inline">
                            <div className="icon-left">
                              <h5 className="billing-head">
                                <i className="far fa-hand-point-right" />
                              </h5>
                            </div>
                            <div className="content-right">
                              <h5 className="billing-head mb-3">
                                {subscriptions[0].title}
                              </h5>
                              <p className="m-0">
                                {subscriptions[0].currency}
                                {subscriptions[0].amount} /{" "}
                                {subscriptions[0].plan} {t("months")}
                              </p>
                            </div>
                          </div>
                          <div className="clearfix" />
                          <p className="grey-line" />
                          <div className="text-right">
                            <Link to={"/subscription"} className="capitalize">
                              <i className="fas fa-chevron-right mr-1" />
                              {t("view_plan_details")}
                            </Link>
                          </div>
                          <div className="text-center mt-3">
                            {cancelled_status == 1 ? (
                              <a
                                href="#"
                                onClick={this.handleEnableAutoRenewal}
                                className="btn btn-success"
                              >
                                {t("enable_auto_renewal")}
                              </a>
                            ) : (
                              <a
                                href="#"
                                className="btn btn-danger"
                                data-toggle="modal"
                                data-target="#cancel-subs"
                              >
                                {t("cancel_subscription")}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      "No Data Found"
                    )}
                  </div>
                  <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7 p-0">
                    <div className="billing-content-sec">
                      <h4 className="billing-head">
                        <i className="far fa-calendar-alt" />
                        Billing Details
                      </h4>
                      <p className="grey-line" />
                      {loading
                        ? ""
                        : subscriptions.map(subscription => (
                            <div
                              className="card"
                              key={subscription.user_subscription_id}
                            >
                              <div className="card-header bg-dark text-white">
                                {subscription.title}
                              </div>
                              <div className="card-body">
                                <table className="table table-bordered m-0">
                                  <tbody>
                                    <tr>
                                      <td>{t("subscribed_date")}</td>
                                      <td>{subscription.created_at}</td>
                                    </tr>
                                    <tr>
                                      <td>{t("expiry_date")}</td>
                                      <td>{subscription.expiry_date}</td>
                                    </tr>
                                    <tr>
                                      <td>{t("no_of_account")}</td>
                                      <td>{subscription.no_of_account}</td>
                                    </tr>
                                    <tr>
                                      <td>{t("no_of_month")}</td>
                                      <td>{subscription.plan}</td>
                                    </tr>
                                    <tr>
                                      <td>{t("total_amount")}</td>
                                      <td>
                                        {subscription.currency}
                                        {subscription.total_amount}
                                      </td>
                                    </tr>
                                    {subscription.coupon_code == "" ? (
                                      ""
                                    ) : (
                                      <tr>
                                        <td>{t("coupon_amount")}</td>
                                        <td>
                                          {subscription.currency}
                                          {subscription.coupon_amount}
                                        </td>
                                      </tr>
                                    )}
                                    <tr>
                                      <td>{t("paid_amount")}</td>
                                      <td>
                                        {subscription.currency}
                                        {subscription.amount}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>{t("payment_mode")}</td>
                                      <td>{subscription.payment_mode}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade confirmation-popup" id="cancel-subs">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form
                className="auth-form cancel-form"
                onSubmit={this.handleCancelAutoRenewal}
              >
                <div className="modal-header">
                  <h4 className="modal-title">{t("pause_auto_renewal")}</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="name">{t("cancel_reason")}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="cancel_reason"
                      value={data.cancel_reason}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-link"
                    data-dismiss="modal"
                  >
                    {t("cancel")}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={this.state.buttonDisable}
                  >
                    {this.state.loadingContent != null
                      ? this.state.loadingContent
                      : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(translate(BillingDetailsComponent));
