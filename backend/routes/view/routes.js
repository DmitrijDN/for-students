var commonRoutes = require('./commonRoutes');

module.exports = function(app) {
	return {
		commonRoutes: commonRoutes(app)
	};
};