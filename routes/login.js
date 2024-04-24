const express = require('express');
const router = express.Router();
const app = express();
const userCheck = require('../middleware/auth');
const db = require('../database/mysqlDB')
require('dotenv').config();
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
app.use(router)
app.use(express.json());
const corsHandler = require('../middleware/cors');






router.use(corsHandler)
//routes


router.route("/")
.post((req,res)=>{
    const {name,password} = req.body;
    console.log(req.body)
    //check if this user exists in DB
    db.query('select * from login where f_userName=? and f_Pwd=?',[name,password],((err,result)=>{
        if(err || result[0]==null){
            // return res.sendStatus(404);
            res.sendStatus(403);
            return;
        }
        console.log("DB result: ",result);
      
        //saving it in cookie
        
    
        res.cookie("currentUser",result)

        res.json({result:result})
    }))
})
module.exports = router;

