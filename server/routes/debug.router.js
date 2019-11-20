const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/vote_period/:id', (req,res) =>{
    console.log("flipping value of vote_period")
    pool.query(`UPDATE polls SET voting_period = NOT voting_period WHERE id=${req.params.id}`)
    .then(()=>{
        console.log('voting period flipped');
        res.sendStatus(200)
    })
    .catch((error)=>{
        console.log('ERROR in flipping voting period', error);
        res.sendStatus(500);
    })
})
router.get('/collection_period/:id', (req,res) =>{
    console.log("flipping value of vote_period")
    pool.query(`UPDATE polls SET collection_period = NOT collection_period WHERE id=${req.params.id}`)
    .then(()=>{
        console.log('collection period flipped');
        res.sendStatus(200)
    })
    .catch((error)=>{
        console.log('ERROR in flipping collection period', error);
        res.sendStatus(500);
    })
})





module.exports = router;