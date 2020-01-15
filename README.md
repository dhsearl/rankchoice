# Rankchoice.io
## A polling platform for the people

Duration: 2-week sprint

To see the fully functional site, please visit:   [DEPLOYED VERSION OF Rank Choice.io](https://rankchoice.io/) 


## TL:DR
A quick-to-use online voting platform combining a collection period where users can suggest ideas, with a voting period where users drag-and-drop the suggestions in their preferred order from first to last.

Poll creators pose a question, chose a vote counting method, and create a secure link to share with others.  
Poll participants can suggest ideas, easily drag to sort their preferences, lock in their vote, and have the app text them when the poll is over.

## The Idea

Voting is important. RankChoice.io brings together two important ideas - alternative voting methods and allowing voters to suggest candidates or ideas.  Many elections are "won" by the person that gets the most votes.  Other systems, like the electoral collage, have their own quirks.  
Alternative voting methods like Ranked Choice Voting or the Borda Method seek to improve outcomes by changing how winners are decided.  Learn more about these methods in the next section.  

Before Rank Choice.io, alternative voting  platforms on the web did not allow voters to suggest candidates or ideas - instead these were entered when the poll was created.  Rank Choice.io has a five minute collection period, followed by a five minute voting period - winners are displayed or texted to voters.

## Alternative Voting Methods

In Ranked-Choice or Instant Run Off Voting, first place votes are tallied. If one candidate receives a majority of first place votes they are declared the winner. If there is no majority, the candidate that received the fewest first place votes is removed and the candidate that was in second place on these voters ballots is moved up to first place. The tally begins again, continuing until there is a candidate that receives a majority of first place votes.
Minneapolis municipal elections use this style of vote counting!
[Learn more](https://en.wikipedia.org/wiki/Ranked_voting)

Borda Count Voting is a specific type of positional voting. Candidates are weighted based on their position. In a Borda Count the candidate a voter puts at the top of their ballot is awarded as many points as there are candidates (n). Second place gets (n-1). Third (n-2) etc. This style of voting is good for small-medium sized groups because it always weights voters second and third place preferences, where Ranked-Choice Voting only looks at lower preferences when a voters first place has been eliminated.
[Learn more](https://en.wikipedia.org/wiki/Borda_count)


### The coolest features of this application are
* Mobile and Desktop ready
* Using Local Storage to create unique user accounts without having people login
* Custom URLs created by for each poll
* Two different algorithms are selectable for vote counting
* React-Beautiful-Drag-And-Drop used for voting
* Twillio API used for texting the winner
* Alternative versions for shorter time-periods if you want to try Rankchoice.io out (see Below)

## Screen Shots

#### Make a Poll
![Poll Creation](/screenshots/rc_static.png)

#### Create & Collect
![Creating poll](/screenshots/rc_smaller_two.gif)

#### Drag & Drop to Vote
![Voting](/screenshots/rc_bigger_vote.gif)


## Prerequisites

Node.js is required to run this on your machine.  To install all of the other dependencies run ` npm install ` and Node will take care of the rest.

Need Node?
- [Node.js](https://nodejs.org/en/)

## Installation

You can view the deployed version on Heroku  [Feedback Loop](https://rankchoice.io) or

1. run `git clone http://...` to fork and clone from this repository
2. run `npm install` to install dependencies listed in the package.json file
3. use the `database.sql` file to create a postgreSQL database on your machine.  If you need to point this to a different folder look in the feedback.router.js.
  * database is called `rankchoice_io`
  * CREATE TABLE instructions included
  * Be sure to run all the sql commands provided. The INSERT INTO candidate_ideas on line 80 handles incomplete polls.
4. run `npm run server` to start the server
5. then run `npm run client` to start the client.  React will open up a browser when the project loads.

## Other versions
These can be helpful to show others how RankChoice.io works - but in practice the timing can feel a little rushed. Enjoy!
[Two Minute Version](http://two.rankchoice.io)
[Three Minute Version](http://three.rankchoice.io)
[Four Minute Version](http://four.rankchoice.io)

## Usage
### Poll creation
1. Choose a voting method
2. Pose a question (ex. Where should we go to lunch?)
3. Pick a url (ex. https://rankchoice.io/#/lunch_options)

### Collection period
1. Share the link with others via text, slack, e-mail
2. Type in your suggestions
3. Edit or delete as needed (you can only edit or delete your own options)

### After 5 minutes

### Voting period
1. Drag and drop ideas to order them best to worst
2. Lock in your vote
3. Enter your mobile number to be texted the winner when time is up.


## Built With

React, Redux, Material-ui, Material-UI, Semantic-UI, React Beautiful Drag and Drop, Moment.js, Twillio API, and Node.js


## Acknowledgement
Thanks to the Scytale cohort of  [Prime Digital Academy](www.primeacademy.io) in Minneapolis.

## Support
If you have suggestions or issues, please email me at [dhsearl@gmail.com](mailto:dhsearl@gmail.com) or find me at [david.searl.org](https://david.searl.org)

---