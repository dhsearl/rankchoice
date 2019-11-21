import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class DebugBar extends Component {
    handleVoteMode = () => {
        this.props.dispatch({ type: 'FLIP_VOTE', payload: this.props.pollReducer.pollStatus.id })
    }
    handleCollectMode = () => {
        this.props.dispatch({ type: 'FLIP_COLLECT', payload: this.props.pollReducer.pollStatus.id })
    }
    handleRankMode = () => {
        this.props.dispatch({ type: 'FLIP_INIT' })
    }
    handleWinnerMode = () => {
        this.props.dispatch({ type: 'CALC_WINNER', payload: this.props.pollReducer.pollStatus.id })
    }
    render() {
        return (
            <>
                <div>
                    <h3>In Debug Mode</h3>
                    <button onClick={this.handleCollectMode}>Collect Mode</button>
                    <button onClick={this.handleVoteMode}>Vote Mode</button>
                    <button onClick={this.handleRankMode}>Rank Mode</button>
                    <button onClick={this.handleWinnerMode}>Decide Winner</button>
                </div>
            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(DebugBar));