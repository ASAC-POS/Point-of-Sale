'use strict'

//this will include signup and signin routes

//require
const express = require('express');
const cors = require('cors');

const bcrypt = require('bcrypt');

const {Users} = require('../model/index')

const basicAuth = require('../middlewares/basicAuth')



const Auth = express.Router();



//routes
Auth.post('/signup' , signup)
Auth.post('/signin' , basicAuth , signin)

//functions 
// function sign up
async function signup(req , res){
    try{
        req.body.password = await bcrypt.hash(req.body.password , 5)
        const record = await Users.create(req.body);
        res.status(201).json(record);
    }catch (error){
        res.status(403).send(error);
    }
}


// function sign in 
async function signin(req , res){
    res.status(201).send(req.user)
}

module.exports = Auth;