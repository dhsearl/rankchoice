const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const findWinnerMIT = require('../modules/ranked');
const findWeightedWinner = require('../modules/weighted');
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
        WHERE created_at <= NOW() - interval '5 minute'   
        AND collection_period = true RETURNING polls.id`;
    pool.query(minuteOneQuery)
        .then((result) => {
            if (result.rows[0]) console.log('Updated a first minute for poll', result.rows);
        })
        .catch((error) => {
            console.log('Error with turning collection period off', error);
        })




    // After 10 minutes turn voting off
    const minuteTwoQuery = `UPDATE polls
        SET voting_period = false, complete= true 
        WHERE created_at <= NOW() - interval '10 minute' 
        AND voting_period = true RETURNING polls.id, polls.type`;


    pool.query(minuteTwoQuery)
        .then((result) => {
            if (result.rows[0]) console.log('Updated a second minute for poll', result.rows);

            if (result.rows[0]) console.log('FINDING WINNER', result.rows);

            result.rows.map(finished_poll => {
                const finished_poll_id = finished_poll.id
                const finished_poll_type = finished_poll.type
                console.log("in poll.router and my poll_id is",finished_poll_id,"poll type",finished_poll_type)
                const queryText =
                    `SELECT array_agg(good) as votes FROM 
                (SELECT "vote_instance_id", 
                ARRAY[ candidate_id,rank_integer] as good
                FROM single_vote 
                JOIN vote_instance on vote_instance.id = single_vote.vote_instance_id
                JOIN polls ON polls.id = vote_instance.poll_id
                WHERE polls.id = $1 AND vote_instance.last_vote = TRUE) as vote_table
                GROUP BY "vote_instance_id";`
                const queryArgs = [finished_poll_id]
                pool.query(queryText, queryArgs)
                    .then((result) => {
                        if (finished_poll_type === 'general') {
                            console.log("working with", result.rows)
                            // Empty table for use to strip and sort
                            let winner;
                            if (result.rows.length > 0) {
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

                                console.log(skinnyCandidates);
                                console.log(skinnyTable);

                                winner = findWinnerMIT(skinnyCandidates, skinnyTable, true, 51)
                                console.log("Winner is", winner);
                                if (winner.length > 1) {
                                    console.log("Random mode initiated")
                                    const randomIndex = Math.floor(Math.random() * winner.length);
                                    winner = [winner[randomIndex]];
                                }
                            } else {
                                winner = [1]
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
                            const queryUpdatingWinnerArgs = [winner[0], finished_poll_id]
                            pool.query(queryUpdatingWinner, queryUpdatingWinnerArgs)
                                .then(() => {
                                    // if anypoll ids in the table match, 
                                    // map to each of them.
                                    // 
                                    console.log('In text voter promise');
                                    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

                                    const smsQueryText = `SELECT phone_number, 
                                (SELECT candidate_ideas.idea_text 
                                    FROM candidate_ideas 
                                    WHERE id=$1), (SELECT polls.question FROM polls WHERE id=$2) 
                                FROM text_voter 
                                WHERE text_voter.poll_id = $2`
                                    const queryArgs = [...queryUpdatingWinnerArgs]
                                    pool.query(smsQueryText, queryArgs)
                                        .then((results) => {
                                            results.rows.map(voter => {
                                                const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
                                                client.messages
                                                    .create({
                                                        body: `Poll Complete\nQ:${voter.question}\nA:${voter.idea_text}\n\nMake a new poll at\nhttp://rankchoice.io`,
                                                        from: process.env.TWILIO_PHONE_NUMBER,
                                                        to: voter.phone_number
                                                    })
                                                    .then(message => {
                                                        console.log(message.sid)
                                                        res.sendStatus(200);
                                                    });
                                            })
                                        })
                                })
                                .catch((error) => {
                                    console.log('Error updating winner of poll', error);
                                    res.sendStatus(500);
                                })

                        } else if (finished_poll_type === 'weighted') {
                            console.log("Weighted Mode")
                            console.log("working with", result.rows)
                            // Empty table for use to strip and sort
                            let winner;
                            if (result.rows.length > 0) {

                                winner = findWeightedWinner(result.rows)
                                console.log("Winner is", winner);
                                if (winner.length > 1) {
                                    console.log("Random mode initiated")
                                    const randomIndex = Math.floor(Math.random() * winner.length);
                                    winner = [winner[randomIndex]];
                                }
                            } else {
                                winner = [1] // candidate that says "you forgot to vote"
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
                            const queryUpdatingWinnerArgs = [winner[0], finished_poll_id]
                            pool.query(queryUpdatingWinner, queryUpdatingWinnerArgs)
                                .then(() => {
                                    // if anypoll ids in the table match, 
                                    // map to each of them.
                                    // 
                                    console.log('In text voter promise');
                                    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

                                    const smsQueryText = `SELECT phone_number, 
                                (SELECT candidate_ideas.idea_text 
                                    FROM candidate_ideas 
                                    WHERE id=$1), (SELECT polls.question FROM polls WHERE id=$2) 
                                FROM text_voter 
                                WHERE text_voter.poll_id = $2`
                                    const queryArgs = [...queryUpdatingWinnerArgs]
                                    pool.query(smsQueryText, queryArgs)
                                        .then((results) => {
                                            results.rows.map(voter => {
                                                const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
                                                client.messages
                                                    .create({
                                                        body: `Poll Complete\nQ:${voter.question}\nA:${voter.idea_text}\n\nMake a new poll at\nhttp://rankchoice.io`,
                                                        from: process.env.TWILIO_PHONE_NUMBER,
                                                        to: voter.phone_number
                                                    })
                                                    .then(message => {
                                                        console.log(message.sid)
                                                        res.sendStatus(200);
                                                    });
                                            })
                                        })
                                })
                                .catch((error) => {
                                    console.log('Error updating winner of poll', error);
                                    res.sendStatus(500);
                                })
                        }
                    })
                    .catch((error) => {
                        console.log('Error in poll.router /:id route', error);

                    })
            })
        })
        .catch((error) => {
            console.log('Error with minute two query', error);
        }) // END minute two query

}, null, true, 'America/Chicago'); // end CHRON JOB


