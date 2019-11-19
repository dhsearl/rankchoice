const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');

// Get all ideas associated with poll_id
router.get('/:id', (req,res) =>{
    const queryText = `SELECT * FROM candidate_ideas WHERE id=$1`;
    const queryArgs = [req.params.id]
    pool.query(queryText, queryArgs)
    .then((response)=>{
        res.send(response.rows[0]);
    })
    .catch((error)=>{
        console.log('ERROR in GET ROUTE',error);
        res.sendStatus(500);
    })
});

// Post idea to candidate_ideas
router.post('/', (req,res) =>{
    const queryText = `INSERT INTO "candidate_ideas"("poll_id",
    "idea_text",
    "created_by")VALUES(
        (SELECT MAX(id) FROM polls WHERE url = $1), 
        $2,$3)`;
    const queryArgs = [req.body.url, req.body.idea_text, req.body.created_by];
    console.log("while inserting",req.body);
    
    pool.query(queryText, queryArgs)
    .then((response)=>{
        console.log('response is',response);
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log('Error in post route',error);
        res.sendStatus(500);
    })
})

module.exports = router;