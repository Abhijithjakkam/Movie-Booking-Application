// importing the required modules
const movieModel = require('../models/movieModel.js');
const { formatMovieToSend } = require('../utils/databaseUtils.js');

// Add a new movie
async function addMovie(req, res) {
    try {
        // Extract movie details from the request body
        const { name, imageUrl, description, durationInMilliseconds } = req.body;


        //Validate the input
        if ((!name) || (typeof (name) !== "string")) {
            return res.status(400).json({ message: "Please provide a valid name" });
        }

        if ((!durationInMilliseconds) || (typeof (durationInMilliseconds) !== "number")) {
            return res.status(400).json({ message: "Please provide a valid duration" });
        }

        if ((description !== undefined) && (typeof (description) !== "string")) {
            return res.status(400).json({ message: "Description can only be a string" });
        }
        if ((imageUrl !== undefined) && (typeof (imageUrl) !== "string")) {
            return res.status(400).json({ message: "ImageUrl can only be a string" });
        }

        // Create and Save the new movie to the database
        const savedMovie = await movieModel.create({
            name,
            imageUrl,
            description,
            durationInMilliseconds
        });

        return res.status(201).json(formatMovieToSend(savedMovie));
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create a new movie' });
    }
}

// Get all movies
async function getAllMovies(req, res) {
    try {
        const movies = await movieModel.find();
        return res.status(200).json(movies.map(movie => formatMovieToSend(movie)));
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve movies' });
    }
}

// Edit a movie
async function editMovie(req, res) {
    try {
        const movieId = req.params.movie_id;

        // Extract movie details from the request body
        // Note: updating duration not allowed on purpose
        const { name, imageUrl, description, durationInMilliseconds } = req.body;

        const editParams={};

        //Validate the input
        if ((name !== undefined) &&(typeof (name) !== "string")) {
            return res.status(400).json({ message: "Please provide a valid name" });
        }

        if ((description !== undefined) && (typeof (description) !== "string")) {
            return res.status(400).json({ message: "Description can only be a string" });
        }
        if ((imageUrl !== undefined) && (typeof (imageUrl) !== "string")) {
            return res.status(400).json({ message: "ImageUrl can only be a string" });
        }

        if(name)
        {
            editParams.name=name;
        }
        if(imageUrl)
        {
            editParams.imageUrl=imageUrl;
        }
        if(description)
        {
            editParams.description=description;
        }

        const updatedMovie = await movieModel.findByIdAndUpdate(movieId, editParams, {
            new: true
        })

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        if (durationInMilliseconds !== undefined) {
            return res.status(200).json({ ...formatMovieToSend(updatedMovie), message: "Can't edit duration as it breaks consistency" });
        }
        return res.status(200).json(formatMovieToSend(updatedMovie));
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update movie details' });
    }
}

// Delete a movie
async function deleteMovie(req, res) {
    try {
        const movieId = req.params.movie_id;
        const deletedMovie = await movieModel.findByIdAndDelete(movieId);

        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.status(200).json(formatMovieToSend(deletedMovie));
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete the movie' });
    }
}

module.exports = { addMovie, getAllMovies, editMovie, deleteMovie }