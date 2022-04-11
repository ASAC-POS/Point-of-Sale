// this will check valid tokens

'use strict';
const {Users} =require('../model/index');
const jwt =require('jsonwebtoken');

const SECRET = process.env.SECRET || "Manal Secret";

const bearerAuth = async (req,res,next) =>{
    if (req.headers['authorization']) {
        let bearerHeaderParts= req.headers.authorization.split(' ');
        let token = bearerHeaderParts.pop(); 
       console.log(token);
        try {
            const parsedToken =jwt.verify(token ,SECRET);
            let user = await Users.findOne({where :{username: parsedToken.username}});
            if (user) {
                console.log(user);
                req.user =user;
                next();
            }else{
                res.status(403).json('user invalid');
            }
            
        } catch (error) {
            res.status(403).send(`error from bearer ${error}`)
        }
    }
}

module.exports = bearerAuth;