'use strict';

// this will initiate the express server and handle home route.

//require
const express = require('express');
const cors = require('cors');
const error = require('./errorhandlers/500');
const notFound = require('./errorhandlers/404');
const userRoutes = require('./routes/user');
const storeRoutes = require('./routes/stores');
const productRoutes = require('./routes/products');
const receiptRoutes = require('./routes/receiptes');
const logger = require('./middlewares/logger');
const Auth = require('../src/routes/auth');
const app = express();
const bearer = require('./middlewares/bearerAuth');
const acl = require('./middlewares/acl');

//Implement socket.io

const http = require('http');
const server = http.createServer(app);
// const path = require("path");

const io = require('socket.io')(server, process.env.PORT);
let popUpMessage;
io.on('connection', (socket) => {
  console.log(`Socket ID: ${socket.id}`);

  // Adding new user notification
  socket.on('add-user', (addedUser) => {
    const outputStr = `username: ${addedUser.username},
     role: ${addedUser.role},
      ID: ${addedUser.id}`;
    popUpMessage = 'New user was added ==> ' + outputStr;
    console.log(popUpMessage);
  });

  // Deleting a user notification
  socket.on('delete-user', (deletedUser) => {
    const outputStr = `username: ${deletedUser.username},
    role: ${deletedUser.role},
    ID: ${deletedUser.id}`;

    popUpMessage = 'A user was deleted  ==> ' + outputStr;
  });

  // Adding new product notification
  socket.on('add-product', (addedproduct) => {
    const outputStr = `product name: ${addedproduct.productName}, 
    Quantity: ${addedproduct.quantity},
    minimum quantity: ${addedproduct.minQuantity}`;

    popUpMessage = 'A new product was added ==> ' + outputStr;
  });

  // Deleting a product notification
  socket.on('delete-product', (product) => {
    const outputStr = `product name: ${product.productName}, 
    Quantity: ${product.quantity}`;

    popUpMessage = 'A product was deleted  ==> ' + outputStr;
  });

  // Adding a new receipt
  socket.on('add-receipt', (receipt) => {
    let products = '';
    receipt.product.forEach((element, i) => {
      products +=
        i +
        1 +
        '-' +
        'product name: ' +
        element.productName +
        ' ' +
        'Quantity: ' +
        element.quantity +
        '  ';
    });
    const outputStr = `Products sold:- ${products}`;

    popUpMessage = 'A Cashier Sold some items ==> ' + outputStr;
  });

  //a new signin
  socket.on('sign-in', (payload) => {
    const outputStr = `user name : ${payload.username}`;
    popUpMessage = `${outputStr} signed in`;
  });
});

////////////////////////////

// The session part requirements
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { db } = require('./model/index');

// Realted to session
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    store: new SequelizeStore({
      db,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Expires after one day
    },
  })
);

// use
app.use(express.json());
app.use(cors());
app.use(Auth);
app.use(userRoutes);
app.use(storeRoutes);
app.use(productRoutes);
app.use(receiptRoutes);
app.use(logger);

// app.use(express.static(path.join(__dirname, "Public")));

//routes
app.get('/', home);
app.get('/popup', bearer, acl('read'), popUp);
//functions
function home(req, res) {
  // res.sendFile(__dirname + "/Public/views" + "/index.html");
  res.status(200).send('home route');
}
function popUp(req, res) {
  if (popUpMessage) {
    res.send(popUpMessage);
  } else {
    res.send('no popups');
  }
}

function start(port) {
  server.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
}

//error handlers use
app.use(error);
app.use('*', notFound);

//modeul
module.exports = {
  app: app,
  start: start,
};
