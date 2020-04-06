const bodyParser = require('body-parser');
const routes = require('./routes');

module.exports = function(app) {
	app.set("view engine", "ejs");
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	routes(app);
	// We add all the routes of our application in other module. require('/routes')
	return app;
} 
