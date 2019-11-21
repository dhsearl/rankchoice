
// below is my code
// will continue to improve it.
// getWinner spits out the winner if there is a majority.
// learned a lot making it
// looked online at other solves. Almost none were complete.
// The functions I ended up using were undocumented
const getWinner = (voteArray, numberOfvoters) => {
    const winThreshold = numberOfvoters / 2;
    console.log("Needed to win: ", winThreshold)
    const tally = new Map()
    let loserArray =[];
    const scoreCard = {
        'winningIdea':[],
        'winningValue':0,
        'losingIdeaArray':[],
        'lowestValue':0
    }
    // const winners = [-1,0]
    // const losers =[-1,0]
    for (let row of voteArray){
        for (let vote of row){
            // vote[1] is a rank, is it 1?
            // vote[0] is an idea_id 
            // tally[vote[0]] is the count of 1s
            loserArray.push(vote[0])

            if (vote[1] === 1) {
                // count the 1s
                if (tally[vote[0]]) tally[vote[0]]++
                else tally[vote[0]] = 1

                // Double check that we don't have an outright winner
                if (tally[vote[0]] > winThreshold) return vote[0]
            }// maybe we don't need this bottom stuff
            // track the leaders
            if (tally[vote[0]] > scoreCard.winningValue){
                // set it as the current winner.
                scoreCard.winningValue = tally[vote[0]]
                scoreCard.winningIdea = [ vote[0] ]
                // remove it from the loser array
                loserArray = loserArray.filter(x=> x !==vote[0])
            } else if (tally[vote[0]] === scoreCard.winningValue) {
                // two leaders
                scoreCard.winningIdea.push(vote[0])
                loserArray = loserArray.filter(x=> x !==vote[0])
            } 


            // lets track losers
            // create one for every
            if (!tally[vote[0]]) {
                tally[vote[0]] = 0
                // could be a loser
                // scoreCard.losingIdeaArray.push([vote[0]])
            }
            
            
            
            console.log(tally)
            console.log(typeof tally)
            console.log()
            // console.log(scoreCard)
        } 
    }

    // we don't have a winner. Lets see who had the lowest.
    // for (let idea of tally){
    //     if 
    // }
}

    function removeCandidates(voteList, lowestCandidates) {
        var result;

        result = [];
        voteList.forEach(function (oneSetOfVotes) {
            result.push(oneSetOfVotes.filter(function (singlePreference) {
                return lowestCandidates.indexOf(singlePreference) === -1;
            }));
        });
        return result;
    }

    function calcTallies(voteList) {
        var result, tallies;

        tallies = {};
        voteList.forEach(function (oneSetOfVotes) {
            var topVote;
            topVote = oneSetOfVotes[0];

            if (!topVote) {
                return;
            }

            if (!tallies[topVote]) {
                tallies[topVote] = 0;
            }

            tallies[topVote] += 1;
        });

        result = {
            highest: [],
            highestCount: 0,
            lowest: [],
            lowestCount: voteList.length
        };

        Object.keys(tallies).forEach(function (index) {
            var score;
            score = tallies[index];

            if (result.highestCount < score) {
                result.highestCount = score;
                result.highest = [index];
            } else if (result.highestCount === score) {
                result.highest.push(index);
            }

            if (result.lowestCount > score) {
                result.lowestCount = score;
                result.lowest = [index];
            } else if (result.lowestCount === score) {
                result.lowest.push(index);
            }
        });

        result.highestPct = result.highestCount / voteList.length;
        result.LowestPct = result.lowestCount / voteList.length;

        return result;
    }

    function winner(candidates, highest) {
        var out;

        out = [];
        highest.forEach(function (indexPlusOne) {
            if (candidates[indexPlusOne - 1]) {
                out.push(candidates[indexPlusOne - 1]);
            }
        });

        if (out.length) {
            return out.join(' + ');
        }

        return 'no winner';
    }

    function findWinner(candidateList, voteList) {
        var tallies;

        while (true) {
            tallies = calcTallies(voteList);

            if (tallies.highestPct >= 0.5) {
                return winner(candidateList, tallies.highest);
            }

            if (tallies.lowestPct === tallies.highestPct) {
                return winner(candidateList, tallies.highest);
            }

            voteList = removeCandidates(voteList, tallies.lowest);
        }
    }


module.exports = findWinner;
