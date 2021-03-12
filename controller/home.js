
var Home = 
{
	index: function(req,res) {
		var cities;
		var db = req.app.locals.db;
		db.collection("Cities").find({}).project({name: 1, image: 1}).toArray(function(err, docs){
			if(err){
				throw Error("Unable to find cities");
			}
			else {
				cities = docs;
				db.collection("Colleges").find({}).project({shortName: 1, image: 1}).toArray(function(err, docs){
						if(err) {throw Error("Unable to fetch Colleges");}
					else {
						res.render("index", {cities: cities, pop_cities: cities, colleges: docs})
						}
				});
			}
		});		
	}
}
 
module.exports = Home;
