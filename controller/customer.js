const ObjectId = require('mongodb').ObjectID;
const models = require('../models/models');
const date = new Date();
const today = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;

var customer = {
    buyHostel: function(req,res) {
        const {hostelId, customerName, phoneNumber, college, customerCity} = req.body;
        let db = req.app.locals.db;
        let temp = new models.BuyHostel(customerName, phoneNumber, college, customerCity, hostelId, today);
        db.collection("BuyHostel").insertOne(temp)
        .then(docs=>res.json(docs.ops))
        .catch(err=>console.log("Error Occured"));
    }
}

module.exports = customer;