// create web server
// http://localhost:3000/comments
// http://localhost:3000/comments/1

var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');

// get data from json file
var commentsPath = path.join(__dirname, '../data/comments.json');
var comments = JSON.parse(fs.readFileSync(commentsPath, 'utf8'));

// get all comments
router.get('/', function(req, res) {
  res.json(comments);
});

// get a comment by id
router.get('/:id', function(req, res) {
  var commentId = req.params.id;
  var comment = comments.filter(function(comment) {
    return comment.id == commentId;
  });
  res.json(comment);
});

// add a new comment
router.post('/', function(req, res) {
  var newComment = req.body;
  comments.push(newComment);
  fs.writeFile(commentsPath, JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(comments);
});

// update a comment by id
router.put('/:id', function(req, res) {
  var commentId = req.params.id;
  var comment = comments.filter(function(comment) {
    return comment.id == commentId;
  })[0];
  var commentIndex = comments.indexOf(comment);
  var updatedComment = Object.assign(comment, req.body);
  comments.splice(commentIndex, 1, updatedComment);
  fs.writeFile(commentsPath, JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(comments);
});

// delete a comment by id
router.delete('/:id', function(req, res) {
  var commentId = req.params.id;
  var comment = comments.filter(function(comment) {
    return comment.id == commentId;
  })[0];
  var commentIndex = comments.indexOf(comment);
  comments.splice(commentIndex, 1);
  fs.writeFile(commentsPath, JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(comments);
});

module.exports = router;