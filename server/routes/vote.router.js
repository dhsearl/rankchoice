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
router.post('/', async (req, res) => {
    const client = await pool.connect();
    try {
        const poll_id = req.body.poll_id
        const voter_id = req.body.voter_id
        const queryArgs = [poll_id, voter_id]
        const votes = req.body.votes
        const queryText = `SELECT vote_instance.id 
        FROM vote_instance 
        WHERE poll_id = $1 
        AND voter_id=$2`
        await client.query('BEGIN')
        // Check Database for old votes from this user
        // If there are old votes we'll set them to NOT last_vote so they won't be counted
        const voteInstanceResults = await client.query(queryText, queryArgs)

        if (voteInstanceResults.rows[0]) {
            await Promise.all(voteInstanceResults.rows.map(oldVote => {
                return client.query(`UPDATE vote_instance SET last_vote = FALSE WHERE id=${oldVote.id}`)
            }));
        }

        // Now that that is over with. 
        // We'll insert a vote instance into our table with the voter_id and poll_id
        const secondQueryText = `INSERT INTO vote_instance(
                poll_id, voter_id)
                VALUES($1,$2) RETURNING ID`
        const secondQueryResult = await client.query(secondQueryText, queryArgs);
        const vote_instance_id = secondQueryResult.rows[0].id;    
        
        const thirdQueryText =
            `INSERT INTO single_vote
            ("vote_instance_id","candidate_id","rank_integer")
            VALUES($1, $2, $3)`
        await Promise.all(votes.map((vote, i) => {
            const thirdQueryArgs = [vote_instance_id, Number(vote.id), i + 1]
            return client.query(thirdQueryText, thirdQueryArgs)
        }))

        await client.query('COMMIT')
        res.sendStatus(201);
    }
    catch (error) {
        await client.query('ROLLBACK')
        console.log('ERROR POST api/vote', error)
        res.sendStatus(500);
    }
    finally {
        client.release();
    }
})

module.exports = router;