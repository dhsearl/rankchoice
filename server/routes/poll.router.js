const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');

const { rejectUnauthenticated } = require('../modules/authentication-middleware');


const findWinner = () =>{
    // get all the votes associated with the poll
    // do the dang math
    // return winner ID
    return 1;
}
// const poll_length = 2;
// const CronJob = require('cron').CronJob;
// new CronJob('*/5 * * * * *', function() {
    //console.log('You will see this message every second');
    // moment.duration(2, 'minutes');


    // After 5 minutes turn off collecting and shift to voting
    // const minuteOneQuery = `UPDATE polls
    // SET collection_period = false, voting_period = true 
    // WHERE created_at <= NOW() - interval '${poll_length/2} minute' 
    // AND collection_period = true`;
    // pool.query(minuteOneQuery)
    // .then(()=>{
    //     //console.log('Updated a first minute');
    // })
    // .catch((error)=>{
    //     console.log('Error with turning collection period off', error);
    // })

    // // After 10 minutes turn voting off
    // const minuteTwoQuery = `UPDATE polls
    // SET voting_period = false 
    // WHERE created_at <= NOW() - interval '${poll_length} minute' 
    // AND voting_period = true`;
    // pool.query(minuteTwoQuery)
    // .then(()=>{
    //     // findWinner();
    //     // console.log('FINDING WINNER');
        
    // })
    // .catch((error)=>{
    //     console.log('Error with minute two query', error);
    // })

    // const pollCompleteQuery = `UPDATE polls
    // SET voting_period = false 
    // WHERE created_at <= NOW() - interval '10 minute' 
    // AND voting_period = true`;
    // pool.query(minuteTwoQuery)
    // .then(()=>{
    //     // findWinner();
    //     // console.log('FINDING WINNER');
        
    // })
    // .catch((error)=>{
    //     console.log('Error with minute two query', error);
    // })
// }, null, true, 'America/Chicago');

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

router.get('/:url', (req,res) =>{
    const queryText = `SELECT * FROM polls WHERE url=$1`;
    const queryArgs = [req.params.url]
    pool.query(queryText, queryArgs)
    .then((response)=>{
        //console.log(response.rows);
        
        res.send(response.rows[0]);
    })
    .catch((error)=>{
        console.log('ERROR in GET ROUTE',error);
        res.sendStatus(500);
    })
});

router.post('/', (req,res) =>{
    const queryText = `INSERT INTO polls("url",
    "type",
    "question",
    "collection_period",
    "voting_period",
    "complete")VALUES($1,$2,$3,true,false,false)`;
    const queryArgs = [req.body.url, req.body.type, req.body.description];
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