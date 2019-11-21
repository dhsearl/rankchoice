const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const findWinner = require('../modules/rcv')
// req.body is this object: 
// {
//     poll_id: this.props.pollReducer.pollStatus.id,
//     voter_id: localStorage.id,
//     votes: this.props.voteReducer.voteInstance // an object
// }
router.post('/', (req, res) => {
    console.log("post route of vote.router with", req.body);
    const queryText = `INSERT INTO vote_instance(
        poll_id, voter_id)
        VALUES($1,$2) RETURNING ID`
    const queryArgs = [req.body.poll_id, req.body.voter_id]
    pool.query(queryText, queryArgs)
        .then((result) => {
            console.log(result.rows[0])
            const vote_instance_id = result.rows[0].id;
            const voteArray = Object.entries(req.body.votes);
            const queryText =
                `INSERT INTO single_vote
        ("vote_instance_id","candidate_id","rank_integer")
        VALUES($1, $2, $3)`
            voteArray.forEach(vote => {
                const queryArgs = [vote_instance_id, vote[0], vote[1]]
                pool.query(queryText, queryArgs)
                    .then(() => {
                        console.log("added vote", queryArgs);
                    })
            }, () => {
                res.sendStatus(200);
            })
        })
        .catch((error) => {
            console.log('Vote Intance INSERT failed', error);
            res.sendStatus(500);
        })
})

router.get('/:id', (req, res) => {
    const queryText =
        `SELECT array_agg(good) as votes FROM (SELECT "vote_instance_id", ARRAY[ candidate_id,rank_integer] as good
	FROM single_vote 
	JOIN vote_instance on vote_instance.id = single_vote.vote_instance_id
	JOIN polls ON polls.id = vote_instance.poll_id
	WHERE polls.id = $1) as vote_table
    GROUP BY "vote_instance_id";`
    const queryArgs = [req.params.id]
    pool.query(queryText, queryArgs)
        .then((result) => {
            // Empty table for use to strip and sort
            const voteTable = [];
            // prints out sorted table need to strip first value
            result.rows.map(x => voteTable.push(x.votes.sort(function (a, b) {
                return a[0] - b[0];
            })));
            
            // Strip out just candidates in the vote array
            const skinnyCandidates = []
            voteTable[0].forEach(vote =>{
                skinnyCandidates.push(vote[0])
            })
            // Now just the votes
            const skinnyTable = []
            voteTable.forEach(row=> {
                const temp = []
                row.forEach(vote => {
                    temp.push(vote[1])
                })
                skinnyTable.push(temp)
            })

            // console.log(skinnyCandidates);
            // console.log(skinnyTable);
            
            const winner = findWinner(skinnyCandidates,skinnyTable)
            console.log(winner);

            res.send(winner);
        })
        .catch((error)=>{
            console.log('Error in vote.router /:id route',error);
            
        })
})

module.exports = router;