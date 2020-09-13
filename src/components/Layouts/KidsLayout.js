import React, {Component} from 'react';

import KidsHeader from './SubLayout/KidsHeader';

import KidsFooter from '../Layouts/SubLayout/KidsFooter';

class KidsLayout extends Component {

    // constructor(props) {

    //     super(props);

    // }


    render() {

        return (
            <div className="white-wrapper">
               <KidsHeader />
               {React.cloneElement(this.props.children, {eventEmitter : this.eventEmitter})}
               <KidsFooter />
            </div>
        )
    }
}
export default KidsLayout;

