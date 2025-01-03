const path = require('path');
const express = require('express');
const app = express();
app.use(express.json());
const port = 4444;
const Task = require('./Model/Task.js');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const taskrouter=require('./Routes/Task.js')
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', taskrouter)

mongoose.connect('mongodb://127.0.0.1:27017/Tasks')
   .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
   .catch(error => {
        console.error(error);
    });