import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// {this.props.ideaReducer.ideaList.map(eachIdea =>

//     <div><p>{eachIdea.idea_text}</p>
//         <input type="number"
//             name={String(eachIdea.id)}
//             onChange={this.handleRank}
//             value={this.props.voteReducer.voteInstance[ String(eachIdea.id)]}
//         />
//     </div>
// )}
// this.props.ideaReducer.ideaList is:
// "ideaList": [
//     {
//       "id": 27,
//       "idea_text": "Idea one",
//       "created_by": "d84f6620459bd017dc17d93df19d72201dde4113"
//     },
//     {
//       "id": 28,
//       "idea_text": "Idea two",
//       "created_by": "d84f6620459bd017dc17d93df19d72201dde4113"
//     },
//     {
//       "id": 29,
//       "idea_text": "Idea three",
//       "created_by": "d84f6620459bd017dc17d93df19d72201dde4113"
//     }
//   ]
class Vote extends Component {
    state =  {
        ideas: this.props.ideaReducer.ideaList,  
        columns: {
            'column-1': {
                id: 'column-1',
                title: this.props.pollReducer.polStatus.question,
                ideaIds: this.props.ideaReducer.ideaList.map(x => x.id),
            },
        },
        columnOrder:['column-1']
    }
    render() {

        return this.state.columnOrder.map((columnID)=>{
            const column = this.state.columns[columnId];
            const idea = column.ideaId
        })
   
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default withRouter(connect(mapReduxStateToProps)(Vote));

