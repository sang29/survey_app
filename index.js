const express = require('express'); //this is like import
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(); //generating new application called app

//app.use : middlewares
app.use(
  cookieSession({//cookieSession stores all the relavant data into the session (vs. experessSession stores only sessionID)
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in millisecond
    keys: [keys.cookieKey] //encrypt cookies
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000; //use 5000 if heroku not available
app.listen(PORT); //dynamic port
