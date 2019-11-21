
// const resultRows = [{ "vote_instance_id": 3, "votes": [[7, 3], [8, 2], [9, 1]] }, 
// { "vote_instance_id": 4, "votes": [[7, 1], [9, 3], [8, 2]] },
// { "vote_instance_id": 5, "votes": [[8, 2], [9, 3], [7, 1]] },
// { "vote_instance_id": 6, "votes": [[7, 1], [8, 2], [9, 3]] }]

// const voteTable = [];

// // prints out sorted table need to strip first value
// resultRows.map(x => voteTable.push(x.votes.sort(function(a, b) {
//     return a[0] - b[0];
//   })));

// const skinnyTable = []
// voteTable.forEach(row=> {
//     const temp = []
//     row.forEach(vote => {
//         temp.push(vote[1])
//     })
//     skinnyTable.push(temp)
// })
// const skinnyCandidates = []
// voteTable[0].forEach(vote =>{
//     skinnyCandidates.push(vote[0])
// })

// console.log(skinnyTable);
// console.log(skinnyCandidates);
// //   const votesOnly = [];
// //   voteTable.map(x=>)

//   const voteOnlyTable = [[2,1,3],[1,2,3],[2,1,3],[1,2,3]]
// console.log(voteTable);

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

// console.log(getWinner(voteTable, 4))


    var candidates, dirname, fs, votes;

    // function loadCandidates(dir) {
    //     var candidateList, data;

    //     /*jslint stupid:true*/
    //     data = fs.readFileSync(dir + '/candidates.txt');
    //     /*jslint stupid:false*/

    //     candidateList = data.toString().trim().split('\n');

    //     return candidateList;
    // }

    // function loadVotes(dir) {
    //     var data, voteList;

    //     /*jslint stupid:true*/
    //     data = fs.readFileSync(dir + '/votes.txt');
    //     /*jslint stupid:false*/

    //     voteList = data.toString().trim().split('\n');
    //     voteList = voteList.map(function (line) {
    //         return line.split(' ');
    //     });

    //     return voteList;
    // }

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

    // // dirname = process.argv[2];
    // // fs = require('fs');

    // // if (!dirname) {
    // //     console.log('Specify directory name on command line');
    // // } else {
    //     candidates = ["7","8","9"];

    //     if (!Array.isArray(candidates) || !candidates.length) {
    //         console.log('no candidates');
    //         return;
    //     }

    //     votes = voteOnlyTable;

    //     if (!Array.isArray(votes) || !votes.length) {
    //         console.log('no votes');
    //         return;
    //     }

    //     console.log(findWinner(candidates, votes));
    

module.exports = findWinner;
