const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to database 
mongoose.connect(config.database);

// on connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected successfully ' +config.database);
});

// on error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' +err);
});

const app = express();

const users = require('./routes/users');
//port number
const port = 3000;
// cors middleware
app.use(cors());
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// bodyparser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// users route
app.use('/users', users);

// index route
app.get('/', (req,res) => {
    res.send('hello world')
})

// start server
app.listen(port, function() {
    console.log('server is running at ' +port);
})