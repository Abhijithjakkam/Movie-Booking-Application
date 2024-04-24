const express = require('express');
const adminTheatreRouter = express.Router();
const {addTheatre, getAllTheatres, editTheatre, deleteTheatre} = require('../adminControllers/adminTheatreControllers')

// name : {
//     type:String,
//     required: true
// },
// totalSeats:{
//     type:Number,
//     required:true
// }


// POST /api/admin/add_theatre
// Add a theatre
adminTheatreRouter.post('/add_theatre', addTheatre);

// GET /api/admin/all_theatres
// Get all theatres
adminTheatreRouter.get('/all_theatres', getAllTheatres);

// PUT /api/admin/theatre/:theatre_id
// Edit a theatre
adminTheatreRouter.put('/theatre/:theatre_id', editTheatre);

// DELETE /api/admin/theatre/:theatre_id
// Delete a theatre
adminTheatreRouter.delete('/theatre/:theatre_id', deleteTheatre);

module.exports = {adminTheatreRouter};
