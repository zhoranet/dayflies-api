const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const apiRoutes = require('./routes/api');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	);
	next();
});

app.use('/api', apiRoutes);

app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	res.status(status).json({ message: message });
});

mongoose
	.connect('mongodb://localhost/dayflies', { useNewUrlParser: true })
	.then(result => {
		app.listen(8080);
	})
	.catch(err => console.log(err));
