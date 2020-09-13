import React, {Component} from 'react';

import {Link} from 'react-router-dom';

class HomeBanner extends Component {

    // constructor(props) {

    //     super(props);

    // }   

    componentDidMount() {

    }

    render() {

        return (
            <div>
                <div className="banner-sec">
            
                    <div className="banner-home-anothertype relative">
                        <img className="banner_right_img" src="assets/img/slider-img1.jpg"
                        srcSet="assets/img/slider-img1.jpg 1x,
                                assets/img/slider-img1.jpg 1.5x,
                                assets/img/slider-img1.jpg 2x" alt="banner img" />
                        <div className="banner_overlay">
                            <div className="width-30">
                                <h1 className="banner_video_title">troll hunters</h1>
                                <h4 className="banner_video_text">an ordinary teen. An ancient relic pulled from the rubble. And an underground civilization that needs a hero.An ordinary teen. An ancient relic pulled from the rubble. And an underground civilization that needs a hero.</h4>
                                <div className="banner-btn-sec">
                                    <Link to="#" className="btn btn-grey"><i className="fas fa-play mr-2"></i>play</Link>
                                    <Link to="#" className="btn btn-grey"><i className="fas fa-plus mr-2"></i>my list</Link>
                                </div>
                            </div>
                        </div>
                    </div>   
                    
                    {/* <div className="banner-content">
                        <div className="banner-text-centeralign">
                            <div>
                                <h1 className="banner_video_title">troll hunters</h1>
                                <h4 className="banner_video_text">an ordinary teen. An ancient relic pulled from the rubble. And an underground civilization that needs a hero.An ordinary teen. An ancient relic pulled from the rubble. And an underground civilization that needs a hero.</h4>
                                <div className="banner-btn-sec">
                                    <Link to="#" className="btn btn-grey"><i className="fas fa-play mr-2"></i>play</Link>
                                    <Link to="#" className="btn btn-grey"><i className="fas fa-plus mr-2"></i>my list</Link>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                
            </div>
        );

    }

}


export default HomeBanner;

