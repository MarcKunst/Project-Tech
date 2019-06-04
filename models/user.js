const mongoose = require('mongoose');

userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    age: String,
    gender: String,
    profilePicture: Buffer,
    created: {
        type: Date,
        default: Date.now
    }
});

let User = mongoose.model('User', userSchema);
 
module.exports = User;