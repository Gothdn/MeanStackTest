var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName : {type : String, unique: true, required: true},
    password : {type : String, required: true},
    email : {type : String, default: ''},
    status : {type : String, default: 'pending'},
    created_at : Date,
    updated_at : Date
});

userSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) 
        this.create_at = currentDate;
    next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;