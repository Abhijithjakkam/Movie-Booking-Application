const { formatShowToSend, formatMovieToSend, formatTheatreToSend } = require('../utils/databaseUtils.js');

//importing required models
const movieModel = require('../models/movieModel.js');
const showModel = require('../models/showModel.js');
const theatreModel = require('../models/theatreModel.js');
const { isObjectIdOrHexString } = require('mongoose');

//Makes the string safe to put into a regex for database searching
function escapeRegExp(stringToGoIntoTheRegex) {
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

// Search movies by movieName
async function searchMoviesbyName(req, res) {
    try {
        const searchText = req.params.search_text;
        if ((!searchText) || (searchText.length < 3)) {
            return res.status(400).json({
                message: "Please give a search string with atleast 3 characters"
            })
        }
        const movies = await movieModel.find({ name: { $regex: new RegExp(escapeRegExp(searchText)), $options: 'i' } }).limit(4);

        if (!movies) {
            return res.status(404).json({ message: 'Movie not Found' });
        }
        return res.status(200).json(movies.map(movie => formatMovieToSend(movie)));

    } catch (error) {
        return res.status(500).json({ message: 'Oops! Try again after sometime'});
    }
}

// Get recommended movies
async function recommendedMovies(req, res) {
    try {
        const movies = await movieModel.find().limit(20);
        if (!movies) {
            return res.status(404).json({ message: 'Movie not Found' });
        }
        return res.status(200).json(movies.map(movie => formatMovieToSend(movie)));
    } catch (error) {
        return res.status(500).json({ message: 'Oops! Try again after sometime' });
    }

}

// serch movie by movieId
async function searchMoviebyId(req, res) {
    try {
        const movieId = req.params.movie_id;

        if (!isObjectIdOrHexString(movieId)) {
            return res.status(400).json({
                message: "Please provide a valid 24 character hex string movie id"
            })
        }

        const foundMovie = await movieModel.findById(movieId);
        if (!foundMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        else {
            const shows = await showModel.find({ movieId });

            const theareIDsOfShows = shows.map(show=>{
                const theatreId = show.theatreId;
                if(!isObjectIdOrHexString(theatreId))
                {
                    return null;
                }
                return theatreId;
            })
            const theatresOfShows = await theatreModel.find({_id:{$in:theareIDsOfShows}});
            const mapOfTheatres ={};
            theatresOfShows.map(theatre=>{
                mapOfTheatres[theatre._id]=theatre;
            })
            let showsWithTheatres = shows.map(show => formatShowToSend(show)).map(show => {
                const theatreId = show.theatreId;
                if(!isObjectIdOrHexString(theatreId))
                {
                    return null;
                }
                const theatre = mapOfTheatres[theatreId];
                if (theatre) {
                    return {
                        ...show,
                        theatre: formatTheatreToSend(theatre)
                    };
                }
                else {
                    return null;
                }
            })


            showsWithTheatres = showsWithTheatres.filter(show => {
                return Boolean(show)
            })
            
            res.status(200).json({
                ...formatMovieToSend(foundMovie),
                shows: showsWithTheatres
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Oops! Try again after sometime' });
    }
}

module.exports = { searchMoviesbyName, recommendedMovies, searchMoviebyId };

