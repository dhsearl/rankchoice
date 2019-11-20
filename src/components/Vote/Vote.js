import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Ideas extends Component {
    componentDidMount() {
        this.props.pollReducer.pollStatus.voting_period === true
            && this.props.voteReducer.voteNeedsToBeInit === true
            && this.props.dispatch({ type: "INIT_BALLOT", payload: this.props.ideaReducer.ideaList })
    }
    state ={
        
    }
    handleInput = (e) => {
        this.props.dispatch({ type: 'IDEA_INPUT', payload: { key: "idea_text", value: e.target.value, url: this.props.route } })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch({ type: 'ADD_IDEA', payload: this.props.ideaReducer.idea })
        this.props.dispatch({ type: 'RESET_IDEA' });
    }
    handleDelete = (id) => {
        this.props.dispatch({ type: 'DELETE_IDEA', payload: { voter_id: localStorage.id, idea_id: id } })
    }
    handleRank = (event) => {
        console.log("in handle rank with", event.target.value, " idea_id",event.target.name)
        this.props.dispatch({ type: "VOTE", payload: { idea_id: event.target.name, value: event.target.value } })
    }
    render() {
        return (
            <>
                {this.props.pollReducer.pollStatus.collection_period &&
                    <>
                        {/* Idea Input */}
                        <div className="centered">
                            <form onSubmit={this.handleSubmit}>
                                <input type="text"
                                    className="inputDarkMode"
                                    value={this.props.ideaReducer.idea.idea_text}
                                    onChange={this.handleInput} />
                            </form>
                        </div>
                        {/* Idea List */}
                        <div className="centered">
                            {this.props.ideaReducer.ideaList.map(eachIdea =>
                                <div key={eachIdea.id}><p>{eachIdea.idea_text}</p>
                                    {eachIdea.created_by === localStorage.id &&
                                        <button onClick={() => this.handleDelete(eachIdea.id)}> delete </button>}
                                </div>
                            )}
                        </div>
                    </>
                }
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

