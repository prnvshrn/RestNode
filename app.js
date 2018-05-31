var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
Genre = require('./models/genres');
Book = require('./models/books');
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;
var Crawler = require("crawler");
var url = require('url');

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

app.get('/football/',function(req, res){
	var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
        }
        done();
    }
});

c.queue([{
    uri: 'https://www.premierleague.com/players/5000/players/stats',
    //uri:'https://www.whoscored.com/Players/77564/MatchStatistics/',
    jQuery: false,
 
    // The global callback won't be called
    callback: function (error, result) {
        if(error){
            console.log(error);
        }else{
            console.log('Grabbed', result.body.length, 'bytes');
            res.send(result.body);
        }
    }
}]);

});

app.get('/api/books/:_id',function(req, res){
	Book.getBookById(req.params._id,function(err, books){s
			if(err){
				throw err;
			}
			res.json(books);
	});
});

app.listen(3000);
console.log('Started on port 3000');