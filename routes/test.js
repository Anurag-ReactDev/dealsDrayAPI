const express = require('express')
const app = express();
const router = express.Router();

router.route("/")
.get((req,res)=>{
    // res.send("Welcome to test route")
    // res.redirect("http://localhost:3000/anotherTest")
})

module.exports = router;