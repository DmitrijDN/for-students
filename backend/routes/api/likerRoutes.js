var apiResponse = require('express-api-response');
var likerRepository = require('../../repositories/likerRepository');

module.exports = function(app) {

	app.get('/api/like', function(req, res, next) {
		likerRepository.getAll(function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/like/:generalName/:date/:subName', function(req, res, next) {
		likerRepository.incrementLikeCounter({
			generalName: req.params.generalName,
			date: req.params.date,
			subItem: req.params.subName
		}, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/dislike/:generalName/:date/:subName', function(req, res, next) {
		likerRepository.incrementDislikeCounter({
			generalName: req.params.generalName,
			date: req.params.date,
			subItem: req.params.subName
		}, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.get('/api/like/details/:id', function(req, res, next) {
		likerRepository.getById(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/like/', function(req, res, next) {
		likerRepository.saveLikeComment(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/like/todislike/', function(req, res, next) {
		likerRepository.changeLikeToDislike(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/dislike/', function(req, res, next) {
		likerRepository.saveDislikeComment(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/dislike/tolike/', function(req, res, next) {
		likerRepository.changeDislikeToLike(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/createAction', function(req, res, next) {
		likerRepository.add(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/storebrowserid', function(req, res, next) {
		likerRepository.addBrowserIdToSubCounter(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.post('/api/getBrowserId/', function(req, res, next) {
		likerRepository.checkBrowserId(req.body, function(err, data) {
			if (data === null) {
				res.data = null;
				res.err = {
					message: 'Not Found'
				};
			} else {
				res.data = data;
				res.err = err;
			}
			next();
		});
	}, apiResponse);

	app.post('/api/storebrowserid', function(req, res, next) {
		likerRepository.addBroserIdToSubCounter(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/clearSubLikesDislikes', function(req, res, next) {
		likerRepository.clearLikesDislikes(req.body.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/like/cancel', function(req, res, next) {
		likerRepository.cancelLike(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/dislike/cancel', function(req, res, next) {
		likerRepository.cancelDislike(req.body, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);

	app.put('/api/like/:id', function(req, res, next) {
		likerRepository.incrementCounter(req.params.id, function(err, data) {
			res.data = data;
			res.err = err;
			next();
		});
	}, apiResponse);
};