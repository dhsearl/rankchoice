import React, { Component } from 'react';
import { connect } from 'react-redux';
import Countdown from '../Countdown/Countdown';
import Minutes from '../Minutes/Minutes'



class Poll extends Component {
    // handleShouldRerenderChild() {
    //     console.log('Called shouldComponentRerender');
    //     return true;
    // }

    // handleChildDidRerender() {
    //     console.log('Called componentDidRerender');
    // }
    // componentDidMount() {
    //     this.props.dispatch({
    //         type: 'FETCH_STATUS',
    //         payload: { url: this.props.match.params.route }
    //     })

    // }
    render() {
        const poll_name = this.props.match.params.route;
        return (
            <>
                <div>
                    {/* <Countdown time={this.props.pollStatus.created_at}/> */}
                    <h1>I'm a poll</h1>
                  <h3>{poll_name}</h3>
            
                {/* <Minutes route = {this.props.match.params.route}/> */}
 
                </div>
            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(Poll);

