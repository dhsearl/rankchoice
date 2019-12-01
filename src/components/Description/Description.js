import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'

// Input of General Poll Question / description
class Description extends Component {
    handleInput = (e) => {
        this.props.dispatch({ type: 'POLL_INPUT', 
        payload: { key: "description", value: e.target.value } })
    }


    render() {
        return (
            <>
                <div className="centered">
                <h3>Ask your question</h3>
                    <TextField
                        
                        id="outlined-multiline-static"
                        label="The question is"
                        placeholder="The question here will be seen by all voters"
                        multiline
                        rows="4"
                        onChange={this.handleInput}
                        value={this.props.pollReducer.setup.description}
                        margin="normal"
                        variant="outlined"
                        style={{ width: '100%' }}
                        inputProps={{style: {fontSize: 16}}} // font size of input text
                        InputLabelProps={{style: {fontSize: 14}}} // font size of input label
                    />
                </div>

            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(Description);
