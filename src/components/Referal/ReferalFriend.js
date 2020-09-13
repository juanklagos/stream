import React, { Component } from "react";
import { Link } from "react-router-dom";

const ReferalFriend = () => {
    return (
        <div className="bg-color-white referal sm-padding">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>
                        <img
                            src={
                                    window.location.origin + "/assets/img/referal-friend-chat.svg"
                                }
                                alt="menu_img" className="referal-head-icon"
                            />
                        <div className="title">Tell friends about Netflix</div>
                        </h1>
                        <hr className="border-thick"></hr>
                    </div>
                </div>
                <div className="referal-sub-sec">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="">
                                <h2 className="sub-title">Share this link so your friends can join the conversation around all your favorite TV shows and movies.</h2>
                            </div>
                        </div>
                    </div>
                    <div className="referal-sub-div">
                        <div className="row">
                            <div className="col-md-6 resp-width">
                                <div className="referal-email">
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" placeholder="https://www.netflix.com/n/4NPSPQY3-4"/>
                                        <div class="input-group-append">
                                        <span class="input-group-text"><a href="#" className="btn btn-referal">Copy Link</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 resp-width resp-mrg-btm">
                                <div className="row resp-mrg-btm-1">
                                    <div className="col-md-2 border-right-1 resp-width resp-no-border resp-mrg-btm">
                                        <div className="text-center alternative-social">
                                            <h2 className="social-desc big">Or</h2>
                                        </div>
                                    </div>
                                    <div className="col-md-2 border-right-1 resp-width-1 resp-width-5">
                                        <div className="text-center social-link">
                                            <i class="fas fa-envelope"></i>
                                            <h2 className="social-desc">Email</h2>
                                        </div>
                                    </div>
                                    <div className="col-md-2 border-right-1 resp-width-1 resp-width-5">
                                        <div className="text-center social-link">
                                        <i class="fab fa-whatsapp"></i>
                                            <h2 className="social-desc">WhatsApp</h2>
                                        </div>
                                    </div>
                                    <div className="col-md-2 border-right-1 resp-width-1 resp-width-5">
                                        <div className="text-center social-link">
                                        <i class="fab fa-facebook-square"></i>
                                            <h2 className="social-desc">Facebook</h2>
                                        </div>
                                    </div>
                                    <div className="col-md-2 border-right-1 resp-width-1 resp-width-5">
                                        <div className="text-center social-link">
                                        <i class="fab fa-twitter"></i>
                                            <h2 className="social-desc">Twitter</h2>
                                        </div>
                                    </div>
                                    <div className="col-md-2 border-right-1 resp-width-1 resp-width-5">
                                        <div className="text-center social-link">
                                        <i class="fab fa-facebook-messenger"></i>
                                            <h2 className="social-desc">Messenger</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row referal-count">
                        <div className="col-md-6 resp-width">
                            <p className="desc mt-3"><span>No of Referal</span><strong><span class="float-right">10</span></strong></p>
                            <p className="desc no-margin">Referal Earning<strong><span class="float-right">$ 1000</span></strong></p>
                        </div>
                    </div>
                </div>
                <div className="referal-sub-head">
                    <h3 className="sub-head">HOW IT WORKS</h3>
                </div>
                <div className="row pt-45">
                    <div className="col-md-4 resp-mrg-btm-1">
                        <div className="referal-box">
                            <div class="referal-icon">
                                <img
                                    src={
                                    window.location.origin + "/assets/img/share-referal.svg"
                                }
                                    alt="menu_img" className="referal-head-icon"
                                />
                            </div>
                            <div className="referal-info">
                                <h4 className="referal-info-title">Step 1</h4>
                                <p className="referal-info-desc">Share your link with friends by <br></br>copying the link, or choose an icon.</p>
                            </div>
                        </div>
                    </div>
                    <div className="referal-arrow"><i class="fas fa-chevron-right"></i></div>
                    <div className="col-md-4 resp-mrg-btm-1">
                        <div className="referal-box">
                            <div class="referal-icon">
                                <img
                                    src={
                                        window.location.origin + "/assets/img/referal-friend.svg"
                                    }
                                    alt="menu_img" className="referal-head-icon"
                                />
                            </div>
                            <div className="referal-info">
                                <h4 className="referal-info-title">Step 2</h4>
                                <p className="referal-info-desc">We'll let you know when a friend <br></br>signs up.</p>
                            </div>
                        </div>
                    </div>
                    <div className="referal-arrow-1"><i class="fas fa-chevron-right"></i></div>
                    <div className="col-md-4">
                        <div className="referal-box">
                            <div class="referal-icon">
                            <img
                            src={
                                window.location.origin + "/assets/img/message.svg"
                            }
                            alt="menu_img" className="referal-head-icon"
                        />
                            </div>
                            <div className="referal-info">
                                <h4 className="referal-info-title">Step 3</h4>
                                <p className="referal-info-desc">You can share with as many friends <br></br>and family as you like!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border-thin"></hr>
                <div className="referal-footer">
                    <a href="#"><h5 className="referal-footer-desc">Netflix Referal Program Terms and Conditions</h5></a>
                </div>
            </div>
        </div>
    );
}

export default ReferalFriend;