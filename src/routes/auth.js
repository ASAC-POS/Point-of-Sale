'use strict'

//this will include signup and signin routes

//require
const express = require('express');
const cors = require('cors');

const bcrypt = require('bcrypt');

const {Users} = require('../model/index')


const Auth = express.Router();



//routes
Auth.post('/signup' , signup)

//functions 
async function signup(req , res){
    try{
        req.body.password = await bcrypt.hash(req.body.password , 5)
        const record = await Users.create(req.body);
        res.status(201).json(record);
    }catch (error){
        res.status(403).send(error);
    }
}

module.exports = Auth;