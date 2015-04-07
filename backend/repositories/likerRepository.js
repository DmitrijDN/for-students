var connection = require('../db/dbconnect');
var Repository = require('./generalRepository');
var like = require('../schemas/like');

function LikerRepository() {
	Repository.prototype.constructor.call(this);
	this.model = like;
}

LikerRepository.prototype = new Repository();

LikerRepository.prototype.saveLikeComment = function(body, callback) {
	var query = this.model.update({
		'name': body.generalName,
		'date': body.date,
		'subCounters.name': body.subItem
	}, {
		$push: {
			'subCounters.$.likeComments': {
				body: body.comment
			}
		}
	});

	query.exec(callback);
};

LikerRepository.prototype.saveDislikeComment = function(body, callback) {
	var query = this.model.update({
		'name': body.generalName,
		'date': body.date,
		'subCounters.name': body.subItem
	}, {
		$inc: {
			'subCounters.$.dislikeCount': 1
		},
		$push: {
			'subCounters.$.dislikeComments': {
				body: body.comment
			}
		}
	});

	query.exec(callback);
};

LikerRepository.prototype.cancelLike = function(body, callback) {
	var query = this.model.update({
		'name': body.generalName,
		'date': body.date,
		'subCounters.name': body.subItem
	}, {
		$inc: {
			'subCounters.$.likeCount': -1,
		}
	});

	query.exec(callback);
};

LikerRepository.prototype.cancelDislike = function(body, callback) {
	var query = this.model.update({
		'name': body.generalName,
		'date': body.date,
		'subCounters.name': body.subItem
	}, {
		$inc: {
			'subCounters.$.dislikeCount': -1
		}
	});

	query.exec(callback);
};

LikerRepository.prototype.changeLikeToDislike = function(body, callback) {
	var query = this.model.update({
		'name': body.generalName,
		'date': body.date,
		'subCounters.name': body.subItem
	}, {
		$inc: {
			'subCounters.$.dislikeCount': 1,
			'subCounters.$.likeCount': -1,
		}
	});
	query.exec(callback);
};

LikerRepository.prototype.changeDislikeToLike = function(body, callback) {
	var query = this.model.update({
		'name': body.generalName,
		'date': body.date,
		'subCounters.name': body.subItem
	}, {
		$inc: {
			'subCounters.$.likeCount': 1,
			'subCounters.$.dislikeCount': -1,
		}
	});
	query.exec(callback);
};

LikerRepository.prototype.incrementLikeCounter = function(body, callback) {
	var query = this.model.update({
		'name': body.generalName,
		'date': body.date,
		'subCounters.name': body.subItem
	}, {
		$inc: {
			'subCounters.$.likeCount': 1
		}
	});
	query.exec(callback);
};

LikerRepository.prototype.incrementDislikeCounter = function(body, callback) {
	var query = this.model.update({
		'name': body.generalName,
		'date': body.date,
		'subCounters.name': body.subItem
	}, {
		$inc: {
			'subCounters.$.dislikeCount': 1,
		}
	});
	query.exec(callback);
};

LikerRepository.prototype.clearLikesDislikes = function(id, callback) {
	var query = this.model.update({
		'subCounters._id': id
	}, {
		$set: {
			'subCounters.$.likeCount': 0,
			'subCounters.$.dislikeCount': 0
		}
	});
	query.exec(callback);
};

LikerRepository.prototype.addBrowserIdToSubCounter = function(data, callback) {
	var query = this.model.update({
		'name': data.counterData.generalName,
		'date': data.counterData.date,
		'subCounters.name': data.counterData.subItem
	}, {
		$push: {
			'subCounters.$.browserIds': data.browserId
		}
	});
	query.exec(callback);
};

LikerRepository.prototype.checkBrowserId = function(data, callback) {
	var query = this.model.findOne({
		'name': data.counterData.generalName,
		'date': data.counterData.date,
		'subCounters': {
			$elemMatch: {
				'name': data.counterData.subItem,
				'browserIds': data.browserId
			}
		}
	});
	query.exec(callback);
};

module.exports = new LikerRepository();