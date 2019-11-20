const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req,res)=>{
    console.log("post route of vote.router with",req.body);
    const queryText = `INSERT INTO`
})


module.exports = router;