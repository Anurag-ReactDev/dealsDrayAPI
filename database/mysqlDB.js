const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const app = express();

const port = process.env.PORT || 3000;

//create connection to DB
const db = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'getsetgo',
        database:'dealsDray'
    }
);

db.connect((err)=>{
    if(err){
        console.error('error connecting to mysql:', err);
        return;
    }else{
        console.log('connected to mysql database');
    }
});

module.exports = db;