// Add phone number to text_voter table
// api/poll/text/
router.post('/text/', (req, res) => {
    const poll_id = req.body.poll_id
    const phone_number = req.body.phone_number
    const queryArgs = [poll_id, phone_number]
    const queryText = `INSERT INTO text_voter("poll_id","phone_number")VALUES ($1,$2)`
    pool.query(queryText, queryArgs)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log("Error in poll.router /text/ route", error);
            res.sendStatus(500);
        })
});

// send in poll id
router.get('/winner/:id', (req, res) => {
    console.log(req.params)
    const queryText = `SELECT candidate_ideas.idea_text 
    FROM candidate_ideas 
    WHERE candidate_ideas.id=(
        SELECT winning_candidate 
        FROM polls 
        WHERE id=$1);`
    const queryArgs = [req.params.id]
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
    const queryArgs = [req.body.url.replace(/-$/, ""), 
    req.body.type, 
    req.body.description
];
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
// Using .trim() and the subsequent .replace to handle how the url is sent and then cleaned up later
// Because I do not allow trailing dashes in my urls there was a chance 
// one could have created a poll with the same as a previous poll. Fixed.
router.post('/url', (req, res) => {
    console.log(req.body)
    const queryText = `SELECT * FROM polls WHERE url = $1`
    const queryArgs = [req.body.value.trim().replace(/-$/, "")];
    pool.query(queryText, queryArgs)
        .then((result) => {
            console.log(result.rows[0]);
            if (result.rows[0]) res.send(true)
            else res.send(false)
        })
})

module.exports = router;