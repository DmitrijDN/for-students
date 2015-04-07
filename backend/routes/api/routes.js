var likerRoutes = require('./likerRoutes');

module.exports = function(app) {
	return {
		likerRoutes: likerRoutes(app)
	};
};