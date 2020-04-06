const express = require('express');
const path = require('path');
var multer = require('multer');
const home = require('../controller/home');
const hostel = require('../controller/hostels');
const customer = require('../controller/customer');
var router = express.Router();

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'public/uploads/');
	}, 

	filename: function(req, file, cb) {
		cb(null, file.originalname.split('.')[0] + Date.now() + path.extname(file.originalname));
	}
});

var upload = multer({storage: storage});

module.exports = function(app){

	router.get('/', home.index);
	router.post('/showBySearch', hostel.showBySearch);
	router.get('/showByCity/:cityId', hostel.showByCity);
	router.get('/showByCollege/:collegeId', hostel.showByCollege);
	router.post('/listingRequest', hostel.listRequest);
	router.get('/hostel/:id', hostel.showById);
	router.get('/uploadHostelForm', hostel.showHostelUploadForm);
	router.post('/hostel', upload.array('hostelImages', 10) , hostel.uploadHostel);
	router.post('/buyHostel', customer.buyHostel);
	router.post('/liked', hostel.showLikedHostels);
	app.use(router);
}