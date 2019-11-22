import React, { Component } from 'react'
import {Button} from '@material-ui/core'

class ToClipboard extends Component {
    state = {
        copySuccess : '',
    }
    // copyToClipboard = (e) => {
    //     this.textArea.select();
    //     document.execCommand('copy');
    //     // This is just personal preference.
    //     // I prefer to not show the the whole text area selected.
    //     e.target.focus();
    //     this.setState({ copySuccess: ' Copied!' });
    // };
    // handleCopy = (e) => {
    //     let url = `localhost:3000/#/${this.props.poll_name}`
    //     e.preventDefault();
    //     e.clipboardData.setData('text/plain', url);
    //     this.setState({ copySuccess: ' Copied!' });
    // }
    render() {
        
        return (

            <div>
                {document.queryCommandSupported('copy') &&
                    <div>
                        <Button onClick={() => {navigator.clipboard.writeText(`localhost:3000/#/${this.props.poll_name}`)}}>Copy link to clipboard{this.state.copySuccess}</Button>
                        
                    </div>
                }
                {/* <form>
                    <textarea
                        ref={(textarea) => this.textArea = textarea}
                        value={`localhost:3000/#/${this.props.poll_name}`}
                        style={{ width: '100%' }}
                    />
                </form> */}
            </div>
        );
    }

}

export default ToClipboard;