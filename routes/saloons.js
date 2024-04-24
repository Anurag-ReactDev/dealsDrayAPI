const express = require('express')
const app = express()
const router = express.Router();
const db = require('../database/mysqlDB');
const corsHandler = require('../middleware/cors');
const verify = require('../middleware/tokenVerification')
app.use(router);
app.use(express.json());
router.use(corsHandler);
router.use(verify)//just to check if tokenverification middleware is working or not
router.route("/:id")
.get((req,res)=>{
    if(!req.testData){
        // return "refresh tokens aren't allowed"
        return res.sendStatus(500)
    }
    const test = req.params.id;
    console.log(test);
    db.query('select * from saloon_details', (err,results)=>{
        if(err){
            throw err;
        }else{
            console.log("reached /saloons route")
            res.json({saloons:results});
        }
    })
})
.post((req,res)=>{
    console.log(req.body);
    const{saloon_name,email} = req.body;
    
    db.query('insert into saloons (saloon_name,email) values(?,?)',[saloon_name,email],(err,results)=>{
        if(err){
            console.error("Could not insert",err);
            return;
        }else{
            console.log("success");
            res.sendStatus(200);
        }
    })
})
module.exports = router;