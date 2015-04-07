var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likeSchema = new Schema({
	name: String,
	date: String,
	subCounters: [{
		name: String,
		likeCount: Number,
		dislikeCount: Number,
		likeComments: [{
			body: String
		}],
		dislikeComments: [{
			body: String
		}],
		browserIds: [Number]
	}],
});

module.exports = mongoose.model('Like', likeSchema);