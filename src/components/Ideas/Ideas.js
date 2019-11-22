import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'


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
                        // placeholder="The question here will be seen by all voters"
                        // multiline
                        rows="1"
                        onChange={this.handleInput}
                        value={this.props.ideaReducer.idea.idea_text}
                        margin="normal"
                        // variant="outlined"
                    />
                    </form>
                        {/* <input type="text"
                            className="inputDarkMode"
                            value={this.props.ideaReducer.idea.idea_text}
                            onChange={this.handleInput} /> */}
                    
                </div>
                {/* Idea List */}
                <div className="centered">
                    {this.props.ideaReducer.ideaList.map(eachIdea =>
                        <div className="ideaBlock" key={eachIdea.id}>{eachIdea.idea_text}
                            {eachIdea.created_by === localStorage.id && <>
                            <button onClick={() => this.handleEdit(eachIdea.id)}> edit </button>
                            <button onClick={() => this.handleDelete(eachIdea.id)}> delete </button></>}

                        </div>
                    )}
                </div>
            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Ideas));

