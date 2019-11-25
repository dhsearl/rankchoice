import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import IdeaBox from '../IdeaBox/IdeaBox.js';

class Ideas extends Component {
    componentDidMount() {
        this.props.dispatch({ type: "CLEAR_VOTE_INSTANCE" });
        this.props.dispatch({type:"CLEAR_WINNER"})
        this.props.dispatch({type:"GET_FULL_IDEA_LIST",payload: { id: this.props.pollReducer.pollStatus.id }})
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
    handleEdit = (id) => {
        this.props.dispatch({ type: 'DELETE_IDEA', payload: { voter_id: localStorage.id, idea_id: id } })
    }
    render() {
        return (
            <>
                {/* Idea Input */}
                <div className="centered">
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            style={{ width: '100%' }}
                            id="outlined-multiline-static"
                            label="Enter Idea"
                            rows="1"
                            onChange={this.handleInput}
                            value={this.props.ideaReducer.idea.idea_text}
                            margin="normal"
                        />
                    </form>
                </div>

                {/* Idea List */}
                {this.props.ideaReducer.ideaList.length > 0 && this.props.ideaReducer.ideaList[0] &&
                    <div className="ideaGallery" style={{ width: '100%' }}>
                        {this.props.ideaReducer.ideaList.map((eachIdea,i) =>
                            <IdeaBox index={i} idea={eachIdea} key={eachIdea.id} />
                        )}
                    </div>}
            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Ideas));

