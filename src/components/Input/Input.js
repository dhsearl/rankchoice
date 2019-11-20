import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Input extends Component {
    handleInput = (e) =>{
        this.props.dispatch({type:'URL_INPUT', payload: {key:"url", value: e.target.value} })
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.dispatch({type:'ADD_ROUTE', payload: this.props})

    }

    render() {
        return (
            <>
            <div className="centered">
                <form onSubmit={this.handleSubmit}>

                <input type="text" 
                className="inputDarkMode"
                placeholder="desired-url"
                value={this.props.pollReducer.setup.url} 
                onChange={this.handleInput} />
                
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

