require('dotenv').config()
const express = require('express')
const app = express();                 // define our app using express
const http = require('http');
const bodyParser = require('body-parser');
const config = require('./config/config');
const apiRoutes = require('./api/routes/api');
const db = require('./database')._connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', apiRoutes);

var httpPort = process.env.HTTP_PORT || 9000;        // set our port


const httpServer = http.createServer(app);


httpServer.listen(httpPort, () => {
    console.log('HTTP Server running on port ' + httpPort);
});

