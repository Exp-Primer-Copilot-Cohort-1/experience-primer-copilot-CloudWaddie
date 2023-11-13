// Create web server
var express = require('express');
var router = express.Router();
// Create database connection
var connection = require('./connectDatabase.js');

// Get comments from database
router.get('/', function(req, res) {
    connection.query('SELECT * FROM comments', function(err, rows, fields) {
        if (err) {
            console.log(err);
        }
        res.json(rows);
    });
});

// Add comments to database
router.post('/', function(req, res) {
    var comment = req.body;
    connection.query('INSERT INTO comments SET ?', comment, function(err, result) {
        if (err) {
            console.log(err);
        }
        res.json(result);
    });
});

// Delete comments from database
router.delete('/:id', function(req, res) {
    var id = req.params.id;
    connection.query('DELETE FROM comments WHERE id = ?', id, function(err, result) {
        if (err) {
            console.log(err);
        }
        res.json(result);
    });
});

// Update comments in database
router.put('/:id', function(req, res) {
    var id = req.params.id;
    var comment = req.body;
    connection.query('UPDATE comments SET ? WHERE id = ?', [comment, id], function(err, result) {
        if (err) {
            console.log(err);
        }
        res.json(result);
    });
});

module.exports = router;