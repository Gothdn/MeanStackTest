var express = require('express');
var router = new express.Router();
var Permission = require('./../../models/permission');

router.post('', function(req, res) {
    Permission.count({}, function(err, count) {
        if (err)
            res.send(err);

        var newPermission = Permission({
            name: req.body.name,
            desc: req.body.desc,
            value: Math.pow(2, count)
        });

        newPermission.save(function(err) {
            if (err) 
                res.send(err);
            else
                res.send({message: "new permission created"});
        });
    });
});

router.delete('/:id', function(req,res) {
    Permission.findByIdAndRemove(req.params.id, function(err) {
        if (err) 
            res.send(err);
        else
            res.send({message: "permission deleted"});
    });
});

router.get('/', function(req, res) {
    Permission.find(function(err, permissions) {
        if (err)
            res.send(err);

        res.json(permissions);
    });
});

router.get('/:value', function(req, res) {
    Permission.findOne({value: value}, function(err, permission) {
        if (err)
            res.send(err);

        res.json(permission);
    });
});

/*router.get('/count', function(req, res) {
    Permission.count({}, function(err, count) {
        if (err)
            res.send(err);

        res.json({count : count});
    });
});*/

module.exports = router;