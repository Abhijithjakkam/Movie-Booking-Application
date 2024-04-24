const express = require('express');
const showRouter = express.Router();
const {searchShowbyId} = require('../controllers/showControllers.js')


// GET /api/shows/:show_id
// searching a specific show by showId
showRouter.get('/:show_id', searchShowbyId);

module.exports = {showRouter};