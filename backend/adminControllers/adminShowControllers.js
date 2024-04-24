// importing require modules
const showModel = require('../models/showModel.js');
const movieModel = require('../models/movieModel.js');
const theatreModel = require('../models/theatreModel.js');
const { formatShowToSend } = require('../utils/databaseUtils.js');
const { isObjectIdOrHexString } = require('mongoose');

// Add a new show
async function addShow(req, res){
    try {

        const { movieId, theatreId, startTimeTimestamp } = req.body;

        if(!isObjectIdOrHexString(movieId))
        {
            return res.status(400).json({
                message: "Invalid Movie ID"
            })
        }

        if(!isObjectIdOrHexString(theatreId))
        {
            return res.status(400).json({
                message: "Invalid Theatre ID"
            })
        }

        if((typeof(startTimeTimestamp)!=="number"))
        {
            return res.status(400).json({
                message: "Invalid startTimeTimestamp"
            })
        }

        const movie = await movieModel.findById(movieId);

        if (!movie) {
            return res.status(400).json({
                message: "This movie doesn't exist"
            })
        }

        const theatre = await theatreModel.findById(theatreId);

        if (!theatre) {
            return res.status(400).json({
                message: "Invalid theatre ID"
            })
        }

        const savedShow = await showModel.create({
            movieId,
            theatreId,
            startTimeTimestamp,
            endTimeTimestamp: startTimeTimestamp + movie.durationInMilliseconds,
            totalSeats: theatre.totalSeats,
            emptySeats: Array.from({length: theatre.totalSeats}, (_, i) => i + 1)
        });

        return res.status(201).json(formatShowToSend(savedShow));
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create a new show timing' });
    }
}

// Get all shows
async function getAllShows(req, res){
    try {
        const shows = await showModel.find();
        return res.status(200).json(shows.map(show => formatShowToSend(show)));
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve show timings' });
    }
}

// Edit a show
async function editShow(req, res){
    try {
        const showId = req.params.show_id;

        if(!isObjectIdOrHexString(showId))
        {
            return res.status(400).json({message:"Invalid showId"});
        }

        const { movieId, theatreId, startTimeTimestamp, endTimeTimestamp, totalSeats, emptySeats } = req.body;

        let newEndTime=undefined;
        if(startTimeTimestamp)
        {
            const show=await showModel.findById(showId);
            if(!show)
            {
                return res.status(400).json({ message: 'Show not found' });
            }
            const movie=await movieModel.findById(show.movieId);
            newEndTime=startTimeTimestamp+movie.durationInMilliseconds;
        }
        const updatedShow = await showModel.findByIdAndUpdate(
            showId,
            { 
                startTimeTimestamp,
                endTimeTimestamp:newEndTime
            },
            { new: true }
        );

        if (!updatedShow) {
            return res.status(500).json({ message: 'Error while updating' });
        }

        if((movieId!==undefined)||(theatreId!==undefined)||(endTimeTimestamp!==undefined)||(totalSeats!==undefined)||(emptySeats!==undefined))
        {
            return res.status(200).json({...formatShowToSend(updatedShow),message:"movieId,theatreId,endTimeTimestamp,totalSeats or emptySeats can't be edited"});
        }
        return res.status(200).json(formatShowToSend(updatedShow));
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update show timing details' });
    }
}

// Delete a show
async function deleteShow(req, res){
    try {
        const showId = req.params.show_id;
        if(!isObjectIdOrHexString(showId))
        {
            return res.status(400).json({message:"Invalid showId"});
        }
        const deletedShow = await showModel.findByIdAndDelete(showId);

        if (!deletedShow) {
            return res.status(404).json({ message: 'Show timing not found' });
        }

        return res.status(200).json(formatShowToSend(deletedShow));
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete the show timing' });
    }
}


module.exports = {addShow, getAllShows, editShow, deleteShow}