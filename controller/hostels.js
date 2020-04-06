const ObjectId = require('mongodb').ObjectID;
const models = require('../models/models');
const date = new Date();
const today = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
 
   
var hostelController = {
	showBySearch: function(req,res) {
		var db = req.app.locals.db;
		let city = {name: req.body.city, isValid: false}
		let type = {name: req.body.hostelType, isValid: false}
		city.name = city.name.trim();
		type.name = type.name.trim();
		city.name.length===24 && typeof city.name==="string" ? city.isValid=true : city.isValid=false;
		type.name==="Boys"||type.name==="Girls"||type.name==="Luxury" ? type.isValid=true : type.isValid=false;
	
		if(city.isValid && type.isValid) {
			let cityId = new ObjectId(city.name);
			let p = (() => db.collection("HostelInfo").find({$and:[{"address.city": cityId},{"hostelType":type.name}]}).project({name:1,prices:1,images:1,hostelType:1}).toArray())();
			p.then(hostels=>{
				hostels.length<=0 ? res.render("error", {err: "There are no Hostels Found"}) : res.render("showBySearch", {hostels: hostels, count: hostels.length});
			}).catch(err => console.log(err))
		}

		else { res.render("error", {err: "Please provide valid input"}); }
	},

	showByCity: function(req,res) {
		var db = req.app.locals.db;
		let cityId = {name: req.params.cityId, isValid: false}
		cityId.name = cityId.name.trim();
		cityId.name.length===24 && typeof cityId.name==="string" ? cityId.isValid=true : cityId.isValid=false;

		if(cityId.isValid) {
			let p = (()=>db.collection("HostelInfo").find({"address.city": new ObjectId(cityId.name)}).project({name:1,prices:1,images:1,hostelType:1}).toArray())();
			p.then(hostels=>{
				hostels.length<=0?res.render("error",{err:"We are currently not serving in this city. But Coming Soon!"})
				:res.render("showByCity", {hostels: hostels, count: hostels.length});
			}).catch(err => console.log(err))
		}

		else {res.render("error", {err: "Please provide valid input"});}
	},

	showByCollege: function(req,res) {
		var db = req.app.locals.db;
		let collegeId = {name: req.params.collegeId, isValid: false}
		collegeId.name = collegeId.name.trim();
		collegeId.name.length===24 && typeof collegeId.name==="string" ? collegeId.isValid=true : collegeId.isValid=false;
		var collegeName;

		if(collegeId.isValid) {
			let p = (()=>db.collection("Colleges").find({"_id": new ObjectId(collegeId.name)}).project({name:1}).toArray())();
			p.then(college=> {
			collegeName = college[0].name;
			return db.collection("HostelInfo").find({"nearbyColleges": new ObjectId(collegeId.name)}).project({name:1,prices:1,images:1,hostelType:1}).toArray();
			})
			.then(hostels=> {
			hostels.length<=0? res.render("error", {err: "We don't find any hostels nearby to this college"})
			:res.render("showByCollege", {collegeName: collegeName, hostels: hostels, count: hostels.length});
			})
			.catch(err=>console.log(err))
		}
		
		else {res.render("error", {err: "Please provide valid input"});}
	},

	listRequest: function(req,res) {
		var db = req.app.locals.db;
		    var newListingRequest = new models.ListRequest(req.body.name, req.body.phone, req.body.city, today);
			db.collection("ListRequest").insertOne(newListingRequest, function(err, doc) {
				err?console.log("Not Inserted Succesfully"):res.render("acknowledgement", {msg: "Thank you, We will call you soon."});
			});
	},

	showById: function(req,res) {
		var db = req.app.locals.db;
		let hostelId = {name: req.params.id, isValid: false}
		hostelId.name = hostelId.name.trim();
		hostelId.name.length===24 && typeof hostelId.name==="string" ? hostelId.isValid=true : hostelId.isValid=false;
		var city, state, hostel;

		if(hostelId.isValid) {
			let p =(()=>db.collection("HostelInfo").find({"_id": new ObjectId(hostelId.name)}).toArray())();
			p.then(docs=>{
				hostel = docs[0];
				return db.collection("Cities").find({"_id": new ObjectId(hostel.address.city)}).toArray();
			})
			.then(docs=>{ 
				city = docs[0].name;
				state = docs[0].state;
				res.render("hostelDetail", {hostel: hostel, city: city, state: state});
			})
			.catch(err=>console.log(err))
		}

		else {res.render("error",{err: "We are more smarter than you."});}
	},

	showHostelUploadForm: function(req,res) {
		var db = req.app.locals.db;
		var cities;
		let p = (()=> db.collection("Cities").find().project({name: 1}).toArray())();
		p.then(docs=> {
			cities = docs;
			return db.collection("Colleges").find().project({name:1}).toArray();
		})
		.then(docs=>res.render("uploadHostel", {cities: cities, colleges: docs}))
		.catch(err=>console.log(err))
		 }, 

	uploadHostel: function(req,res) {
		 var db = req.app.locals.db;
		 const collection =db.collection("HostelInfo");
		 var images = []; 
		 var colleges =[];

		 for(let i=0; i<req.files.length; i++) {
		 	images.push(req.files[i].filename);
		 }

		 for(let i=0; i<req.body.college.length; i++) {
		 	let temp_id = new ObjectId(req.body.college[i]);
		 	colleges.push(temp_id);
		 }

		 if(req.body.college>3) {
		 	res.send("Select only 3 nearby college");
		 	return;
		 }

		 res.json(req.body);

		 collection.find({"name": req.body.name}).project({name: 1}).toArray(function(err,docs){
		 		if(err) {throw Error("Something error happens");}
		 		else {
		 			if(docs.length>0) {
		 				res.send("Hostel with this name already Exists");
		 			}

		 			else{
		 				let newHostel = new models.Hostel(
		 					req.body.name,
		 					{
		 						city: new ObjectId(req.body.city),
		 					},
		 					req.body.hostelType,
		 					{
		 						fullAddress: req.body.addressLine1 + " " + req.body.addressLine2,
		 						phoneNumber: req.body.phoneNumber,
		 						alternativeNumber: req.body.alternativephoneNumber
		 					},
		 					req.body.description,
		 					{
		 						"non-ac-one-seater": req.body["non-ac-one-seater-price"],
		 						"non-ac-two-seater": req.body["non-ac-two-seater-price"],
		 						"non-ac-three-seater": req.body["non-ac-three-seater-price"],
		 						"ac-one-seater": req.body["ac-one-seater-price"],
		 						"ac-two-seater": req.body["ac-two-seater-price"],
		 						"ac-three-seater": req.body["ac-three-seater-price"]
		 					},
		 					images,
		 					req.body.facilityName,
		 					colleges
		 				);

		 			collection.insertOne(newHostel, function(err,docs) {
		 				if(err) {throw Error("Unable to insert");}
		 				else {res.json(docs.ops);}

		 				});
		 			}
		 		}
		 	});	
		 },

		 getCities: function(req, res) {
		 	var db = req.app.locals.db;
		 	const collection = db.collection("Cities");
				collection.find().toArray(function(err, docs) {
						if(err) {console.log(err)}
						else {
							res.json(docs);
							
						}
				});
		 },

		 showLikedHostels: function(req,res) {
			 let db = req.app.locals.db;
			 let idsArray =[];
			 for(let key in req.body) {
				 idsArray.push(new ObjectId(req.body[key]));
			 }
			let p = (() => db.collection("HostelInfo").find({"_id" : {$in : idsArray} }).project({name:1,prices:1,images:1,hostelType:1}).toArray())();
			p.then(hostels=>{
				res.render("likedHostels", {hostels: hostels, count: hostels.length})
			}).catch(err=>{
				console.log(err);
			});
		 }
 

};
module.exports = hostelController;