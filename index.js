'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const robotService = require('./services/robot-service.js');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use('/api/robots', robotService);

app.use((req, res, next) => {
	const err = new Error('Not Found');
    err.status = 404;
	next(err);
});

app.listen(8080, () => {
  console.log('Web server listening on port 8080!');
});
