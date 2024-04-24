// importing required modules
const { isObjectIdOrHexString } = require('mongoose');
const theatreModel = require('../models/theatreModel.js');
const { formatTheatreToSend } = require('../utils/databaseUtils.js');

// Add a theatre
async function addTheatre(req, res) {
    try {
        const { name, totalSeats } = req.body;

        if (typeof (name) !== "string") {
            return res.status(400).send({ message: "Please provide a valid name" });
        }

        if (typeof (totalSeats) !== "number") {
            return res.status(400).send({ message: "Please provide a valid totalSeats" });
        }

        const savedTheatre = await theatreModel.create({
            name, totalSeats
        });

        return res.status(201).json(formatTheatreToSend(savedTheatre));
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create a new theatre' });
    }
}

// Get all theatres
async function getAllTheatres(req, res) {
    try {
        const theatres = await theatreModel.find();
        return res.status(200).json(theatres.map(theatre => formatTheatreToSend(theatre)));
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve theatres' });
    }
}

// Edit a theatre
async function editTheatre(req, res) {
    try {
        const theatreId = req.params.theatre_id;

        if (!isObjectIdOrHexString(theatreId)) {
            return res.status(400).json({ message: "Please provide a valid theatreId" });
        }

        const { name, totalSeats } = req.body;

        if (typeof (name) !== "string") {
            return res.status(400).json({ message: "Please provide a valid name" });
        }
        const updatedTheatre = await theatreModel.findByIdAndUpdate(
            theatreId,
            {
                name
            },
            { new: true } // Return the updated document
        );

        if (!updatedTheatre) {
            return res.status(404).json({ message: 'theatre not found' });
        }

        return res.status(200).json(formatTheatreToSend(updatedTheatre));
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update theatre details' });
    }
}

// Delete a theatre
async function deleteTheatre(req, res) {
    try {
        const theatreId = req.params.theatre_id;

        if (!isObjectIdOrHexString(theatreId)) {
            return res.status(400).json({ message: "Please provide a valid theatreId" });
        }
        
        const deletedTheatre = await theatreModel.findByIdAndDelete(theatreId);

        if (!deletedTheatre) {
            return res.status(404).json({ message: 'theatre not found' });
        }

        return res.status(200).json(formatTheatreToSend(deletedTheatre));
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete the theatre' });
    }
}

module.exports = { addTheatre, getAllTheatres, editTheatre, deleteTheatre }