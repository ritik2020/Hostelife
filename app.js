const express = require('express');
// const https = require('https');
const fs = require('fs');
const mongodb = require('mongodb');
const config = require('./server/config.js');
const MongoClient = mongodb.MongoClient;
const url = "mongodb+srv://Ritik:ritik%40123@hostellife-rexgl.mongodb.net/test?retryWrites=true&w=majority";
const port = 8000;
var db;
var app = express();
const client = new MongoClient(url, {useNewUrlParser: true});

client.connect(function(err,db){
	if(err){
		console.log(err);
	}

	else {
		app.locals.db = client.db("Hostels");
		app.listen(port, function () { console.log(`Server Started on port ${port}`)});
		// https.createServer({
  		// 	key: fs.readFileSync('key.pem'),
  		// 	cert: fs.readFileSync('cert.pem')
		// }, app).listen(8000, );
	}
});



app = config(app); 
// we write app configuration code in different module, so that the code will be neat and clean and Maintaneable.


app.use(express.static(__dirname+'/public'));



