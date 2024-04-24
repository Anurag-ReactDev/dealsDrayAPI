const express = require('express')
const app = express()
const router = express.Router();
const db = require('../database/mysqlDB');
const corsHandler = require('../middleware/cors');


app.use(router);
app.use(express.json());

router.use(corsHandler)

//routes
router.route("/")
.get((req,res)=>{
    console.log("Reached home route")
    db.query('SELECT * FROM SALOON_DETAILS',(err,result)=>{
        if(err){
            return res.sendStatus(500);
        }else{
            res.json({saloons:result})
        }   
    })
})


module.exports = router;


