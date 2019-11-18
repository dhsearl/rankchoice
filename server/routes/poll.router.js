const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');

const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// const CronJob = require('cron').CronJob;
// new CronJob('* * * * * *', function() {
//     //console.log('You will see this message every second');
//     moment.duration(2, 'minutes');

//     const minuteOneQuery = `UPDATE polls
//     SET step_one = true 
//     WHERE created_at <= NOW() - interval '1 minute' 
//     AND step_one = false`;
//     pool.query(minuteOneQuery)
//     .then(()=>{
//         //console.log('Updated a first minute');
//     })
//     .catch((error)=>{
//         console.log('Error with minute one query', error);
//     })

//     const minuteTwoQuery = `UPDATE polls
//     SET step_two = true 
//     WHERE created_at <= NOW() - interval '2 minute' 
//     AND step_two = false`;
//     pool.query(minuteTwoQuery)
//     .then(()=>{
//         //console.log('Updated a second minute');
//     })
//     .catch((error)=>{
//         console.log('Error with minute two query', error);
//     })
// }, null, true, 'America/Chicago');



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
    const queryText = `INSERT INTO polls("url")VALUES($1)`;
    const queryArgs = [req.body.url];
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