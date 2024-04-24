// importing required models
const showModel = require('../models/showModel.js');
const movieModel = require('../models/movieModel.js');
const theatreModel = require('../models/theatreModel.js');

// importing required admin routes
const { formatShowToSend, formatMovieToSend, formatTheatreToSend } = require('../utils/databaseUtils.js');
const { isObjectIdOrHexString } = require('mongoose');

// searching a specific show by showId
async function searchShowbyId(req, res) {
    try {
        const showId = req.params.show_id;

        if (!isObjectIdOrHexString(showId)) {
            return res.status(400).json({
                message: "Please send a valid 24 character showId"
            })
        }

        const show = await showModel.findById(showId);

        if (!show) {
            return res.status(404).json({ message: 'Show not found' });
        }

        const movieId = show.movieId;

        if (!isObjectIdOrHexString(movieId)) {
            return res.status(404).json({ message: "Show not found" });
        }

        const theatreId = show.theatreId;

        if (!isObjectIdOrHexString(theatreId)) {
            return res.status(404).json({ message: "Show not found" });
        }

        const movie = await movieModel.findById(movieId);

        if(!movie)
        {
            return res.status(404).json({ message: "The movie this show is of, is deleted" });
        }

        const theatre = await theatreModel.findById(theatreId);

        if(!theatre)
        {
            return res.status(404).json({ message: "The theatre this show is of, is deleted" });
        }

        return res.status(200).json({
            ...formatShowToSend(show),
            movie: formatMovieToSend(movie),
            theatre: formatTheatreToSend(theatre)
        });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve show timing details' });
    }
}

module.exports = { searchShowbyId }