const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const http = requre('http')

router.get('/', async (req, res) => {
    await http.get({
        host:'http://two.rankchoice.io'
    }, (response)=>{

    })
    await http.get({
        host:'http://movies.rankchoice.io'
    })
    await http.get({
        host:'http://todo.rankchoice.io'
    })
}



module.exports = router;