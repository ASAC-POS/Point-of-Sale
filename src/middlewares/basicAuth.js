// this file is to check password

'use strict'
const base64 = require('base-64');
const bycrypt = require('bcrypt');
const { user } = require('../model/index');
const JWT = require('jsonwebtoken');
const SECRET = process.env.SECRET || "Manal Secret";

const basicAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let basicHeeaderParts = req.headers.authorization.split(' ');
            let encoded = basicHeeaderParts.pop();
            let decoded = base64.decode(encoded);
            let [userName, password] = decoded.split(':');

            const user = await User.findOne({ where: { userName: userName } });
            var validPass = await bcrypt.compare(password, user.password);
            if (validPass){
                 console.log(validPass);
                let newToken = JWT.sign({ userName: user.userName }, SECRET);
                user.token = newToken;
                console.log(user);
                req.user =user;
                next();
            } else {
                res.status(403).send("invalid login Password");
            }
        }
    } catch (error) {
        res.status(403).send("invalid login userName")
    }

}

module.exports = basicAuth;