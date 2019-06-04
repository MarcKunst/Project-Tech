const mongoose = require('mongoose');

dateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movieName: String,
    location: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

const Date = mongoose.model('Date', dateSchema);
 
module.exports = Date;