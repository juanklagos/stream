import React, {Component} from 'react';

import {Link} from 'react-router-dom';

class AuthHeader extends Component {

    constructor(props) {

        super(props);

        this.state = {
            
            isAuthenticated : this.props.data,
            
        };

    }

    componentDidMount() {

        // Call api function

    }

    render() {

        return (
            <div className="landing-page-header">
                <Link to="/">
                    <img src="../../../assets/img/streamview1.png" className="site-logo" alt="Logo"/>
                </Link>
                <a href="auth/login.html" className="btn btn-danger">sign in</a>
            </div>
        );

    }

}


export default AuthHeader;

