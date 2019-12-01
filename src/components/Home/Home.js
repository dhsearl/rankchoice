import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button} from '@material-ui/core'
import IntroParagraph from '../IntroParagraph/IntroParagraph'
// import { Button } from 'semantic-ui-react'
class Home extends Component {
    createButton =()=> {
        // let history = useHistory();
        this.props.history.push("/make");
        // function handleClick() {
          
        // }
    }
    gotoFAQ =()=> {
        // let history = useHistory();
        this.props.history.push("/faq");
        // function handleClick() {
          
        // }
    }
    render() {
        return (
           
        // <div className="centered">
            
            <p>
            {/* <Button style={{border:'0',shad}} basic fluid onClick={this.createButton}><h1>Make Poll</h1></Button> */}
                <IntroParagraph />
                <Button className="makeButton" style={{width:'100%'}} onClick={this.createButton}><h1>Make Poll</h1></Button>
                <Button className="makeButton" style={{width:'100%'}} onClick={this.gotoFAQ}><h1>FAQ</h1></Button>

            </p>
            
        // </div>
          
        );
    }
}

export default withRouter(Home);