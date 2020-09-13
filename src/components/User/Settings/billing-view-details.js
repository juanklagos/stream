import React, { Component } from "react";

import { Link } from "react-router-dom";

class BillingDeatilsView extends Component {
  render() {
    return (
      <div>
        <div className="main">
          <div className="top-bottom-spacing">
            <div className="row">
              <div className="col-sm-10 col-md-10 col-lg-8 col-xl-8 auto-margin">
                <div className="subcsription-card">
                  <div className="subcsription-head">
                    <h4 className="mt-0">Premium</h4>
                    <p className="subscription-desc">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s
                    </p>
                  </div>
                  <div className="subcsription-price">
                    <h4>$450.00 / 1 month</h4>
                    <p>
                      <i className="far fa-clock"></i>&nbsp;
                      <span>13 Dec, 2018</span>&nbsp;-&nbsp;
                      <span>12 Jan, 2019</span>
                    </p>
                  </div>
                  <div className="subcsription-details">
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <h4>maintain account</h4>
                        <h5>
                          <i className="fas fa-user-plus"></i>1
                        </h5>
                        <h4>Original amount</h4>
                        <h5>$500.00</h5>
                        <h4>payment mode</h4>
                        <h5>cash</h5>
                      </div>
                      <div className="col-sm-12 col-md-6">
                        <h4>coupon amount</h4>
                        <h5>$50.00</h5>
                        <h4>Coupon code</h4>
                        <h5>FIRSTUSER</h5>
                        <h4>payment Id</h4>
                        <h5>JHFJHF6767656FFTFRTF</h5>
                      </div>
                    </div>

                    <div className="text-right mt-4">
                      <Link to="/billing-details" className="btn btn-black">
                        go back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BillingDeatilsView;
