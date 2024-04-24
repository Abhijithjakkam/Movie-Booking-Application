const express = require('express')
const movieRouter = express.Router();
const { searchMoviesbyName, recommendedMovies, searchMoviebyId } = require('../controllers/movieControllers.js');



// GET /api/movie/search/:search_text
// Search movies by movieName
movieRouter.get('/search/:search_text', searchMoviesbyName)
 
// GET /api/movie/recommended
// Get recommended movies
movieRouter.get('/recommended', recommendedMovies)

// GET /api/movie/:movie_id/
// search movie by movieId
movieRouter.get('/:movie_id', searchMoviebyId)

module.exports = {movieRouter};