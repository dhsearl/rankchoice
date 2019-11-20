import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Vote from '../Vote/Vote'


class Ideas extends Component {

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
                <Vote />
            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Ideas));

