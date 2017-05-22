var express = require('express');
var router = new express.Router();
var Record = require('./../models/record');

router.post('', function(req, res) {
    var newRecord = Record({
        name: req.body.name,
        desc: req.body.desc
    });

    newRecord.save(function(err) {
        if (err) 
            throw err;
        else
            res.send({message: "ok"});
    });
});

router.get('', function(req, res) {
    Record.find(function(err, records) {
        if (err)
            res.send(err);

        res.json(records); // return all nerds in JSON format
    });
});

router.delete('/:id', function(req,res) {
    Record.findByIdAndRemove(req.params.id, function(err) {
        if (err) 
           res.send(err);
        else
            res.send({message: "ok"});
    });
});

module.exports = router;