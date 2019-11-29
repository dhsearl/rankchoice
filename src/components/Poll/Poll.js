import React, { Component } from 'react'
import { connect } from 'react-redux'
import Countdown from '../Countdown/Countdown'
// import Minutes from '../Minutes/Minutes'
import Ideas from '../Ideas/Ideas'
import Vote from '../Vote/DragVote'
import Winner from '../Winner/Winner'
import ToClipboard from '../ToClipboard/ToClipboard'

class Poll extends Component {

    componentDidMount() {
        this.props.pollReducer.pollStatus.collection_period &&
            this.props.dispatch({ type: "CLEAR_WINNER" })

        this.props.dispatch({
            type: 'FETCH_STATUS',
            payload: { url: this.props.match.params.route }
        })
    
    }

    componentWillUnmount() {
        this.props.dispatch({ type: "CLEAR_WINNER" })
        this.props.dispatch({ type: 'CLEAR_STATUS' })
        this.props.dispatch({ type: "CLEAR_VOTE_INSTANCE" })
        this.props.dispatch({type:"RESET_INIT"})
        this.props.dispatch({ type: "WAITING_MODE", payload: false })
    }

    render() {
        const poll_name = this.props.match.params.route;

        return (
            <>
                <div className="centered">



                    <Countdown route={poll_name} time={this.props.pollReducer.pollStatus.created_at} />
                    {/* <h3>{poll_name}</h3> */}
                    <ToClipboard poll_name={poll_name} />



                    {this.props.pollReducer.pollStatus.question &&
                        <h1>Q: {this.props.pollReducer.pollStatus.question}</h1>}

                    {this.props.pollReducer.pollStatus.collection_period &&
                        !this.props.pollReducer.pollStatus.complete &&
                        <Ideas route={poll_name} />}

                    {this.props.pollReducer.pollStatus.voting_period &&
                        !this.props.pollReducer.pollStatus.complete &&
                        this.props.voteReducer.voteInstance &&
                        !this.props.pollReducer.waitingModeReducer &&
                        <Vote />}

                    {this.props.pollReducer.waitingModeReducer &&
                        !this.props.voteReducer.winner.idea_text &&
                        <h1>WAITING FOR ANSWER</h1>}


                    {!this.props.pollReducer.waitingModeReducer &&
                        this.props.voteReducer.winner.idea_text &&
                        <Winner winner={this.props.voteReducer.winner} />}

                </div>
            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(Poll);

