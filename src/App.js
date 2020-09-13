import React, { Component } from "react";
import ReactTimeout from "react-timeout";
import Emitter from "./components/Services/EventEmitter";

import { Router, Switch, Route, Redirect } from "react-router-dom";

import createHistory from "history/createBrowserHistory";

//Layouts

import AuthLayout from "../src/components/Layouts/AuthLayout";
import StaticLayout from "../src/components/Layouts/StaticLayout";
import UserLayout from "../src/components/Layouts/UserLayout";
import EmptyLayout from "../src/components/Layouts/EmptyLayout";
import KidsLayout from "../src/components/Layouts/KidsLayout";

// Auth Layout
import LandingPage from "../src/components/Auth/LandingPage";
import RegisterComponent from "../src/components/Auth/Register";
import LoginCommponent from "../src/components/Auth/Login";
import ForgotPasswordComponent from "../src/components/Auth/ForgotPassword";

//Empty layout
import Sample from "../src/components/Static/Sample";
import ErrorComponent from "../src/components/Static/Error";
import ViewProfilesComponent from "../src/components/User/Account/ViewProfiles";
import ManageProfilesComponent from "../src/components/User/Account/ManageProfiles";
import EditProfilesComponent from "../src/components/User/Account/Editprofile";
import LoaderComponent from "./components/Static/Loader";
import VideoComponent from "./components/User/Video/Video";

// User Layout
import Home from "../src/components/User/Home";
import AccountComponent from "../src/components/User/Account/Account";
import EditAccountComponent from "../src/components/User/Account/EditAccount";
import ChangePasswordComponent from "../src/components/User/Account/ChangePassword";
import ReferalFriend from "../src/components/Referal/ReferalFriend";
import DeleteAccountComponent from "../src/components/User/Account/DeleteAccount";
import SearchComponent from "./components/User/Search";

import SubscriptionComponent from "../src/components/User/Settings/Subscription";
import BillingDetailsComponent from "../src/components/User/Settings/BillingDetails";
import BillingDetailsView from "../src/components/User/Settings/billing-view-details";
import AddCardComponent from "../src/components/User/Settings/AddCard";
import CardDetailsComponent from "../src/components/User/Settings/CardDetails";
import InvoiceComponent from "../src/components/User/Settings/Invoice";
import PayPerView from "../src/components/User/Settings/PayPerView";
import PaymentHistory from "../src/components/User/Settings/PaymentHistory";
import PaymentViewDetails from "../src/components/User/Settings/payment-view-details";
import PaymentOptions from "../src/components/User/Settings/PaymentOptions";
import PaymentSuccess from "../src/components/User/Settings/PaymentSuccess";
import PaymentFailure from "../src/components/User/Settings/PaymentFailure";
import SubCategory from "../src/components/User/Video/SubCategory";
import Logout from "./components/Auth/logout";

import HomeBanner from "../src/components/HomeBanner";

// Kids layout
import Kids from "../src/components/User/Kids/Kids";
import KidsOriginals from "../src/components/User/Kids/Originals";
import KidsCharacters from "../src/components/User/Kids/Characters";
import KidsCategory from "../src/components/User/Kids/Category";

// Static layout
import Page from "../src/components/Static/Page";
import Wishlist from "./components/User/Account/wishlist";
import History from "./components/User/Account/history";
import { Elements, StripeProvider } from "react-stripe-elements";

import { ToastProvider } from "react-toast-notifications";
import Genres from "./components/User/genres";
import Category from "./components/User/category";
import ViewAll from "./components/User/viewAll";
import Notifications from "./components/User/Account/notificationsViewAll";

import configuration from "react-global-configuration";
import { apiConstants } from "./components/Constant/constants";
import configData from "./json/settings.json";
import { Helmet } from "react-helmet";

import {
    setTranslations,
    setDefaultLanguage,
    translate,
    setLanguage
} from "react-multi-lang";
import en from "./components/translation/en.json";
import pt from "./components/translation/pt.json";

setTranslations({ pt, en });

