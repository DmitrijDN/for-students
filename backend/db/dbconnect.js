function dbConnectionHandler() {
	var mongoose = require('mongoose');
	var config = require('../config');
	mongoose.connect(config.db.uri, config.db.opts);

	mongoose.set('debug', true);
	this.connection = mongoose.connection;

	mongoose.connection.on('connected', function() {
		this.state = 'connected';
	});

	mongoose.connection.on('error', function(err) {
		this.state = 'disconnected';
	});

	mongoose.connection.on('disconnected', function() {
		mongoose.connection.close(function() {
			this.state = 'disconnected';
			process.exit(0);
		});
	});
}

module.exports = new dbConnectionHandler();