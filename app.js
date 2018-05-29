var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
Genre = require('./models/genres');
Book = require('./models/books');
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Hi There');
});

app.get('/api/genres/',function(req, res){
	Genre.getGenres(function(err, genres){
			if(err){
				throw err;
			}
			res.json(genres);
	});
});

app.post('/api/genres/',function(req, res){
	var genre = req.body;
	Genre.addGenres(genre, function(err, genre){
			if(err){
				throw err;
			}
			res.json(genre);
	});
});

app.get('/api/books/',function(req, res){
	Book.getBooks(function(err, books){
			if(err){
				throw err;
			}
			res.json(books);
	});
});

app.get('/api/books/:_id',function(req, res){
	Book.getBookById(req.params._id,function(err, books){
			if(err){
				throw err;
			}
			res.json(books);
	});
});

app.listen(3000);
console.log('Started on port 3000');