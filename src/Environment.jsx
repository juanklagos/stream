import axios from "axios";

import { apiConstants } from "./components/Constant/constants";

import {
    getLanguage
} from "react-multi-lang";

const apiUrl = "http://adminview.streamhash.com/userApi/"; // Production Mode

// const apiUrl = "http://localhost:8000/userApi/"; // Development Mode

const Environment = {
    postMethod(action, object) {
        let userId =
            localStorage.getItem("userId") !== "" &&
            localStorage.getItem("userId") !== null &&
            localStorage.getItem("userId") !== undefined
                ? localStorage.getItem("userId")
                : "";

        let accessToken =
            localStorage.getItem("accessToken") !== "" &&
            localStorage.getItem("accessToken") !== null &&
            localStorage.getItem("accessToken") !== undefined
                ? localStorage.getItem("accessToken")
                : "";

        const url = apiUrl + action;
        
        let language = getLanguage();

        let formData = new FormData();

        // By Default Id and token

        formData.append("id", userId);
        formData.append("token", accessToken);
        formData.append("language", language);
        formData.append(
            "sub_profile_id",
            localStorage.getItem("active_profile_id")
        );

        var socialLoginUser = 0;

        // append your data
        for (var key in object) {
            formData.append(key, object[key]);

            if (key === "social_unique_id") {
                socialLoginUser = 1;
            }
        }

        // By Default added device type and login type in future use
        if (!socialLoginUser) {
            formData.append("login_by", apiConstants.LOGIN_BY);
        }

        formData.append("device_type", apiConstants.DEVICE_TYPE);
        formData.append("device_token", apiConstants.DEVICE_TOKEN);

        return axios.post(url, formData);
    },

    getMethod(action, object) {
        let userId =
            localStorage.getItem("userId") !== "" &&
            localStorage.getItem("userId") !== null &&
            localStorage.getItem("userId") !== undefined
                ? localStorage.getItem("userId")
                : "";
        let accessToken =
            localStorage.getItem("accessToken") !== "" &&
            localStorage.getItem("accessToken") !== null &&
            localStorage.getItem("accessToken") !== undefined
                ? localStorage.getItem("accessToken")
                : "";

        const url = apiUrl + action;

        let formData = new FormData();
         
        let language = getLanguage();

        // By Default Id and token

        formData.append("id", userId);
        formData.append("token", accessToken);
        formData.append("language", language);

        // append your data
        for (var key in object) {
            formData.append(key, object[key]);
        }

        // By Default added device type and login type in future use

        formData.append("login_by", apiConstants.LOGIN_BY);
        formData.append("device_type", apiConstants.DEVICE_TYPE);
        formData.append("device_token", apiConstants.DEVICE_TOKEN);

        return axios.get(url, formData);
    }

    /*methods(action) {

        const url = apiUrl+'/api/'+action;

        return {
            getOne: ({ id }) => axios.get(`${url}/${id}`),
            getAll: (toGet) => axios.post(url, toGet),
            update: (toUpdate) =>  axios.put(url,toUpdate),
            create: (toCreate) =>  axios.put(url,toCreate),
            delete: ({ id }) =>  axios.delete(`${url}/${id}`)
        }
    }*/
};

export default Environment;
