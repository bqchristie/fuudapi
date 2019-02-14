require('dotenv').config()
require('./database');
const express = require('express')
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const apiRoutes = require('./api/routes/api');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(`/api/${process.env.API_VERSION}`, apiRoutes);

const httpPort = process.env.HTTP_PORT || 9000;


const httpServer = http.createServer(app);


httpServer.listen(httpPort, () => {
    console.log('HTTP Server running on port ' + httpPort);
});

