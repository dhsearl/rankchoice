import React, {Component} from 'react'
import {connect} from 'react-redux'

class Minutes extends Component {

    componentDidMount() {
        this.interval = setInterval(() => 
        this.props.dispatch({
            type: 'FETCH_STATUS',
            payload: { url: this.props.route }
        }), 1000);
        }
        componentWillUnmount() {
        clearInterval(this.interval);
        }
    render() {
        
        return (
            <table>
                <tbody>
                    <tr>
                        <td>Has 1 minute passed?</td>
                        <td>{this.props.pollStatus.step_one ?
                        <p>yes</p>:<p>no</p> }
                        </td>
                    </tr>
                    <tr>
                        <td>Has 2 minutes passed?</td>
                        <td>{this.props.pollStatus.step_two ?
                        <p>yes</p>:<p>no</p> }
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
    
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(Minutes);

