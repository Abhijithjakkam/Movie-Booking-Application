const formatMovieToSend = (movie) => {
    if(typeof(movie)!=="object")
    {
        movie={};
    }
    if(!movie)
    {
        movie={};
    }
    return ({
        id: movie._id,
        name: movie.name,
        imageUrl: movie.imageUrl,
        description: movie.description,
        durationInMilliseconds: movie.durationInMilliseconds
    })
}


const formatTheatreToSend=(theatre) => {
    if(typeof(theatre)!=="object")
    {
        theatre={};
    }
    if(!theatre)
    {
        theatre={};
    }
    return {
        id: theatre._id,
        name: theatre.name,
        totalSeats: theatre.totalSeats
    }
}


const formatShowToSend = (show) => {
    if(typeof(show)!=="object")
    {
        show={};
    }
    if(!show)
    {
        show={};
    }
    return ({
        id: show._id,
        movieId: show.movieId,
        theatreId: show.theatreId,
        startTimeTimestamp: show.startTimeTimestamp,
        endTimeTimestamp: show.endTimeTimestamp,
        totalSeats: show.totalSeats,
        emptySeats: show.emptySeats
    })
}


module.exports = { formatMovieToSend, formatShowToSend, formatTheatreToSend }