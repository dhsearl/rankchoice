import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

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
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

class Vote extends Component {
    handleSubmit = () =>{
        this.props.dispatch({type: "LOCK_VOTE_IN", payload:{
            poll_id: this.props.pollReducer.pollStatus.id,
            voter_id: localStorage.id,
            votes: this.props.voteReducer.voteInstance
        }})
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
        this.props.dispatch({type:"SET_ITEM_RANKS", payload: newItems})
        
    }
    render() {

        return (
            <>            
            {this.props.pollReducer.pollStatus.voting_period
                    && Object.keys(this.props.voteReducer.voteInstance).length !== 0
                    &&
                
                    <>
                        <div>Time to vote</div>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                    >
                                        {this.props.voteReducer.voteInstance.map((item, index) => (
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
                        <button onClick={this.handleSubmit}>Lock Votes In</button>
                    </>
            }
            </>
        )

    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Vote));
