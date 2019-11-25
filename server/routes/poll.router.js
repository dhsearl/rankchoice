const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// const moment = require('moment');

// const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const poll_length = 10;

const CronJob = require('cron').CronJob;
new CronJob('* * * * * *', function () {
    console.log('.');
    // moment.duration(2, 'minutes');


    // After 5 minutes turn off collecting and shift to voting
    const minuteOneQuery = `UPDATE polls
        SET collection_period = false, voting_period = true 
        WHERE created_at <= (now() at time zone 'utc') - interval '${poll_length / 2} minute' 
        AND collection_period = true`;
    pool.query(minuteOneQuery)
        .then(() => {
            //console.log('Updated a first minute');
        })
        .catch((error) => {
            console.log('Error with turning collection period off', error);
        })

    // After 10 minutes turn voting off
    const minuteTwoQuery = `UPDATE polls
        SET voting_period = false, complete= true 
        WHERE created_at <= (now() at time zone 'utc') - interval '${poll_length} minute' 
        AND voting_period = true RETURNING poll.id`;
    pool.query(minuteTwoQuery)
        .then((result) => {
            // findWinner();
            
            console.log('FINDING WINNER',result.rows);

        })
        .catch((error) => {
            console.log('Error with minute two query', error);
        })

    // const pollCompleteQuery = `UPDATE polls
    //     SET voting_period = false 
    //     WHERE created_at <= NOW() - interval '5 minute' 
    //     AND voting_period = true`;
    // pool.query(minuteTwoQuery)
    //     .then(() => {
    //         // findWinner();
    //         // console.log('FINDING WINNER');

    //     })
    //     .catch((error) => {
    //         console.log('Error with minute two query', error);
    //     })
}, null, true, 'America/Chicago');

// Gets the poll status by URL,
// RUNS OFTEN
router.get('/:url', (req, res) => {
    const queryText = `SELECT * FROM polls WHERE url=$1`;
    const queryArgs = [req.params.url]
    pool.query(queryText, queryArgs)
        .then((response) => {
            // Return just the first array element from the rows array
            // we only want one poll
            res.send(response.rows[0]);
        })
        .catch((error) => {
            console.log('ERROR in poll.router GET ROUTE', error);
            res.sendStatus(500);
        })
});

// Create Poll
router.post('/', (req, res) => {
    const queryText = `
    INSERT INTO polls(
        "url",
        "type",
        "question",
        "collection_period",
        "voting_period",
        "complete")
    VALUES($1,$2,$3,true,false,false)`;
    const queryArgs = [req.body.url.replace(/-$/,""), req.body.type, req.body.description];
    console.log("while inserting", req.body);
    pool.query(queryText, queryArgs)
        .then((response) => {
            console.log('poll.router POST response is', response);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in poll.router post route', error);
            res.sendStatus(500);
        })
})

// URL Input Validation 
// returns true if TAKEN
// returns false if NOT TAKEN
router.post('/url',(req,res)=>{
    console.log(req.body)
    const queryText =`SELECT * FROM polls WHERE url = $1`
    const queryArgs = [req.body.value];
    pool.query(queryText, queryArgs)
    .then((result)=>{
        console.log(result.rows[0]);
        if(result.rows[0]) res.send(true)
        else res.send(false)
    })
})

module.exports = router;