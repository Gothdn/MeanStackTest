var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordSchema = new Schema({
    name : {type : String, default: ''},
    desc : {type : String, default: ''},
    created_at : Date,
    updated_at : Date
});

recordSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) 
        this.create_at = currentDate;
    next();
});

var Record = mongoose.model('Record', recordSchema);

module.exports = Record;