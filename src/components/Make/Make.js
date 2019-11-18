import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from '../Input/Input';
import Type from '../Type/Type'
import Description from '../Description/Description'


class Make extends Component {
    handleInput = (e) => {
        this.props.dispatch({ type: 'ROUTE_INPUT', payload: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch({ type: 'ADD_ROUTE', payload: this.props })

    }

    render() {
        return (
            <>
            <div>
                {/*  if we don't have a type show this */}
                <Type />

                {/* if we don't have a url show this */}
                <Input />

                {/* if we don't have a description show this */}
                <Description />
            </div>



                {/* <pre>{JSON.stringify(this.props,null,2)}</pre> */}

            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Make));