import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button} from '@material-ui/core'

class Home extends Component {
    createButton =()=> {
        // let history = useHistory();
        this.props.history.push("/make");
        // function handleClick() {
          
        // }
    }
    render() {
        return (
           
        <div>
            <div>
            <p>
                
                <Button className="makeButton" onClick={this.createButton}><h1>Make Poll</h1></Button>
            </p>
            </div>
        </div>
          
        );
    }
}

export default withRouter(Home);