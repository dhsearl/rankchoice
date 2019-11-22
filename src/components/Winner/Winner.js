import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from '@material-ui/core'
import './Winner.css'

class Winner extends Component {
    render() {
        return (
            <>
                <div><h1>A: {this.props.winner}</h1></div>
                <Link to="/make" className="nav-link centered" ><Button><h1>New Poll</h1></Button></Link>
            </>
        )
    }
}
export default Winner;

