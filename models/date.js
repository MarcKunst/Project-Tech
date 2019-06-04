const mongoose = require('mongoose');

dateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movieName: String,
    location: String
});

let Date = mongoose.model('Date', dateSchema);
 
module.exports = Date;