// =======================
// get the packages we need ============
// =======================
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');

const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./app/config'); // get our config file
const User   = require('./app/models/user'); // get our mongoose model

// =======================
// configuration =========
// =======================
const port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', (req, res) => {
    res.send(`Hello! The API is at http://localhost:${port}/api`);
});

// API ROUTES -------------------
app.get('/setup', (req, res) => {

  // create a sample user
  var nick = new User({
    name: 'Fortune Ekeruo',
    password: 'password',
    admin: true
  });

  // save the sample user
  nick.save((err) => {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// =======================
// start the server ======
// =======================
app.listen(port);
console.log(`Magic happens at http://localhost:${port}`);
