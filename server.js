const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

var app = express();

const route = require('./routes/route');
const uri = "mongodb+srv://yashk:yashproject@cluster0-nbfot.mongodb.net/test?retryWrites=true&w=majority";

//connect to monogDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//on connection
mongoose.connection.on('connected', ()=> {
    console.log('Connected to database successfully');
});

mongoose.connection.on('error', (err)=> {
    if (err) {
        console.log('Error in Database connection: ' + err);
    }
});

//port no.
const port = 3000;

//adding middleware 
app.use(cors());

//body parser
app.use(bodyparser.json());

//routes
app.use('/api', route);

//static files
app.use('/src', express.static(path.join(__dirname, '/src')));

//testing server
app.get('/', (req, res)=> {
    res.send('foobar');
});

app.listen(port,()=> {
    console.log('Server started at port: ' + port); 
});