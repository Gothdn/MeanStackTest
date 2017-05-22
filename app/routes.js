 // app/routes.js

var express = require('express');
var router = express.Router();
var recordHandler = require('./route/record');

router.use('/api/record', recordHandler);

router.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
    console.log()
});

module.exports = router;