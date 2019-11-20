const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// req.body is this object: 
// {
//     poll_id: this.props.pollReducer.pollStatus.id,
//     voter_id: localStorage.id,
//     votes: this.props.voteReducer.voteInstance // an object
// }
router.post('/', (req,res)=>{
    console.log("post route of vote.router with",req.body);
    const queryText = `INSERT INTO vote_instance(
        poll_id, voter_id)
        VALUES($1,$2) RETURNING ID`
    const queryArgs = [req.body.poll_id,req.body.voter_id]
    pool.query(queryText,queryArgs)
    .then((result)=>{
        console.log(result.rows[0])
        const vote_instance_id = result.rows[0].id;
        const voteArray = Object.entries(req.body.votes);
        const queryText = 
        `INSERT INTO single_vote
        ("vote_instance_id","candidate_id","rank_integer")
        VALUES($1, $2, $3)`
        voteArray.forEach(vote=>{
            const queryArgs = [vote_instance_id, vote[0],vote[1]]
            pool.query(queryText,queryArgs)
            .then(()=>{
                console.log("added vote", queryArgs);
            })
        }, ()=>{
            res.sendStatus(200);
        })
    })
    .catch((error)=>{
        console.log('Vote Intance INSERT failed',error);
        res.sendStatus(500);
    })
})


module.exports = router;