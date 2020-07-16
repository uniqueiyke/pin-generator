const {Schema, model} = require('mongoose');

const CardSchema = new Schema({
    card_ser_num: {type: String, require: true, minlength: 12, uppercase: true , unique: true},
    card_pin: {type: String, require: true, unique: true},
    used: {type: Boolean, default: false},
    max_usage: {type: Number, default: 5},
    usage_count: {type: Number, default: 0},
    used_up: {type: Boolean, default: false},
    created_date: {type: Date, default: Date.now()},
    printed: {type: Boolean, default: false},
    created_by: {type: Schema.Types.ObjectId, ref: 'User'}
});


module.exports = model('Card', CardSchema);