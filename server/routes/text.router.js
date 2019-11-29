const express = require('express');
// const pool = require('../modules/pool');
const router = express.Router();

// router.use(bodyParser.urlencoded({extended: true}));
// router.use(bodyParser.json());

const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
// console.log((process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN))

router.post('/', (req, res) => {
    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    client.messages
        .create({
            body: req.body.message,
            from: "+16122301699",
            to: '+13202213590'
        })
        .then(message => {
            console.log(message.sid)
            res.sendStatus(200);
        });
});
module.exports = router;

