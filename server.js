const express = require('express');
const mongoose = require('mongoose');
const querystring = require('querystring');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

//connect to mongoose
mongoose.connect("mongodb://localhost:27017/departments", { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected1...'))
    .catch(err => console.log(err));

//body-parser midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Enable CORS on your server
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //Load the Department model
require("./models/Departments");
const Departments = mongoose.model('departments');

app.get('/api/users', (req, res) =>{
    res.json([{
        id:1,
        name: 'Jason'
    },
    {
        id:2,
        name: 'Kotlin'  
    }
])
});

app.get('/api/cars', (req, res) =>{
    res.json([{
        id:1,
        brand: 'Ford'
    },
    {
        id:2,
        brand: 'Nissan'  
    }
])
});

//Index Idea page
app.get('/db', (req, res) => {
    Departments.find({})
        .then(r=>res.json(r))
});


 

const port = process.env.PORT || 5000;

app.listen(port);