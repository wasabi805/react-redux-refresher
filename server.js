const express = require('express');
const mongoose = require('mongoose');
const app = express();


const bodyParser = require('body-parser');
//Middleware needed for body-parser below
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
//  db config
const db = require('./config/keys').mongoURI; //key

//connect to  mongo through mongoose
mongoose.connect(db).then( ()=>{
    console.log('mongoDB connect!');
}).catch((err)=>{
    console.log(err);
});

app.get('/', (req, res)=>{
    res.send('Hello, this is the 1st, server route')
});

//USE routes: TRAFFIC CONTROL to corresponding files
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//Port and Port checker
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});