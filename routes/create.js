const express = require('express');
const router = express.Router();
const app = express();

const db = require('../database/mysqlDB')


app.use(router)
app.use(express.json());
const corsHandler = require('../middleware/cors');






router.use(corsHandler)
//routes


router.route("/")
.post((req,res)=>{
    const {f_Name,f_Email,f_Designation,f_gender,f_Course,f_MobileNo} = req.body;
    console.log(req.body)
    
    db.query('insert into employee(f_Name,f_Email,f_Designation,f_gender,f_Course,f_MobileNo) values(?,?,?,?,?,?)',[f_Name,f_Email,f_Designation,f_gender,f_Course,f_MobileNo],((err,result)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({"message":"successfully inserted"})
        }
        
      
        
    }))
})
module.exports = router;

