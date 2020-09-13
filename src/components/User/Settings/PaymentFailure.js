import React, {Component} from 'react';

import {Link} from 'react-router-dom';

import {
    setTranslations,
    setDefaultLanguage,
    translate
  } from "react-multi-lang";
  import en from "../../translation/en.json";
  import pt from "../../translation/pt.json";

class PaymentFailure extends Component{
    render(){
        const { t } = this.props;

        return(
            <div>
                <div className="main">
			        <div className="top-bottom-spacing">

                        <div className="row">
                            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 auto-margin">
                                <div className="payment-option text-center pt-0">
                                    <img src="../assets/img/failure.gif" className="success-img" alt="failure_gif" />
                                    <h3 className="billing-head mb-3">{t("payment_failure")}</h3>
                                    <h4 className="mb-3">{t("payment_failure_text")}</h4>
                                    <Link to="../index.html" className="btn btn-danger mt-1">{("go_home")}</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default translate(PaymentFailure);
