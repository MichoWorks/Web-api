const mongoose = require('mongoose');
mongoose.pluralize(null);

const UserSchema = new mongoose.Schema({
    _id: String,
    userid: String,
    email: String,
    pass: String,
    fullname: String,
    phone: Number
});


module.exports = mongoose.model('user', UserSchema);
        