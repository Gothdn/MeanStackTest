 // app/routes.js

var express = require('express');
var router = express.Router();
var recordHandler = require('./api/record');
var userHandler = require('./api/user');
var roleHandler = require('./api/role');
var permissionHandler = require('./api/permission');

router.use('/api/record', recordHandler);
router.use('/api/user', userHandler);
router.use('/api/role', roleHandler);
router.use('/api/permission', permissionHandler);

router.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
    console.log()
});

module.exports = router;
