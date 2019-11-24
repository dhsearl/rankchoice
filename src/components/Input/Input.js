import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Button } from 'semantic-ui-react'
class Input extends Component {
    handleInput = (e) => {
        this.props.dispatch({ type: 'URL_INPUT', payload: { key: "url", value: e.target.value } })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch({
            type: 'ADD_ROUTE',
            payload: {
                poll: this.props.pollReducer.setup,
                history: this.props.history
            }
        })}

    render() {
        return (
            <>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h3>Poll Url</h3>
                        <TextField
                            label="url: rankchoice.io/#/"
                            margin="normal"
                            value={this.props.pollReducer.setup.url}
                            onChange={this.handleInput}
                            style={{ width: '100%', marginTop:'0' }}
                        />
                        <div className="centered">
                            <Button fluid onClick={this.handleSubmit} >Start Poll</Button>
                        </div>


                        {/* <input type="text" 
                className="inputDarkMode"
                placeholder="desired-url"
                value={this.props.pollReducer.setup.url} 
                onChange={this.handleInput} /> */}

                    </form>
                </div>

            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Input));

