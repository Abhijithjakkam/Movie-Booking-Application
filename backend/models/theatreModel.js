const mongoose = require('mongoose')

const theatreSchema = new mongoose.Schema({
    name : {
        type:String,
        required: true
    },
    totalSeats:{
        type:Number,
        required:true
    }
});

const theatreModel = mongoose.model('theatre', theatreSchema);
module.exports = theatreModel;