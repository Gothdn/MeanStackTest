var express = require('express');
var router = new express.Router();
var User = require('./../../models/user');
var passwordHash = require('password-hash');
var indexHelper = require('./indexHelper');

router.post('/signup', function(req, res) {
    var hashedPassword = passwordHash.generate(req.body.password);
    var newUser = User({
        userName : req.body.userName,
        password : hashedPassword,
        email : req.body.email,
        status : 'pending'
    });

    newUser.save(function(err) {
        if (err) 
            res.send(err);
        else {
            res.send({message: passwordHash.generate(newUser.userName)});
            //console.log(passwordHash.generate(newUser.userName));
            message = 'http://' + req.get('host') + '/api/user/activate/' + newUser.userName;
            message += '/' + passwordHash.generate(newUser.userName);
            indexHelper.sendMail(newUser.email, message);
        }
    });
});

router.get('/activate/:id/:hashed', function(req, res) {
    console.log(req.params);
    var id = req.params.id;
    var hashed = req.params.hashed;
    if (passwordHash.verify(id, hashed)) {
        User.findOne({'userName' :req.params.id}, function(err, user) {
            if (err)
                res.send(err);
            else
                if (user) {
                    user.status = 'activated';
                    user.save(function(err) {
                        if (err)
                            res.send(err);
                        else
                            res.send({message: "user activated"});
                    });
                }
        });
    }
    else
        res.send({message: "invalid tokens"})
});

router.post('/login', function(req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    
    User.findOne({userName: userName}, function(err, user) {
        if (err)
            res.send(err);

        if (user)
            if (user.status == 'activated')
                if (passwordHash.verify(password, user.password)) {
                    /*
                    req.session.uid = user.id;
                    req.session.userName = user.userName;
                    req.session.role = {
                        userName: user.userName,
                        id: user.iddd
                    };
                    */
                    res.json({message: 'logged in'});
                }
                else {
                    res.json({message: 'wrong password'});
                }
            else {
                res.json({message: 'account not activated'});
            }
        else {
            res.json({message: 'wrong user name or password 1'});   
        }
    });
});

//  TODO: Need to add validation aka admin token
router.get('/:userName', function(req, res) {
    User.findOne({userName : req.params.userName}, function(err, user) {
        if (err)
            res.send(err);

        res.json(user);
    });
});

//  TODO: Need to add validation aka admin token
router.delete('/:userName', function(req, res) {
    User.findOneAndRemove({userName : req.params.userName}, function(err, user) {
        if (err)
            res.send(err);

        res.send({message: "deleted"});
    });
});

//  TODO: Need to add validation aka admin token
router.get('/', function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
});

module.exports = router;