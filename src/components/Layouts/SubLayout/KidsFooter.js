import React, {Component} from 'react';

import {Link} from 'react-router-dom';

const $ = window.$;

class KidsFooter extends Component {

    constructor(props) {

        super(props);

        this.state = {
            
            isAuthenticated : this.props.data,
            
        };

    }

    componentDidMount() {
        var footerHeight = $('#footer').outerHeight();

        $('.bottom-height').height(footerHeight);
        // Call api function

    }

    render() {

        return (

            <div>
                <div className="bottom-height"></div>
                <div className="footer white-footer" id="footer">
                    <div className="site-footer">
                        
                        <ul className="footer-link">
                            <li className="footer-link-list">
                                <Link to="/page">privacy policy</Link>
                            </li>
                            <li className="footer-link-list">
                                <Link to="/page">terms and conditions</Link>
                            </li>
                            <li className="footer-link-list">
                                <Link to="/page">cookie preferences</Link>
                            </li>
                        </ul>
                    
                    </div>
                </div>
            </div>
        );

    }

}


export default KidsFooter;