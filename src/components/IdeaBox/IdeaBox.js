import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react'

class IdeaBox extends Component {
    state = {
        edit: false,
    }

    handleChange = (e) => {
        this.props.dispatch({ type: 'EDIT_IN_LIST', payload: { index: this.props.index, value: e.target.value } })
    }

    handleDelete = (id) => {
        this.props.dispatch({ type: 'DELETE_IDEA', payload: { voter_id: localStorage.id, idea_id: id, poll_id: this.props.pollReducer.pollStatus.id } })
    }

    handleEditSubmit = (id) => {
        this.props.dispatch({ type: 'SUBTRACT_EDIT_NUMBER' })
        this.setState({ edit: false })
        this.props.dispatch({ type: 'UPDATE_IDEA', payload: { voter_id: localStorage.id, id: id, newText: this.props.idea.idea_text, poll_id: this.props.pollReducer.pollStatus.id } })
    }
    handleEditMode = () => {
        this.props.dispatch({ type: 'ADD_EDIT_NUMBER' })
        this.setState({ edit: true })
    }
    render() {
        const idea = this.props.idea

        return (



            <div raised className="ideaContainer" key={idea.id}>
                {this.state.edit ?
                    <form onSubmit={() => this.handleEditSubmit(idea.id)} style={{ display: 'inline' }}>
                        <input style={{ width: '280px', fontSize:'16px',color:'var(--nord0)', backgroundColor:'var(--nord6)' }} type="text" value={idea.idea_text} onChange={this.handleChange} />
                    </form>
                    : <>{idea.idea_text}</>}

                {idea.created_by === localStorage.id &&
                    <>
                        {this.state.edit ?
                            <Button.Group icon className="ideaButton" floated='right'>
                                <Button className="saveButton" style={{color:'#a3be8c'}} basic onClick={() => this.handleEditSubmit(idea.id)}><Icon style={{color:'#a3be8c'}} name="save outline" className="saveButton"/></Button>
                            </Button.Group> :
                            <Button.Group icon className="ideaButton" floated='right'>
                                <Button basic onClick={this.handleEditMode}><Icon name="edit outline" /></Button>
                                <Button basic onClick={() => this.handleDelete(idea.id)}>
                                    <Icon style={{color:'#bf616a'}} name="delete" /></Button>
                            </Button.Group>}
                    </>
                }
            </div>

        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(IdeaBox);


