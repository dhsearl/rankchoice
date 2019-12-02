import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Dimmer } from 'semantic-ui-react'
import ToTextmessage from '../ToTextmessage/ToTextmessage';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    width: '100%',
    // change background colour if dragging
    // background: isDragging ? "grey" : "white",
    background: isDragging ? '#2E3440' : '#2E3440',
    // styles we need to apply on draggables
    ...draggableStyle
});
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#D8DEE9" : "#D08770",
    padding: grid,
    width: '100%',
});

class Vote extends Component {
    state = { active:false, message:'Click to Lock Vote'}

    handleFlip = () => {
        if (this.state.message ==="Click to Lock Vote") this.setState({message:'Change Vote'})
        else this.setState({message:'Click to Lock Vote'})

        this.setState({ active: !this.state.active })
    }
  
    handleSubmit = () => {
        
        !this.state.active && this.props.dispatch({
            type: "LOCK_VOTE_IN", payload: {
                poll_id: this.props.pollReducer.pollStatus.id,
                voter_id: localStorage.id,
                votes: this.props.voteReducer.voteInstance
            }
        })
        this.handleFlip();
    }
    componentDidMount() {
        this.props.voteReducer.voteInstance.length === 0 &&
            this.props.dispatch({
                type: 'LATE_COMER',
                payload: {
                    id: this.props.pollReducer.pollStatus.id,
                    ideaList: this.props.ideaReducer.ideaList
                }
            })
    }
    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newItems = reorder(
            this.props.voteReducer.voteInstance,
            result.source.index,
            result.destination.index
        );
        this.props.dispatch({ type: "SET_ITEM_RANKS", payload: newItems })

    }
    render() {

        return (
            <>


                <>
                    <Button
                    className="addIdeaBox"
                        onClick={this.handleSubmit}
                        style={{ textAlign: 'left', borderBottomLeftRadius: "0", borderBottomRightRadius: "0" }}
                        fluid
                    >{this.state.message}</Button>
                    <div className="addIdeaBox">
                        <Dimmer.Dimmable dimmed={this.state.active}> 

                        <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    {this.props.voteReducer.voteInstance &&
                                    this.props.voteReducer.voteInstance.length >=1 && 
                                    this.props.voteReducer.voteInstance.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    {item.idea}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>


          <Dimmer active={this.state.active}>
            
              
              You Voted!<br/>
            <ToTextmessage />
          </Dimmer>
        </Dimmer.Dimmable>
        </div>
                </>

            </>
        )

    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Vote));

