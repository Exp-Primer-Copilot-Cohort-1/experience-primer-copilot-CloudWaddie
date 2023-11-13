// Create Web Server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Create Database Connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comment');

// Create Schema
var commentSchema = mongoose.Schema({
  _id: Number,
  name: String,
  comment: String,
  date: { type: Date, default: Date.now },
  parent: Number
});

// Create Model
var Comment = mongoose.model('Comment', commentSchema);

// Create Server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set Port
var port = process.env.PORT || 8080;

// Set Router
var router = express.Router();

// Middleware for all request
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

// Create Comment
router.route('/comments').post(function(req, res) {
  var comment = new Comment();
  comment._id = req.body._id;
  comment.name = req.body.name;
  comment.comment = req.body.comment;
  comment.parent = req.body.parent;

  comment.save(function(err) {
    if (err) res.send(err);
    res.json({ message: 'Comment created!' });
  });
});

// Get All Comments
router.route('/comments').get(function(req, res) {
  Comment.find(function(err, comments) {
    if (err) res.send(err);
    res.json(comments);
  });
});

// Get Comment By ID
router.route('/comments/:comment_id').get(function(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err) res.send(err);
    res.json(comment);
  });
});

// Update Comment By ID
router.route('/comments/:comment_id').put(function(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err) res.send(err);
    comment._id = req.body._id;
    comment.name = req.body.name;
    comment.comment = req.body.comment;
    comment.parent = req.body.parent;

    comment.save(function(err) {
      if (err) res.send(err);
      res.json({ message: 'Comment updated!' });
    });
  });
});

// Delete Comment By ID
router.route('/comments/:comment_id').delete(function(req, res) {
  Comment.remove(
    {
      _id: