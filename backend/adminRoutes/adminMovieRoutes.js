const express = require('express');
const adminMovieRouter = express.Router();
const { addMovie, getAllMovies, editMovie, deleteMovie } = require('../adminControllers/adminMovieControllers.js')


// name: {
//     type: String,
//     required: true
// },
// imageUrl: {
//     type: String,
//     default: "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
// },
// durationInMilliseconds: {
//     type: Number,
//     required: true
// },
// description: {
//     type: String,
//     default: "Description not available"
// }

// POST /api/admin/add_movie
// Add a new movie
adminMovieRouter.post('/add_movie', addMovie);

// GET /api/admin/all_movies
// Get all movies
adminMovieRouter.get('/all_movies', getAllMovies);

// PUT /api/admin/movie/:movie_id
// Edit a movie
adminMovieRouter.put('/movie/:movie_id', editMovie);

// DELETE /api/admin/movie/:movie_id
// Delete a movie
adminMovieRouter.delete('/movie/:movie_id', deleteMovie);

module.exports = { adminMovieRouter };