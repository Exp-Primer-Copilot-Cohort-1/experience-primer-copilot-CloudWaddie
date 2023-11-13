//Create Web Server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Set Port
app.set('port', (process.env.PORT || 5000));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

// Set Views Folder
app.set('views', path.join(__dirname, 'views'));

// Set View Engine
app.set('view engine', 'ejs');

// Index Page
app.get('/', function(req, res){
	res.render('index', {
		title: 'Comments'
	});
});

// Comments Page
app.get('/comments', function(req, res){
	res.render('comments', {
		title: 'Comments'
	});
});

// Comments Page
app.post('/comments', urlencodedParser, function(req, res){
	console.log(req.body);
	res.render('comments', {
		title: 'Comments'
	});
});

// Get Comments
app.get('/getComments', function(req, res){
	fs.readFile(__dirname + '/data/comments.json', 'utf8', function(err, data){
		res.send(data);
	});
});

// Start Server
app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});