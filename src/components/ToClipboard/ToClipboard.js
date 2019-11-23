import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import Clipboard from 'clipboard'

class ToClipboard extends Component {
    state = {
        copySuccess: '',
    }
    componentDidMount() {
        const clipboard = new Clipboard(this.refs.button, {
            text: function () {
                return window.location.href;
            }
        });
    }
    componentWillUnmount() {
        this.clipboard.destroy()
    }

    render() {

        return (

            <div>
                {Clipboard.isSupported() &&
                    <div>
                        
                        <Button ref="button"
                            onClick={() => this.setState({ copySuccess:"?  done." })}>
                            Copy to Clipboard {this.state.copySuccess}
                            </Button>
                        
                    </div>
                }

            </div>
        );
    }

}

export default ToClipboard;