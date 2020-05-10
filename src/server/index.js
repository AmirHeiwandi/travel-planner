// Express
const express = require('express')
const app = express()
app.use(express.static('dist'))
app.use(express.json({limit: '3mb'}));

// Dotenv
const dotenv = require('dotenv');
dotenv.config();

// Middleware
const bodyParser = require('body-parser')

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
const cors = require('cors');
app.use(cors());

app.listen(8082, function () {
    console.log('Server listening on port 8082!')
})