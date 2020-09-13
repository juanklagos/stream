import React, { Component } from "react";

import { Link } from "react-router-dom";

import api from "../../../Environment";
import { translate, t } from "react-multi-lang";

class SubscriptionComponent extends Component {
    state = {
        subscriptions: [],
        loading: true
    };
    componentDidMount() {
        // api call
        const data = {
            sub_profile_id: ""
        };

        api.postMethod("subscription_plans", data).then(response => {
            if (response.data.success === true) {
                let subscriptions = response.data.data;
                this.setState({ loading: false, subscriptions: subscriptions });
            }
        });
    }

    renderSubscription = subscriptions => {
        return (
            <React.Fragment>
                {subscriptions.map(subscription => (
                    <div
                        className="col-sm-12 col-md-6 col-lg-4 col-xl-4"
                        key={subscription.subscription_id}
                    >
                        <div className="subcsription-card">
                            <div className="subcsription-head">
                                {subscription.title}
                            </div>
                            <div
                                className={
                                    "subcsription-price" +
                                    (subscription.popular_status == 1
                                        ? " premium"
                                        : "")
                                }
                            >
                                <p>plan</p>
                                <h4>
                                    {subscription.currency}
                                    {subscription.amount} / {subscription.plan}{" "}
                                    {t("month")}
                                </h4>
                            </div>
                            <div className="subcsription-details">
                                <h4>maintain account</h4>
                                <h5>
                                    <i className="fas fa-user-plus" />
                                    {subscription.no_of_account}
                                </h5>
                                <p>{subscription.description}</p>
                                <div className="text-right mt-4">
                                    <Link
                                        to={{
                                            pathname: "/invoice",
                                            state: {
                                                subscription: subscription
                                            }
                                        }}
                                        className="btn btn-danger"
                                    >
                                        pay now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </React.Fragment>
        );
    };
    render() {
        const { loading, subscriptions } = this.state;
        return (
            <div>
                <div className="main">
                    <div className="top-bottom-spacing">
                        <div className="row">
                            <div className="col-sm-10 col-md-10 col-lg-11 col-xl-10 auto-margin">
                                <div className="row">
                                    {loading
                                        ? "Loading"
                                        : this.renderSubscription(
                                              subscriptions
                                          )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubscriptionComponent;
