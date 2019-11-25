import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from '@material-ui/core'
import './Winner.css'

class Winner extends Component {

    render() {
        return (
            <>
                {this.props.winner.idea_text ?
                <div><h1>A: {this.props.winner.idea_text}</h1></div>
                : <div><h3>No votes recoreded. Try Again</h3></div>
                }
                <Link to="/make" className="nav-link centered" ><Button className="makeButton" style={{width:'100%'}} ><h1>New Poll</h1></Button></Link>
                

            </>
        )
    }
}
export default Winner;

