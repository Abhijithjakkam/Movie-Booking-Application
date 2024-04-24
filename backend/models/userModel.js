const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        default: "Name not Set"
    },
    googleId: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;