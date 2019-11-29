import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import IdeaBox from '../IdeaBox/IdeaBox.js';
import { Button} from 'semantic-ui-react'

class Ideas extends Component {
    // Clean up old votes
    // Get Full Idea List for the first time
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

    render() {
        return (
            <>
                {/* Idea Input */}
                <div className="centered">
                
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            style={{ width: '100%',fontSize:'100%' }}
                            id="outlined-multiline-static"
                            label="Enter Idea"
                            rows="1"
                            onChange={this.handleInput}
                            value={this.props.ideaReducer.idea.idea_text}
                            margin="normal"
                        />
                        {/* Maybe text align center Maybe only show if on mobile */}
                        <Button
                        className="addIdeaBox"
                        type="submit"
                        onClick={this.handleSubmit}
                        style={{ textAlign: 'left', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
                        fluid
                    >ADD IDEA</Button>
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

