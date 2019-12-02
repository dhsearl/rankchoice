// Weighted Winner using 
// Borda count.
// Alternatives are commented out.
// Euro Vision song contest uses a version
// I tried a fibonacci sequence to weight the first 11 too
// The Naru & Dowdall System gives (1 / rank) points to each candidate.
//
// take in array.
// make tally object
// populate with id's
// for each row of array.
// 
// for debugging:
// let voteArray = [
//     [[318, 1], [317, 2], [319, 3], [320,4]],
// [[319, 4], [317, 2], [318, 3], [320,1]],
// [[319, 1], [317, 2], [318, 4], [320,3]]
// ]

const weightedWinner = (voteResponse) =>{
    console.log("IN weightedWinner")
    let voteArray = voteResponse.map(each => each.votes)
    console.log(voteArray);
    const tally = new Object();
    const numCandidates = voteArray[0].length
    const euroVisionArray = [12,10,8,7,6,5,4,3,2,1,0] // 0-10 index
    const fibArray = [55,34,21,13,8,5,3,2,1,1,0]
    // vote[1] is a rank,
    // vote[0] is an idea_id 
    let highScore = 0;
    let winner=[];
    for (let row of voteArray){
        for (let vote of row){
            let score;
            // if (vote[1] - 1 <= 10) score = numCandidates/[vote[1]]  // Naru & Dowdall System
            // if (vote[1] - 1 <= 10) score = euroVisionArray[vote[1]-1];  // Euro Vision Song Contest
            // if (vote[1] - 1 <= 10) score = fibArray[vote[1]-1];       // Searl Fibonacci System
            if (vote[1] - 1 <= 10) score = numCandidates - vote[1] + 1  // Standard Borda count (for first 10)
            else score = 0; 
            // Add to tally object
            if (tally[vote[0]]){
                tally[vote[0]] += score; 
            } else tally[vote[0]] = score;

            // Track high scores, allow for ties so we can randomize winner
            if (tally[vote[0]] > highScore) {
                highScore = tally[vote[0]]
                winner = [vote[0]]
            }   else if (tally[vote[0]] === highScore) {
                winner.push(vote[0])
            }
            console.log(highScore,winner)
        }
    }

    console.log(winner, highScore);

    return winner
}
// console.log(weightedWinner(voteArray));
module.exports = weightedWinner;

