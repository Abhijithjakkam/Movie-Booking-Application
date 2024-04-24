const express = require('express');
const theatreRouter = express.Router();
const {searchTheaterbyId} = require('../controllers/theatreControllers.js')


// GET /api/theatre/:theatre_id
// searching theatre by theatreId
theatreRouter.get('/:theatre_id', searchTheaterbyId);

module.exports = {theatreRouter};