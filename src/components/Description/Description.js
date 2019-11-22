import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
// Input of General Poll Question / description
class Description extends Component {
    handleInput = (e) => {
        this.props.dispatch({ type: 'POLL_INPUT', payload: { key: "description", value: e.target.value } })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch({
            type: 'ADD_ROUTE',
            payload: {
                poll: this.props.pollReducer.setup,
                history: this.props.history
            }
        })

    }

    render() {
        return (
            <>
                <div className="centered">
                    {/* <textarea
                        className="generalDescription inputDarkMode"
                        placeholder="The question here will be seen by all voters"
                        onChange={this.handleInput}
                        value={this.props.pollReducer.setup.description}
                    /> */}
                    <TextField
                        style={{ width: '100%' }}
                        id="outlined-multiline-static"
                        label="Lets vote on"
                        placeholder="The question here will be seen by all voters"
                        multiline
                        rows="4"
                        onChange={this.handleInput}
                        value={this.props.pollReducer.setup.description}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div className="centered">
                    <Button onClick={this.handleSubmit} >Start Poll</Button>
                </div>
            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Description));
