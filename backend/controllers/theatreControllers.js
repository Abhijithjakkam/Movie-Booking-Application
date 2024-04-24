const { isObjectIdOrHexString } = require('mongoose');
const theatreModel = require('../models/theatreModel.js');
const { formatTheatreToSend } = require('../utils/databaseUtils.js');

// searching theatre by theatreId 
async function searchTheaterbyId (req, res){
    try {
        const theatreId = req.params.theatre_id;

        if(!isObjectIdOrHexString(theatreId))
        {
            return res.status(400).json({
                message:"Please provide a valid 24 character theatreId"
            })
        }
        const theatre = await theatreModel.findById(theatreId);

        if (!theatre) {
            return res.status(404).json({ message: 'Theatre not found' });
        }

        return res.status(200).json(formatTheatreToSend(theatre));
    } catch (error) {
        return res.status(500).json({ message: 'Failed to retrieve theatre details' });
    }
}

module.exports = {searchTheaterbyId}