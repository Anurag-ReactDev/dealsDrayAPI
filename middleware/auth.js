const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const db = require('../database/mysqlDB')
const cookieParser = require('cookie-parser')
require('dotenv').config();
app.use(express.json());

const checkUser = (req,res,next)=>{
    jwt.secret = process.env.ACCESS_KEY;
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    console.log(authHeader.split(' ')[1])
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401);
    jwt.verify(token,jwt.secret,(err,userDetails)=>{
        if(err) return res.sendStatus(403)
        const{id,name} = userDetails;
        db.query('select * from users join saloons on users.id=saloons.id where users.id=(?)',[id], (err,result)=>{
            if(err)return res.sendStatus(404);
            console.log(result);
            res.json({users:result});
        });
        // res.json(userDetails);
    });
    next();
}

module.exports = checkUser;