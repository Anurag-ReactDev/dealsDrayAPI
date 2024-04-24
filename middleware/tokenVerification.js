const express = require('express');
const app = express();
const router = express.Router()
const jwt = require('jsonwebtoken');
const clientErrors = require('../errorHandlers/clientErrors')
// const db = require('../database/mysqlDB')
const cookieParser = require('cookie-parser')
require('dotenv').config();
app.use(express.json());
const corsHandler = require('../middleware/cors');
app.use(corsHandler)
router.use(corsHandler)



//function to generate accessToken
const generateAccessToken = (dataForToken)=>{
    const access_token= jwt.sign(dataForToken,process.env.ACCESS_KEY,{expiresIn: '60s'});
        
        // console.log("new AccessToken: ",access_token)
        
        //saving it in cookie
       return access_token;
}

//function to verify accessToken
const verifyAccessToken = async (toBeverifiedAccessToken)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(toBeverifiedAccessToken,process.env.ACCESS_KEY,(err,result)=>{
            if(err){
                
                const err = new clientErrors("Access Token is not valid",403)
                err.statusCode = err.statusCode || 500;
                err.message = err.message || 'error'
                const accessTokenError = {
                    status : err.statusCode,
                    message: err.message
                }
                reject(accessTokenError)
            }else{
                resolve(result)
            }
        })
    })
    
}
//function to verify refreshToken
const verifyRefreshToken =async (toBeverifiedRefreshToken)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(toBeverifiedRefreshToken,process.env.REFRESH_KEY,(err,result)=>{
            if(err){
                
                const err = new clientErrors("Refresh Token is not valid/please pass refresh token instead of access token",403)
                err.statusCode = err.statusCode || 500;
                err.message = err.message || 'error'
                // console.log(err.statusCode)
                // console.log(err.message)
                const refreshTokenError = {
                    status : err.statusCode,
                    message: err.message
                }
                reject(refreshTokenError)
            }
            else{
                
                console.log("Refresh token verified, creating new accessToken")
                console.log("Destructuring refreshtoken..")
                    const newRefreshTokenValue = {
                        id: result.id,
                        name: result.name,
                        password: result.password
                    }
                const newAccessToken = generateAccessToken(newRefreshTokenValue)
                console.log("new Access token generated")
                resolve(newAccessToken);
            }
    })
    
    })
}
//verify the token
const verifyToken=(async (req,res,next)=>{
    console.log("Reached middleware")
    // verifying access_token
    jwt.secret = process.env.ACCESS_KEY;
    const authHeader = req.headers['authorization'];
   
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    // if(token == null) return res.sendStatus(200);//look into this

    try{
        const status = await verifyAccessToken(token);
        console.log("accessToken valid",status)
        const goodData = {
            id:status.id,
            name:status.name
        }
        req.testData = goodData;
        next();//go to the requested page
    }
    catch(rejectionFromAccessToken){
        console.log("accessToken invalid",rejectionFromAccessToken)
        try{
            const newlyGeneratedAccessToken = await verifyRefreshToken(token)
            
            console.log("newAccessToken: ",newlyGeneratedAccessToken)
            //set the cookies again
            res.cookie("accessToken",newlyGeneratedAccessToken)
            res.cookie("refreshToken",token)
            res.json({status:"ok"})
          
        }
        catch(rejectionFromRefreshToken){
            console.log(rejectionFromRefreshToken.message)
            res.json(rejectionFromRefreshToken)
        }
    }
    })



module.exports = verifyToken;