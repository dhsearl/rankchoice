import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TextField} from '@material-ui/core'
// import EditSharpIcon from '@material-ui/icons/EditSharp';
// import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import { Button, Segment, Icon } from 'semantic-ui-react'

class Ideas extends Component {
    componentDidMount(){
        this.props.dispatch({type:"CLEAR_VOTE_INSTANCE"});

    }
    handleInput = (e) => {
        this.props.dispatch({ type: 'IDEA_INPUT', payload: { key: "idea_text", value: e.target.value, url: this.props.route } })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch({ type: 'ADD_IDEA', payload: this.props.ideaReducer.idea })
        this.props.dispatch({ type: 'RESET_IDEA' });
    }
    handleDelete = (id) => {
        this.props.dispatch({ type: 'DELETE_IDEA', payload: { voter_id: localStorage.id, idea_id: id } })
    }
    handleEdit = (id) => {
        this.props.dispatch({ type: 'DELETE_IDEA', payload: { voter_id: localStorage.id, idea_id: id } })
    }
    render() {
        return (
            <>
                {/* Idea Input */}
                <div className="centered">
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            style={{ width: '100%' }}
                            id="outlined-multiline-static"
                            label="Enter Idea"
                            rows="1"
                            onChange={this.handleInput}
                            value={this.props.ideaReducer.idea.idea_text}
                            margin="normal"
                        />
                    </form>
                </div>

                {/* Idea List */}
                {this.props.ideaReducer.ideaList.length >0 &&

                <div className="ideaGallery" style={{ width: '100%' }}>
                    {this.props.ideaReducer.ideaList.map(eachIdea =>
                        <Segment raised className="ideaContainer" key={eachIdea.id}>{eachIdea.idea_text}
                            {eachIdea.created_by === localStorage.id && <>
                                <Button.Group icon className="ideaButton" floated='right'>
                                    <Button basic><Icon  name="edit outline"/></Button>
                                    <Button basic onClick={() => this.handleDelete(eachIdea.id)}>
                                        <Icon  color="red" name="delete"/></Button>
                                </Button.Group>
                                </>
                                }
        
                        </Segment>
                    )}
                </div>}
            </>
                );
            }
        }
const mapReduxStateToProps = (reduxState) => {
    return reduxState
            }
            export default withRouter(connect(mapReduxStateToProps)(Ideas));
            
