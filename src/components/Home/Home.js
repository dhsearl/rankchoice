import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


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
                HOME
                <button onClick={this.createButton}>Make Poll</button>
            </p>
            </div>
        </div>
          
        );
    }
}

export default withRouter(Home);