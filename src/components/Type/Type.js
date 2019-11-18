import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Type extends Component {
    handleInput = (e) =>{
        this.props.dispatch({type:'POLL_INPUT', payload: {key:"type", value: e.target.value} })
    }
    // handleSubmit = (e)=>{
    //     e.preventDefault();
    //     this.props.dispatch({type:'ADD_ROUTE', payload: this.props})

    // }

    render() {
        return (
            <>
            <div className="centered">
            <select 
            onChange={this.handleInput} 
            value={this.props.pollReducer.setup.type}>
                <option default value="general">General</option>
                <option disabled value="food">Food</option>
                <option disabled value="movie">Movie</option>
            </select></div>
              </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Type));
