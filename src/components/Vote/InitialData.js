const initialData = {
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

export default initialData;