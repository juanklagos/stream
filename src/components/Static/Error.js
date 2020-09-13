import React, {Component} from 'react';

import {Link} from 'react-router-dom';

class ErrorComponent extends Component{
    render(){
        return(
            <div className="error-bg">
                <div className="row width-100">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 error-sec text-center">
                        <div>
                            <img src="assets/img/error.png" className="error-img" alt="error_img" />
                            <h4 className="error-text">An error Occurred in the Application And Your Page could not be Served</h4>
                            <Link to="/home" className="btn btn-danger mb-5">go back</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ErrorComponent;