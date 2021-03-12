const express = require('express');
const fs = require('fs');
const mongodb = require('mongodb');
const config = require('./server/config.js');
const MongoClient = mongodb.MongoClient;
const url = "mongodb+srv://Ritik:ritik%40123@hostellife-rexgl.mongodb.net/test?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8000;
var db;
var app = express();
const client = new MongoClient(url, {useNewUrlParser: true});

client.connect(function(err,db){
	if(err){
		console.log(err);
	}

	else {
		app.locals.db = client.db("Hostels");
		app.listen(PORT, function () { console.log(`Server Started on port ${PORT}`)});
	}
});



app = config(app); 
// we write app configuration code in different module, so that the code will be neat and clean and Maintaneable.


app.use(express.static(__dirname+'/public'));



