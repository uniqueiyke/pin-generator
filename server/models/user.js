const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {type: String, require: true, minlength: 8, maxlength: 25, unique: true, trim: true},
    email: {type: String, require: true, unique: true, trim: true},
    password: String,
    reg_date: {type: Date, default: Date.now()},
    api_key: String
})

module.exports = model('User', UserSchema);