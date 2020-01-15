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
    }
    return (
        <div className="addIdeaBox">
            <ol>
                <li>Create Poll</li>
                <ul>
                    <li>Pick a voting method (see below)</li>
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
            </ol> 
            
            <h3>Ranked-Choice Voting</h3>
            
            <p className="faqText"> Good for large groups.<br/>  In Ranked-Choice or Instant Run Off Voting, first place votes are tallied. If one candidate receives a majority of first place votes they are declared the winner.  If there is no majority, the candidate that received the fewest first place votes is removed and the candidate that was in second place on these voters ballots is moved up to first place. The tally begins again, continuing until there is a candidate that receives a majority of first place votes.<br/>Minneapolis municiple elections use this style of vote counting!<br />
                <a href="https://en.wikipedia.org/wiki/Ranked_voting" target="_blank" rel="noopener noreferrer">Learn more</a>
            </p>
            <h3>Borda Count</h3>
            
            <p className="faqText">Good for small - medium sized groups.<br/> Borda Count Voting is a specific type of positional voting. Candidates are weighted based on their position. In a Borda Count the candidate a voter puts at the top of their ballot is awarded as many points as there are candidates (n). Second place gets (n-1). Third (n-2) etc. This style of voting is good for small-medium sized groups because it always weights voters second and third place preferences, where Ranked-Choice Voting only looks at lower preferences when a voters first place has been eliminated.
                 <br />
                <a href="https://en.wikipedia.org/wiki/Borda_count" target="_blank" rel="noopener noreferrer">Learn more</a>
            </p>
            <Button className="makeButton" style={{ width: '100%' }} onClick={createButton}><h1>Make Poll</h1></Button>

        </div>
    )
}

export default FAQ;
