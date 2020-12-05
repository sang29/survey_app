const express = require('express'); //this is like import
const app = express(); //generating new application called app

app.get('/', (req, res) => {//route handler
    res.send({ bye: 'buddy'});
});

const PORT = process.env.PORT || 5000; //use 5000 if heroku not available
app.listen(PORT); //dynamic port
