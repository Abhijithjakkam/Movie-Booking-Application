const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    showId : {
        type:String,
        required:true
    },
    userId : {
        type:String,
        required:true
    },
    bookedSeats : {
        type:[Number],
        required:true
    }
});

const bookingModel = mongoose.model('booking', bookingSchema);
module.exports = bookingModel;