const express = require('express');
const bookingRouter = express.Router();
const bookingModel = require('../models/bookingModel.js');
const bodyParser = require('body-parser');
const showModel = require('../models/showModel.js');
const userModel = require('../models/userModel.js');
const movieModel = require('../models/movieModel.js');
const theatreModel = require('../models/theatreModel.js');

const { formatShowToSend, formatMovieToSend, formatTheatreToSend } = require('../utils/databaseUtils.js');
const { isObjectIdOrHexString } = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



function binarySearchFindIndex(array, valueToFind) {

    let start = 0, end = array.length - 1;

    while (start <= end) {

        let mid = Math.floor((start + end) / 2);

        if (array[mid] === valueToFind) {
            return mid;
        }
        else if (array[mid] < valueToFind) {
            start = mid + 1;
        }
        else {
            end = mid - 1;
        }
    }

    return -1;
}


const formatBookingToSend = (booking) => {
    return ({
        id: booking._id,
        userId: booking.userId,
        showId: booking.showId,
        bookedSeats: booking.bookedSeats,
    })
}

module.exports.formatBookingToSend = formatBookingToSend;

const formatUserToSend = (user) => {
    return ({
        id: user._id,
        email: user.email,
        name: user.name,
        googleId: user.googleId,
        isAdmin: user.isAdmin,
    })
}

module.exports.formatUserToSend = formatUserToSend;


// POST /api/booking/book
// Book the seats by showId and booked seat numbers array (in post request object)
// userId is fetched from cookie 
bookingRouter.post('/book', async (req, res) => {
    // Logic to handle movie booking
    try {

        const userDetails = req.body?.userDetails;
        if (!userDetails) {
            return res.status(403).json({
                message: "Please sign in first"
            })
        }
        const userId = userDetails?._id;

        if (!userId) {
            return res.status(403).json({
                message: "Unknown issue with your account, please contact customer care"
            })
        }

        const { showId, seatNumbers } = req.body;

        if (!seatNumbers) {
            return res.status(400).json({
                message: "Please select some seats before booking!"
            })
        }

        if (seatNumbers.length === 0) {
            return res.status(400).json({
                message: "Please select some seats before booking!"
            })
        }

        const show = await showModel.findById(showId);

        if (!show) {
            return res.status(404).json({ message: 'Show not found' });
        }

        const emptySeats = show.emptySeats;

        emptySeats.sort((a, b) => a - b);

        let areSeatsAvailable = true;
        const seatIndicesToRemove = new Set();


        seatNumbers.every(seat => {
            const index = binarySearchFindIndex(emptySeats, seat);

            if (index === -1) {
                areSeatsAvailable = false;
                return false;
            }

            seatIndicesToRemove.add(index);
            return true;
        })

        if (!areSeatsAvailable) {
            return res.status(403).json({
                message: "Sorry, seats are no longer available!"
            })
        }

        show.emptySeats = emptySeats.filter((_, index) => {
            if (seatIndicesToRemove.has(index)) {
                return false;
            }
            return true;
        })

        const savedShow = await show.save();

        if (!savedShow) {
            return res.status(500).json({
                message: "Something went wrong while booking, please try again later"
            })
        }

        const savedBooking = await bookingModel.create({
            userId,
            showId,
            bookedSeats: seatNumbers,
        });

        if (!savedBooking) {
            return res.status(500).json({
                message: "Something went wrong while booking, please try again later"
            })
        }

        return res.status(201).json(formatBookingToSend(savedBooking));
    } catch (error) {
        return res.status(500).json({ message: 'Oops! Something went wrong. Try again later.' });
    }
});

//GET /api/booking/my_bookings
bookingRouter.get("/my_bookings", async (req, res) => {
    try {
        const userId = req.body?.userDetails?._id;

        if (!isObjectIdOrHexString(userId)) {
            return res.status(403).send({
                message: "Please login"
            })
        }


        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(403).send({
                message: "This account has been deleted"
            })
        }

        const bookings = await bookingModel.find({ userId });

        const respectiveShows = await Promise.all(bookings.map(async booking => {
            const showId = booking.showId;

            const show = await showModel.findById(showId);
            return show;
        }))

        const respectiveMovies = await Promise.all(respectiveShows.map(async show => {
            const movieId = show?.movieId;

            const movie = await movieModel.findById(movieId);
            return movie;
        }))

        const respectiveTheatres = await Promise.all(respectiveShows.map(async show => {
            const theatreId = show?.theatreId;

            const theatre = await theatreModel.findById(theatreId);
            return theatre;
        }))

        const bookingsWithShowMovieAndTheatre = bookings.map((booking, index) => {
            if ((respectiveShows[index]) && (respectiveMovies[index]) && (respectiveTheatres[index])) {
                return {
                    ...formatBookingToSend(booking),
                    user: formatUserToSend(user),
                    show: {
                        ...formatShowToSend(respectiveShows[index]),
                        movie: formatMovieToSend(respectiveMovies[index]),
                        theatre: formatTheatreToSend(respectiveTheatres[index])
                    }
                }
            }
            return null;
        }).filter(show => Boolean(show));

        res.status(200).send(bookingsWithShowMovieAndTheatre);

    }
    catch (error) {
        return res.status(500).json({
            message: "Oops! Something went wrong. Try again later!",
        })
    }
})

//GET /api/booking/:booking_id
bookingRouter.get("/:booking_id", async (req, res) => {
    try {
        const bookingId = req.params.booking_id;
        const booking = await bookingModel.findById(bookingId);

        if (!booking) {
            return res.status(404).send({
                message: "Booking not found"
            })
        }

        const userId = booking.userId;


        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(403).send({
                message: "This account has been deleted"
            })
        }

        if ((!user._id.equals(req.body?.userDetails?._id)) && (req.body?.userDetails?.isAdmin !== true)) {
            return res.status(403).send({
                message: "You can only view your own bookings"
            })
        }

        const showId = booking.showId;

        const show = await showModel.findById(showId);

        if (!show) {
            return res.status(403).send({
                message: "This show has been deleted"
            })
        }

        const movieId = show.movieId;

        const movie = await movieModel.findById(movieId);

        if (!movie) {
            return res.status(403).send({
                message: "This movie has been deleted"
            })
        }

        const theatreId = show.theatreId;

        const theatre = await theatreModel.findById(theatreId);

        if (!theatre) {
            return res.status(403).send({
                message: "This theatre has been deleted"
            })
        }

        res.status(200).send({
            ...formatBookingToSend(booking),
            user: formatUserToSend(user),
            show: {
                ...formatShowToSend(show),
                movie: formatMovieToSend(movie),
                theatre: formatTheatreToSend(theatre)
            }
        })

    }
    catch (error) {
        return res.status(500).json({
            message: "Oops! Something went wrong. Try again later!",
        })
    }
})



module.exports = { bookingRouter };
