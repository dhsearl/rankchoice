const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// Delete idea by id if voter id matches
router.delete('/:id/:voter_id', (req, res) => {
    const voter = req.params.voter_id;
    const idea = req.params.id;
    const checkQuery =
        `SELECT created_by 
    FROM "candidate_ideas"
    WHERE id = $1`
    const checkArg = [idea]

    pool.query(checkQuery, checkArg)
        .then((result) => {
            if (voter === result.rows[0].created_by) {
                const queryText = `DELETE FROM candidate_ideas WHERE id=$1`
                pool.query(queryText, checkArg)
                    .then(() => {
                        console.log('Delete Successful');
                        res.sendStatus(200);
                    })
                    .catch((error) => {
                        console.log('ERROR deleting in idea.router - Voter did create the idea, error between server and DB', error);
                    })
            } else {
                console.log('Forbidden: Voter ID did not match Creator ID');
                res.sendStatus(403);
            }
        })
        .catch((error) => {
            console.log("ERROR in idea.router DELETE verification", error)
        })
})

// Get all ideas associated with poll_id
router.get('/:id', (req, res) => {
    const queryText = `SELECT id, idea_text, created_by FROM candidate_ideas WHERE poll_id=$1`;
    const queryArgs = [req.params.id]
    pool.query(queryText, queryArgs)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((error) => {
            console.log('ERROR in idea.router GET by poll id', error);
            res.sendStatus(500);
        })
});

router.put('/:id', (req, res) => {
    const voter_id = req.body.voter_id
    const idea_new_text = req.body.newText
    const idea_id = req.params.id
    const queryText = `UPDATE candidate_ideas 
    SET idea_text = 
        (CASE 
            WHEN candidate_ideas.created_by = $1 THEN $2
            ELSE idea_text
        END)
    WHERE id = $3 `
    const queryArgs = [voter_id, idea_new_text, idea_id]
    pool.query(queryText, queryArgs)
        .then(() => {
            console.log("Updated");
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in idea.router PUT route updating idea', error);
            res.sendStatus(500);
        })
})

// Post idea to candidate_ideas
router.post('/', (req, res) => {
    const queryText = `INSERT INTO "candidate_ideas"("poll_id",
    "idea_text",
    "created_by")VALUES(
        (SELECT MAX(id) FROM polls WHERE url = $1), 
        $2,$3)`;
    const queryArgs = [req.body.url, req.body.idea_text, req.body.created_by];
    console.log("while inserting", req.body);

    pool.query(queryText, queryArgs)
        .then((response) => {
            console.log('idea.router post response is', response);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in idea.router POST', error);
            res.sendStatus(500);
        })
})

module.exports = router;