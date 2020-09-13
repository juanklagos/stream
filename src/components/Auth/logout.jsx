import React, { Component } from "react";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../Helper/toaster";

import { translate } from "react-multi-lang";

class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userLoginStatus");
        localStorage.removeItem("push_status");
        localStorage.removeItem("active_profile_id");
        localStorage.removeItem("userType");

        this.props.history.push("/");
        ToastDemo(this.props.toastManager,this.props.t("logout_success"), "success");
    }
    render() {
        return null;
    }
}

export default withToastManager(translate(Logout));
