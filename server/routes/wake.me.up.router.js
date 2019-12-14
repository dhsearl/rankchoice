const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    axios.get('http://two.rankchoice.io')
    .catch((error)=>{console.log("two error", error)})
    axios.get('http://movies.searl.org')
    .catch((error)=>{console.log("movies error", error)})
    axios.get('http://todo.searl.org')
    .catch((error)=>{console.log("todo error ",error)})
    axios.get('http://three.rankchoice.io')
    .catch((error)=>{console.log('three error:',error)
    })
    axios.get('http://four.rankchoice.io')
    .catch((error)=>{console.log('four error:',error)
    })
    axios.get('http://gallery.searl.org')
    .catch((error)=>{console.log('gallery error:',error)
    })
    axios.get('http://calculator.searl.org')
    .catch((error)=>{console.log('gallery error:',error)
    })
    axios.get('http://feedback.searl.org')
    .catch((error)=>{console.log('gallery error:',error)
    })
    res.sendStatus(200);
})



module.exports = router;