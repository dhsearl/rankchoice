import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Ideas extends Component {
    handleInput = (e) =>{
        this.props.dispatch({type:'IDEA_INPUT', payload: {key:"idea_text", value: e.target.value, url: this.props.route} })
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.dispatch({type:'ADD_IDEA', payload: this.props.ideaReducer.idea})
    }

    render() {
        return (
            <>
            <div className="centered">

                <form onSubmit={this.handleSubmit}>

                <input type="text" 
                className="inputDarkMode"
                value={this.props.ideaReducer.idea.idea_text} 
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
export default withRouter(connect(mapReduxStateToProps)(Ideas));

