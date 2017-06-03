 // app/routes.js

var express = require('express');
var router = express.Router();
var recordHandler = require('./api/record');
var userHandler = require('./api/user');

router.use('/api/record', recordHandler);
router.use('/api/user', userHandler);

router.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
    console.log()
});

module.exports = router;