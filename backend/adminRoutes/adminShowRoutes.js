const express = require('express');
const adminShowRouter = express.Router();
const {addShow, getAllShows, editShow, deleteShow} = require('../adminControllers/adminShowControllers.js')

// movieId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'movie'
// },
// theatreId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'theatre'
// },
// startTimeTimestamp: {
//     type: Number,
//     required: true
// },
// endTimeTimestamp: {
//     type: Number,
//     required: true
// },
// totalSeats: {
//     type: Number,
//     required: true
// },
// emptySeats: {
//     type: [Number],
//     required: true
// }


// POST /api/admin/add_show
// Add a new show
adminShowRouter.post('/add_show', addShow);

// GET /api/admin/all_shows
// Get all shows
adminShowRouter.get('/all_shows', getAllShows);


// PUT /api/admin/show/:show_id
// Edit a show
adminShowRouter.put('/show/:show_id', editShow);

// DELETE /api/admin/shows/:show_id
// Delete a show
adminShowRouter.delete('/show/:show_id', deleteShow);

module.exports = {adminShowRouter};