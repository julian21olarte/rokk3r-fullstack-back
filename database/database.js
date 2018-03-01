'use strict';
const db_config = require('./db.config');
const mongoose = require('mongoose');
const mongo_url = db_config.prod;

// MongoDB Setup (Mongoose)
mongoose.connect(mongo_url)
.then( () => {
    console.log('Database connection OK...');
})
.catch(err => console.log(err));
mongoose.Promise = global.Promise;