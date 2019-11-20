import React, { Component } from 'react'
import { connect } from 'react-redux'

class Minutes extends Component {

    componentDidMount() {
        this.interval = setInterval(() => {
            this.props.dispatch({
                type: 'FETCH_STATUS',
                payload: { url: this.props.route }
            })
            this.props.dispatch({
                type: 'GET_IDEA_LIST',
                payload: { id: this.props.pollReducer.pollStatus.id }
            })
            this.props.pollReducer.pollStatus.voting_period === true 
            && this.props.voteReducer.voteNeedsToBeInit === true
            && this.props.dispatch({type:"INIT_BALLOT", payload: this.props.ideaReducer.ideaList}) 
                
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {

        return (
            <table>
                <tbody>
                    <tr>
                        <td>Are we in the idea collection period?</td>
                        <td>{this.props.pollReducer.pollStatus.collection_period ?
                            <p>yes</p> : <p>no</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>Are we in the voting period?</td>
                        <td>{this.props.pollReducer.pollStatus.voting_period ?
                            <p>yes</p> : <p>no</p>}
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

