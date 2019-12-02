import React, { Component } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { connect } from 'react-redux'

class ToTextmessage extends Component {
    state = {
        value: '',
        submitted: false,
    }
    handleSubmit = () => {
        if (isValidPhoneNumber(this.state.value) === true) {
            this.props.dispatch({
                type: "ADD_PHONE_NUMBER",
                payload: {
                    poll_id: this.props.pollReducer.pollStatus.id,
                    phone_number: this.state.value
                }
            })
            this.setState({ submitted: true })
        }
    }

    render() {

        return (

            <div style={{ marginTop: '1rem' }}>
                {!this.state.submitted
                    ? <>
                        <p>Want to be alerted when the poll is over?</p>
                        <PhoneInput
                            style={{ fontSize: '100%' }}
                            placeholder="Enter phone number"
                            country="US"
                            showCountrySelect="false"
                            international="false"
                            displayInitialValueAsLocalNumber="true"
                            value={this.state.value}
                            onChange={value => this.setState({ value })} />
                        <div>
                            <br/>
                            <button onClick={this.handleSubmit} >Text Me</button>
                        </div>
                    </>
                    : <p>We'll text ya when it's done</p>}
            </div>
        );
    }

}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(ToTextmessage);