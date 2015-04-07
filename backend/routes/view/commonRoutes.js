var injectedData = require('../../middleware/injectedDataMiddleware');
module.exports = function(app) {
	app.get('/', function(req, res, next) {
		injectedData(req, res, {}, false);
	});

	app.get('/main', function(req, res, next){
		injectedData(req, res, {}, false);
	});

	app.get('/create', function(req, res, next){
		injectedData(req, res, {}, false);
	});
};