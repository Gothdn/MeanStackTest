var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var permissionSchema = new Schema({
    name : {type : String, default: '', unique: true},
    desc : {type : String, default: ''},
    value : {type : Number, default: 1},
    created_at : Date,
    updated_at : Date
});

permissionSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at) 
        this.create_at = currentDate;
    next();
});

var Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;