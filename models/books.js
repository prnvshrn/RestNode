var mongoose = require('mongoose');
var bookSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	genre:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
})

var Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.getBooks = function(callback, limit){
	Book.find(callback).limit(limit);
}

module.exports.getBookById = function(id,callback){
	Book.findById(id, callback);
}