const history = createHistory();
const $ = window.$;

const AppRoute = ({
    component: Component,
    layout: Layout,
    screenProps: ScreenProps,
    ...rest
}) => (
    <Route
        {...rest}
        render={props => (
            <Layout screenProps={ScreenProps}>
                <Component {...props} />
            </Layout>
        )}
    />
);

const PrivateRoute = ({
    component: Component,
    layout: Layout,
    screenProps: ScreenProps,
    authentication,
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            authentication === true ? (
                <Layout screenProps={ScreenProps}>
                    <Component {...props} />
                </Layout>
            ) : (
                <Redirect
                    to={{ pathname: "/", state: { from: props.location } }}
                />
            )
        }
    />
);

class App extends Component {
    constructor(props) {
        super(props);

        let userId = localStorage.getItem("userId");

        let accessToken = localStorage.getItem("accessToken");

        this.state = {
            loading: true,
            configLoading: true,
            authentication: userId && accessToken ? true : false
        };

        this.eventEmitter = new Emitter();

        history.listen((location, action) => {
            userId = localStorage.getItem("userId");

            accessToken = localStorage.getItem("accessToken");

            this.setState({
                loading: true,
                authentication: userId && accessToken ? true : false
            });

            // this.setState({ loading: true, authentication: true });

            // this.loadingFn();

            document.body.scrollTop = 0;
        });
        this.fetchConfig();
    }

    async fetchConfig() {
        const response = await fetch(apiConstants.settingsUrl);
        const configValue = await response.json();
        configuration.set({
            configData: configValue.data
        });
        this.setState({ configLoading: false });

        $("#google_analytics").html(
            configuration.get("configData.google_analytics")
        );

        $("#header_scripts").html(
            configuration.get("configData.header_scripts")
        );

        $("#body_scripts").html(configuration.get("configData.body_scripts"));
    }

    loadingFn() {
        this.props.setTimeout(() => {
            this.setState({ loading: false });
        }, 3 * 1000);
    }

    componentDidMount() {
        let userLanguage = localStorage.getItem("lang")
           ? localStorage.getItem("lang") : "en";
        console.log(userLanguage);
        localStorage.setItem("lang", userLanguage);
        setLanguage(userLanguage);
        // console.log("Google", configuration.get("configData"));
    }

