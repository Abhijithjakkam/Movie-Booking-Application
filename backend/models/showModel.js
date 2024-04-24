const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie'
    },
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'theatre'
    },
    startTimeTimestamp: {
        type: Number,
        required: true
    },
    endTimeTimestamp: {
        type: Number,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    emptySeats: {
        type: [Number],
        required: true
    }

})

const showModel = mongoose.model('show', showSchema);
module.exports = showModel;