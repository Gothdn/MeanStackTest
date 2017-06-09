var express = require('express');
var router = new express.Router();
var Role = require('./../../models/role');

router.post ('', function(req, res) {
	var newRole = Role({
        name: req.body.name,
        desc: req.body.desc,
        permission: 0
    });

    newRole.save(function(err) {
        console.log(newRole);
        if (err) 
            res.send(err);
        else
            res.send({message: "new role created"});
    });
});

router.delete('/:id', function(req,res) {
	Role.findByIdAndRemove(req.params.id, function(err) {
        if (err) 
            res.send(err);
        else
            res.send({message: "role deleted"});
    });
});

router.get('/', function(req, res) {
    Role.find(function(err, roles) {
        if (err)
            res.send(err);

        res.json(roles);
    });
});

router.post('/:id', function(req, res) {
    Role.findOne({_id: req.params.id}, function(err, role) {
        if (err || !role)
   	        res.send(err);
        
        role.permission = req.body.permission;
        role.save(function(err) {
	        if (err) 
	            res.send(err);
	        else
	            res.send({message: "role permission updated"});
	    });
	});
});

module.exports = router;