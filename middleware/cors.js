const express = require('express');
const corsHandler = (req, res, next)=> {
    // console.log("cors is hit")
   Credential:true// this is required if you are using cookie to store tokens
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,append,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');//to store in cookie this should be there on server side
    
next();
    };

module.exports = corsHandler;