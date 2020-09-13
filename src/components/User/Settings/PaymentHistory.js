import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withToastManager } from "react-toast-notifications";
import api from "../../../Environment";
import ToastDemo from "../../Helper/toaster";

import {
    // setTranslations,
    // setDefaultLanguage,
    translate
} from "react-multi-lang";
// import en from "../../translation/en.json";
// import pt from "../../translation/pt.json";

class PaymentHistory extends Component {
    state = {
        ppvList: null,
        loading: true
    };
    componentDidMount() {
        this.getPPVList();
    }

    getPPVList = () => {
        api.postMethod("ppv_list")
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        loading: false,
                        ppvList: response.data.data
                    });
                } else {
                    ToastDemo(
                        this.props.toastManager,
                        response.data.error_messages,
                        "error"
                    );
                }
            })
            .catch(error => {
                ToastDemo(this.props.toastManager, error, "error");
            });
    };
    render() {
        const { t } = this.props;

        var invoiceImg = {
            backgroundImage: "url(../assets/img/invoice.gif)"
        };

        const { loading, ppvList } = this.state;
        return (
            <div>
                <div className="main">
                    <div className="top-bottom-spacing">
                        <div className="row">
                            <div className="col-sm-10 col-md-10 col-lg-7 col-xl-6 auto-margin">
                                <div
                                    style={invoiceImg}
                                    className="payment-his-img"
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4>{t("payment_history")}</h4>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            {/* <h4 className="grey-clr">Total</h4>
                      <h4 className="bold grey-clr">$4052.00</h4> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="payment-history">
                                    {loading
                                        ? "Loading..."
                                        : ppvList.length > 0
                                        ? ppvList.map(ppv => (
                                              <div key={ppv.admin_video_id}>
                                                  <div className="paid-videos">
                                                      <div className="left">
                                                          <img
                                                              src={ppv.picture}
                                                              alt="video-img"
                                                          />
                                                      </div>
                                                      <div className="center">
                                                          <h4 className="billing-head">
                                                              {ppv.title}
                                                          </h4>
                                                          <h5 className="billing-head mt-2 grey-clr">
                                                              {ppv.currency}
                                                              {ppv.amount}
                                                              &nbsp;/&nbsp;
                                                              {ppv.payment_mode}
                                                          </h5>
                                                      </div>
                                                      <div className="right text-right">
                                                          <Link
                                                              to={{
                                                                  pathname:
                                                                      "/payment/view-details",
                                                                  state: ppv
                                                              }}
                                                              className="btn btn-danger mt-3 btn-sm"
                                                          >
                                                              {t(
                                                                  "view_details"
                                                              )}
                                                          </Link>
                                                      </div>
                                                  </div>
                                                  <div className="clearfix" />
                                              </div>
                                          ))
                                        : this.props.t("no_data_found")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withToastManager(translate(PaymentHistory));
