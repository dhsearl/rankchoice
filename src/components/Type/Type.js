import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
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
            <div className="centered" style={{width:'370px',minHeight:'140px',marginBottom:'1rem'}}>
                <h3>Pick a voting method</h3>
                <Button 
                variant="contained"
                onClick={this.handleRCV}
                style={this.state.rcv 
                    ? {backgroundColor:'var(--nord3)',color:'var(--nord13)',float:'left', width:'50%', marginLeft:'-4px'} 
                    : {backgroundColor:'var(--nord3)',color:'var(--nord0)',float:'left',width:'50%', marginLeft:'-4px'}}
                >Big Group</Button>
                <Button 
                variant="contained"
                onClick={this.handleBorda}
                style={this.state.rcv 
                    ? {backgroundColor:'var(--nord3)',color:'var(--nord0)',float:'right',width:'50%'} 
                    : {backgroundColor:'var(--nord3)',color:'var(--nord13)',float:'right',width:'50%'}}
                >Small Group</Button>
                <div className="centered">
                {this.state.rcv ? <p>Ranked-Choice Voting. Good for large groups.<br/><a href="http://rankchoice.io/#/faq" >Learn more</a></p>
                : <p>Borda Count Positional voting. Good for small-medium sized groups.<br/><a href="http://rankchoice.io/#/faq" >Learn more</a></p>}</div>
            </div>
              </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Type));
