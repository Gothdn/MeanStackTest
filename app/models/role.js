var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleSchema = new Schema({
    name : {type : String, default: '', unique: true},
    desc : {type : String, default: ''},
    permission : {type : Number, default: 0},
    created_at : Date,
    updated_at : Date
});

roleSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) 
        this.create_at = currentDate;
    next();
});

var Role = mongoose.model('Role', roleSchema);

module.exports = Role;