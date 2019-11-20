import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Ideas extends Component {
    componentDidMount() {
        // this.props.pollReducer.pollStatus.voting_period === true
        //     && this.props.voteReducer.voteNeedsToBeInit === true
        //     && this.props.dispatch({ type: "INIT_BALLOT", payload: this.props.ideaReducer.ideaList })
    }

    handleRank = (event) => {
        console.log("in handle rank with", event.target.value, " idea_id",event.target.name)
        this.props.dispatch({ type: "VOTE", payload: { idea_id: event.target.name, value: Number(event.target.value) } })
    }
    handleSubmit = () =>{
        this.props.dispatch({type: "LOCK_VOTE_IN", payload:{
            poll_id: this.props.pollReducer.pollStatus.id,
            voter_id: localStorage.id,
            votes: this.props.voteReducer.voteInstance
        }})
    }
    render() {
        return (
            <>

                {/* VOTING TIME */}
                {/* IF it is the voting period
                    If vote hasn't been initilized
                    Then init_ballot */}
                {this.props.pollReducer.pollStatus.voting_period
                    && Object.keys(this.props.voteReducer.voteInstance).length !== 0
                    &&

                    <>
                        <div>Time to vote</div>
                        {this.props.ideaReducer.ideaList.map(eachIdea =>

                            <div><p>{eachIdea.idea_text}</p>
                                <input type="number"
                                    name={String(eachIdea.id)}
                                    onChange={this.handleRank}
                                    value={this.props.voteReducer.voteInstance[ String(eachIdea.id)]}
                                />
                            </div>
                        )}
                        <button onClick={this.handleSubmit}>Lock Votes In</button>
                    </>
                }

            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Ideas));

