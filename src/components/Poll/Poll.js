import React, { Component } from 'react'
import { connect } from 'react-redux'
import Countdown from '../Countdown/Countdown'
import Minutes from '../Minutes/Minutes'
import Ideas from '../Ideas/Ideas'
import Vote from '../Vote/DragVote'
import Winner from '../Winner/Winner'
import ToClipboard from '../ToClipboard/ToClipboard'

class Poll extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_STATUS',
            payload: { url: this.props.match.params.route }
        })
    }


    render() {
        const poll_name = this.props.match.params.route;

        return (
            <>
                <div>
                    {!this.props.pollReducer.pollStatus.complete &&
                        <>
                            <Countdown time={this.props.pollReducer.pollStatus.created_at} />
                            <h3>{poll_name}</h3>
                            <p>One minute to suggest ideas, <br />One minute to vote</p>
                        </>
                    }

                    {this.props.pollReducer.pollStatus.question &&
                        <h1>Q: {this.props.pollReducer.pollStatus.question}</h1>}

                    {this.props.pollReducer.pollStatus.collection_period &&
                        !this.props.pollReducer.pollStatus.complete &&
                        <Ideas route={this.props.match.params.route} />}

                    {this.props.pollReducer.pollStatus.voting_period &&
                        !this.props.pollReducer.pollStatus.complete &&
                        Object.keys(this.props.voteReducer.voteInstance).length !== 0 &&
                        <Vote />}

                    {this.props.pollReducer.pollStatus.complete &&
                        this.props.voteReducer.winner.idea_text &&
                        <Winner winner={this.props.voteReducer.winner.idea_text} />}
                    <ToClipboard poll_name={poll_name} />
                    <Minutes route={this.props.match.params.route} />

                </div>
            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(Poll);

