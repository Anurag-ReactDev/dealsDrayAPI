routes

*******************************************
/login
    -POST - user posts his credentials through this route and server generates access and refresh tokens and feeds it to cookie (a middleware to generate tokens)

*******************************************
/saloons
    -GET - Gets the data of all the saloons in the DB
    
*******************************************
/saloons/:id
    -POST - id is saloon's id, use middleware to see if user is authenticated 

******************************************* 
/signup
    -POST - signsup a new user (use the middleware to generate token)

*******************************************

/admin
    -POST
    -UPDATE