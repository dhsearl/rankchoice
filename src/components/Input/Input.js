import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button } from 'semantic-ui-react'

class Input extends Component {

    handleInput = (e) => {
        this.props.dispatch({ 
            type: 'URL_INPUT', 
            payload: { 
                key: "url", 
                value: e.target.value 
            } })

    }
    handleSubmit = (e) => {
        e.preventDefault();
        // check that they've put in information
        // urlTaken validates the chosen url
        this.props.pollReducer.setup.description &&
        this.props.pollReducer.setup.url &&
        !this.props.pollReducer.urlTaken &&
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
            <div className="centered">
                <form onSubmit={this.handleSubmit}>
                    <h3>Choose a custom Url{this.props.pollReducer.urlTaken && this.props.pollReducer.setup.url.length > 1 ? "- url taken" : ''}</h3>
                    <TextField
                        label="http://rankchoice.io/#/"
                        margin="normal"
                        placeholder="pick-your-path"
                        value={this.props.pollReducer.setup.url}
                        onChange={this.handleInput}
                        style={{ width: '100%', marginTop: '0', }}
                        inputProps={{style: {fontSize: 16}}} // font size of input text
                        InputLabelProps={{style: {fontSize: 14}}} // font size of input label
                    />
                    <div>
                        <Button fluid onClick={this.handleSubmit} >Start Poll</Button>
                    </div>
                </form>
            </div>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Input));

