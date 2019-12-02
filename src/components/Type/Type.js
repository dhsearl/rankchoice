import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
// import { HashLink as Link } from 'react-router-hash-link';
import {Button} from '@material-ui/core'
class Type extends Component {
    state = {
        rcv:true,
    }
    handleRCV = (e) =>{
        this.setState({rcv:true})
        this.props.dispatch({type:'POLL_INPUT', payload: {key:"type", value: 'general'} })
    }    
    handleBorda = (e) =>{
        this.setState({rcv:false})
        this.props.dispatch({type:'POLL_INPUT', payload: {key:"type", value: 'weighted'} })
    }

    render() {
        return (
            <>
            <div className="centered addIdeaBox height-150">
                <h3>Pick a voting method</h3>
                <div className="button-box">
                <Button 
                variant="contained"
                onClick={this.handleRCV}
                style={this.state.rcv 
                    ? {backgroundColor:'var(--nord3)',color:'var(--nord13)', width:'47%'} 
                    : {backgroundColor:'var(--nord3)',color:'var(--nord0)',width:'47%'}}
                >Big Group</Button>
                <Button 
                variant="contained"
                onClick={this.handleBorda}
                style={this.state.rcv 
                    ? {backgroundColor:'var(--nord3)',color:'var(--nord0)',width:'47%'} 
                    : {backgroundColor:'var(--nord3)',color:'var(--nord13)',width:'47%' }}
                >Small Group</Button></div>
                <div className="centered">
                {this.state.rcv ? <p>Ranked-Choice Voting. Good for large groups.<br/><Link to="/faq">Learn more</Link></p>
                : <p>Borda Count Positional voting. Good for small-medium sized groups.<br/><Link to="/faq">Learn more</Link></p>}</div>
            </div>
              </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Type));
