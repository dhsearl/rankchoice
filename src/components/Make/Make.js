import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from '../Input/Input';
import Type from '../Type/Type'
import Description from '../Description/Description'


class Make extends Component {
    componentDidMount(){
        // clear idea reducer
        // init vote
        this.props.dispatch({type:"CLEAR_IDEA_LIST"})
        this.props.dispatch({type:"RESET_INIT"})
    }
    render() {
        return (
            <>
                <div>
                    {/*  if we don't have a type show this */}
                    <Type />

                    {/* if we don't have a description show this */}
                    <Description />

                    {/* if we don't have a url show this */}
                    <Input />
                </div>
            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Make));