    render() {
        const isLoading = this.state.configLoading;

        if (isLoading) {
            return (
                <div className="wrapper">
                    <div className="loader-warpper">
                        <div id="loader">
                            <p>Project setting up</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Helmet>
                    <title>{configuration.get("configData.site_name")}</title>
                    <link
                        rel="icon"
                        type="image/png"
                        href={configuration.get("configData.site_icon")}
                        sizes="16x16"
                    />
                    <meta
                        name="description"
                        content={configuration.get(
                            "configData.meta_description"
                        )}
                    ></meta>
                    <meta
                        name="keywords"
                        content={configuration.get("configData.meta_keywords")}
                    ></meta>
                    <meta
                        name="author"
                        content={configuration.get("configData.meta_author")}
                    ></meta>
                </Helmet>
                <StripeProvider apiKey="pk_test_uDYrTXzzAuGRwDYtu7dkhaF3">
                    <ToastProvider>
                        <Router history={history}>
                            <Switch>
                                {/***Auth layout - Having only footer ****/}

                                <AppRoute
                                    exact
                                    path={"/"}
                                    component={LandingPage}
                                    layout={AuthLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <AppRoute
                                    path={"/register"}
                                    component={RegisterComponent}
                                    layout={AuthLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <AppRoute
                                    path={"/login"}
                                    component={LoginCommponent}
                                    layout={AuthLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <Route path={"/logout"} component={Logout} />
                                <AppRoute
                                    path={"/forgot-password"}
                                    component={ForgotPasswordComponent}
                                    layout={AuthLayout}
                                    screenProps={this.eventEmitter}
                                />

                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/genre/:id"}
                                    component={Genres}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />

                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/view-all"}
                                    component={ViewAll}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />

                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/notification/view-all"}
                                    component={Notifications}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />

                                {/***Empty layout ****/}
                                <AppRoute
                                    path={"/sample"}
                                    component={Sample}
                                    layout={EmptyLayout}
                                    screenProps={this.screenProps}
                                />
                                <AppRoute
                                    path={"/error"}
                                    component={ErrorComponent}
                                    layout={EmptyLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/view-profiles"}
                                    component={ViewProfilesComponent}
                                    layout={EmptyLayout}
                                    screenProps={this.EmptyLayout}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/manage-profiles"}
                                    component={ManageProfilesComponent}
                                    layout={EmptyLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/edit-profile/:id"}
                                    component={EditProfilesComponent}
                                    layout={EmptyLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <AppRoute
                                    path={"/loader"}
                                    component={LoaderComponent}
                                    layout={EmptyLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <AppRoute
                                    path={"/video/:id"}
                                    component={VideoComponent}
                                    layout={EmptyLayout}
                                    screenProps={this.eventEmitter}
                                />

                                {/***user layout - Having differnt header and footer ****/}
                                {/* <AppRoute authentication={this.state.authentication} path={"/home"} component={Home} layout={UserLayout} screenProps={this.eventEmitter}/> */}

                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/home"}
                                    component={Home}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/account"}
                                    component={AccountComponent}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/edit-account"}
                                    component={EditAccountComponent}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/change-password"}
                                    component={ChangePasswordComponent}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/referal"}
                                    component={ReferalFriend}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/delete-account"}
                                    component={DeleteAccountComponent}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/search"}
                                    component={SearchComponent}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/subscription"}
                                    component={SubscriptionComponent}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/billing-details"}
                                    component={BillingDetailsComponent}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/billing-detail/view"}
                                    component={BillingDetailsView}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />

                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/card-details"}
                                    component={CardDetailsComponent}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/wishlist"}
                                    component={Wishlist}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/category/:id"}
                                    component={Category}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />

                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/invoice"}
                                    component={InvoiceComponent}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/pay-per-view"}
                                    component={PayPerView}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/payment-history"}
                                    component={PaymentHistory}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/payment/view-details"}
                                    component={PaymentViewDetails}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/payment-options"}
                                    component={PaymentOptions}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/payment-success"}
                                    component={PaymentSuccess}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />

                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/payment-failure"}
                                    component={PaymentFailure}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />

                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/history"}
                                    component={History}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />

                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path={"/sub-category"}
                                    component={SubCategory}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <AppRoute
                                    path={"/home-banner"}
                                    component={HomeBanner}
                                    layout={UserLayout}
                                    screenProps={this.eventEmitter}
                                />

                                {/***kids layout - Having white header and footer ****/}

                                <PrivateRoute
                                    authentication={this.state.authentication}
                                    path="/kids"
                                    exact
                                    component={Kids}
                                    layout={KidsLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <AppRoute
                                    path="/kids/originals"
                                    component={KidsOriginals}
                                    layout={KidsLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <AppRoute
                                    path="/kids/characters"
                                    component={KidsCharacters}
                                    layout={KidsLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <AppRoute
                                    path="/kids/category"
                                    component={KidsCategory}
                                    layout={KidsLayout}
                                    screenProps={this.eventEmitter}
                                />

                                {/***static layout - Having differnt header and footer ****/}

                                <AppRoute
                                    path="/page/:id"
                                    component={Page}
                                    layout={StaticLayout}
                                    screenProps={this.eventEmitter}
                                />
                                <Elements>
                                    <PrivateRoute
                                        authentication={
                                            this.state.authentication
                                        }
                                        path={"/add-card"}
                                        component={AddCardComponent}
                                        layout={UserLayout}
                                        screenProps={this.eventEmitter}
                                    />
                                </Elements>
                            </Switch>
                        </Router>
                    </ToastProvider>
                </StripeProvider>
            </div>
        );
    }
}

export default ReactTimeout(App);
