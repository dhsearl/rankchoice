const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const findWinnerMIT = require('../modules/ranked');


// req.body is this object: 
// {
//     poll_id: this.props.pollReducer.pollStatus.id,
//     voter_id: localStorage.id,
//     votes: this.props.voteReducer.voteInstance // an object
// }
// [
//     {
//       "id": "30",
//       "idea": "one two"
//     },
//     {
//       "id": "31",
//       "idea": "three four"
//     },
//     {
//       "id": "32",
//       "idea": "five six"
//     }
//   ]

router.post('/', (req, res) => {
    const poll_id = req.body.poll_id
    const voter_id = req.body.voter_id
    const queryArgs = [poll_id, voter_id]
    const votes = req.body.votes
    const queryText = `SELECT vote_instance.id FROM vote_instance WHERE poll_id = $1 AND voter_id=$2`
    pool.query(queryText, [poll_id, voter_id])
        .then((result) => {
            console.log(result.rows[0])
            // if result.rows[0].id  THEN delete it and post new votes
            // else just post it.
            if (result.rows[0]) {
                result.rows.forEach(oldVote => {
                    pool.query(`UPDATE vote_instance SET last_vote = FALSE WHERE id=${oldVote.id}`)
                        .then(() => {
                            console.log('Before adding a vote, Removed old vote at vote_instance', oldVote.id);
                        })
                        .catch((error) => {
                            console.log("Error removing", oldVote.id, "was", error);
                        })
                    })
                }

            console.log("post route of vote.router with", req.body);

            const secondQueryText = `INSERT INTO vote_instance(
            poll_id, voter_id)
            VALUES($1,$2) RETURNING ID`

            pool.query(secondQueryText, queryArgs)
                .then((result) => {
                    console.log(result.rows[0])
                    const vote_instance_id = result.rows[0].id;
                    const queryText =
                        `INSERT INTO single_vote
                    ("vote_instance_id","candidate_id","rank_integer")
                    VALUES($1, $2, $3)`
                    votes.map((vote, i) => {
                        const thirdQueryArgs = [vote_instance_id, Number(vote.id), i + 1]
                        pool.query(queryText, thirdQueryArgs)
                            .then(() => {
                                console.log("added vote", thirdQueryArgs);
                            })
                            .catch((error) => {
                                console.log("Error adding vote", thirdQueryArgs, "was", error);
                            })
                    }, () => {
                        res.sendStatus(200);
                    })
                        .catch((error) => {
                            console.log("Error inserting in thirdquery", error)
                        })
                })
                .catch((error) => {
                    console.log('Vote Intance INSERT failed', error);
                    res.sendStatus(500);
                })
        })
})


// router.post('/', (req, res) => {
//     console.log("post route of vote.router with", req.body);
//     const secondQueryText = `INSERT INTO vote_instance(
//         poll_id, voter_id)
//         VALUES($1,$2) RETURNING ID`
//     // const queryArgs = [req.body.poll_id, req.body.voter_id]
//     pool.query(secondQueryText, queryArgs)
//         .then((result) => {
//             console.log(result.rows[0])
//             const vote_instance_id = result.rows[0].id;
//             const queryText =
//                 `INSERT INTO single_vote
//                 ("vote_instance_id","candidate_id","rank_integer")
//                 VALUES($1, $2, $3)`
//             req.body.votes.map((vote, i) => {
//                 const queryArgs = [vote_instance_id, Number(vote.id), i + 1]
//                 pool.query(queryText, queryArgs)
//                     .then(() => {
//                         console.log("added vote", queryArgs);
//                     })
//             }, () => {
//                 res.sendStatus(200);
//             })
//         })
//         .catch((error) => {
//             console.log('Vote Intance INSERT failed', error);
//             res.sendStatus(500);
//         })
// })

router.get('/:id', (req, res) => {
    const queryText =
        `SELECT array_agg(good) as votes FROM 
        (SELECT "vote_instance_id", 
        ARRAY[ candidate_id,rank_integer] as good
        FROM single_vote 
        JOIN vote_instance on vote_instance.id = single_vote.vote_instance_id
        JOIN polls ON polls.id = vote_instance.poll_id
        WHERE polls.id = $1 AND vote_instance.last_vote = TRUE) as vote_table
        GROUP BY "vote_instance_id";`
    const queryArgs = [req.params.id]
    pool.query(queryText, queryArgs)
        .then((result) => {
            console.log("working with", result.rows)
            // Empty table for use to strip and sort
            const voteTable = [];
            // prints out sorted table need to strip first value
            result.rows.map(x => voteTable.push(x.votes.sort(function (a, b) {
                return a[0] - b[0];
            })));

            // Strip out just candidates in the vote array
            const skinnyCandidates = []
            voteTable[0].forEach(vote => {
                skinnyCandidates.push(vote[0])
            })
            // Now just the votes
            const skinnyTable = []
            voteTable.forEach(row => {
                const temp = []
                row.forEach(vote => {
                    temp.push(vote[1])
                })
                skinnyTable.push(temp)
            })

            // console.log(skinnyCandidates);
            // console.log(skinnyTable);

            let winner = findWinnerMIT(skinnyCandidates, skinnyTable, true, 51)
            console.log("Winner is", winner);
            if (winner.length > 1) {
                console.log("Random mode initiated")
                const randomIndex = Math.floor(Math.random() * winner.length);
                winner = [winner[randomIndex]];
            }

            const queryUpdatingWinner =
                `UPDATE polls 
                    SET winning_candidate = 
                        CASE 
                            WHEN polls.winning_candidate IS NULL THEN $1
                            ELSE polls.winning_candidate
                            END
                        WHERE id = $2`
            console.log("one winner is", winner)
            const queryUpdatingWinnerArgs = [winner[0], req.params.id]
            pool.query(queryUpdatingWinner, queryUpdatingWinnerArgs)
                .then(() => {
                    const queryText = `SELECT idea_text FROM candidate_ideas WHERE id=$1`
                    const queryArgs = [winner[0]]
                    pool.query(queryText, queryArgs)
                        .then((result) => {
                            console.log('Winning Idea Text is', result.rows[0])
                            res.send(result.rows[0])
                        })
                        .catch((error) => {
                            console.log('Error getting back Idea text', error);
                            res.sendStatus(500);
                        })
                })
                .catch((error) => {
                    console.log('Error updating winner of poll', error);
                    res.sendStatus(500);
                })

        })
        .catch((error) => {
            console.log('Error in vote.router /:id route', error);

        })
})

module.exports = router;