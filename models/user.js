const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    email: {
        type: String,
        lowercase: true,
        index: true,
        unique: true,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    name: {
        firstName: {
            type: String,
            lowercase: true,
            index: true,
            required: true
        },
        lastName: {
            type: String,
            lowercase: true,
            index: true
        },
    },

    age: String,

    gender: String,

    profilePicture: Buffer,

    created: {
        type: Date,
        default: Date.now
    },
});

userSchema.plugin(uniqueValidator);


const User = mongoose.model('User', userSchema);
 
module.exports = User;