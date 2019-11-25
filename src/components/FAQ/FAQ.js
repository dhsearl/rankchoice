import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core'
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function FAQ() {

    let history = useHistory();
    function createButton() {
        history.push("/make");
        // function handleClick() {

        // }
    }
    return (
        <div>
            <ol>
                <li>Create Poll</li>
                <ul>
                    <li>Ask a question</li>
                    <li>Choose a unique url</li>
                    <li>Start the poll</li>
                </ul>
                <li>
                    Collect Ideas
        </li>
                <ul>
                    <li>Submit ideas</li>
                    <li>Share the url</li>
                    <li>Get them in before the time is up</li>
                </ul>
                <li>
                    Vote
            </li>
                <ul>
                    <li>Drag votes to rank them</li>
                    <li>When you're done lock them in</li>
                    <li>Winner is posted when time is up</li>
                </ul>





            </ol> <p>Winners are chosen using Ranked Choice Voting</p>
            <Button className="makeButton" style={{ width: '100%' }} onClick={createButton}><h1>Make Poll</h1></Button>

        </div>
    )
}

export default FAQ;
