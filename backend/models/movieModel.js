const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
    },
    durationInMilliseconds: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: "Description not available"
    }
});

const movieModel = mongoose.model('movie', movieSchema);
module.exports = movieModel;