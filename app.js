const express = require('express');
// const mysql = require('mysql2');
const router = express.Router();
const db = require("./database/mysqlDB") //import db configuration
const login = require('./routes/login') //import login route
const saloon = require('./routes/saloons')
const create = require('./routes/create')
const home = require('./routes/home')
const test = require('./routes/test')


const app = express();
const corsHandler = require('./middleware/cors');
const port = process.env.PORT || 3000;

router.use("/login",login);//use login route 
router.use("/saloons",saloon);
router.use("/create",create);
router.use("/home",home);
router.use("/test",test);


app.use(express.json());//helps in parsing req body to json
app.use(router) //should add this here as well for routes to work



    /*
app.get("/saloons",(req,res)=>{
    db.query('select * from saloons', (err,results)=>{
        if(err){
            throw err;
        }else{
            res.json(results);
        }
    })
})

app.post("/newsaloon",(req,res)=>{
    console.log(req.body);
    const{saloon_name,email} = req.body;
    
    db.query('insert into saloons (saloon_name,email) values(?,?)',[saloon_name,email],(err,results)=>{
        if(err){
            console.error("Could not insert",err);
            return;
        }else{
            console.log("success");
            // res.sendStatus(200);
        }
    })
})
*/

app.listen(port,(req,res,err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Listening on port ${port}`)
    }
})

