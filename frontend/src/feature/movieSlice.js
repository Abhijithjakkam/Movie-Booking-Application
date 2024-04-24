import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../port";
const initialState = {
  recommendedMovies: [],
  selectedMovie: {
    id: "",
    name: "",
    imageUrl: "",
    description: "",
    durationInMilliseconds: "",
    durationInHours: 0,
    durationInMinutes: 0,
    allShows: [],
    availableShows: [],
    mapOfTheatresToDatesToShows: {},
    listOfTheatres: [],
    selectedTheatreIndex: 0,
    selectedTheatre: null,
    listOfDatesOfShowsOfSelectedTheatre: [],
    selectedDateIndex: 0,
    selectedDate: null,
    listOfTimesOfShowsOfSelectedTheatreAndDate: [],
    selectedTimeIndex: 0,
    selectedTime: null,
    selectedShow: null,
  }
};
export const fetchRecommendedMovies = createAsyncThunk("movie/fetchRecommendedMovies", async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/movie/recommended`);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
});
export const selectedMovie = createAsyncThunk("movie/selectedMovie", async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/movie/${id}`);
    console.log(res.data);
    return res.data;
  }
  catch (error) {
    console.log(error);
  }
});

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    selectedTheatreIndexInput: (state, action) => {
      const index = action.payload;

      if ((index < state.selectedMovie.listOfTheatres.length) && (index >= 0)) {
        state.selectedMovie.selectedTheatreIndex = index;
        state.selectedMovie.selectedTheatre = state.selectedMovie.listOfTheatres[state.selectedMovie.selectedTheatreIndex];


        const selectedTheatreId = Object.keys(state.selectedMovie.mapOfTheatresToDatesToShows)[state.selectedMovie.selectedTheatreIndex];


        const dateMap = state.selectedMovie.mapOfTheatresToDatesToShows[selectedTheatreId].dates;


        state.selectedMovie.listOfDatesOfShowsOfSelectedTheatre = Object.keys(dateMap);

        if (state.selectedMovie.listOfDatesOfShowsOfSelectedTheatre.length > 0) {
          state.selectedMovie.selectedDateIndex = 0;
          state.selectedMovie.selectedDate = state.selectedMovie.listOfDatesOfShowsOfSelectedTheatre[state.selectedMovie.selectedDateIndex];


          state.selectedMovie.listOfTimesOfShowsOfSelectedTheatreAndDate = dateMap[state.selectedMovie.selectedDate].shows.map(show => {
            return show.timeKey;
          })

          if (state.selectedMovie.listOfTimesOfShowsOfSelectedTheatreAndDate.length > 0) {
            state.selectedMovie.selectedTimeIndex = 0;
            state.selectedMovie.selectedTime = state.selectedMovie.listOfTimesOfShowsOfSelectedTheatreAndDate[state.selectedMovie.selectedTimeIndex];
            state.selectedMovie.selectedShow = dateMap[state.selectedMovie.selectedDate].shows[state.selectedMovie.selectedTimeIndex];
          }
          else {
            state.selectedMovie.selectedTimeIndex = 0;
            state.selectedMovie.selectedTime = null;
            state.selectedMovie.selectedShow = null;
          }
        }
        else {
          state.selectedMovie.selectedDateIndex = 0;
          state.selectedMovie.selectedDate = null;
          state.selectedMovie.selectedTimeIndex = 0;
          state.selectedMovie.selectedTime = null;
          state.selectedMovie.selectedShow = null;
        }
      }
    },
    selectedDateIndexInput: (state, action) => {
      const index = action.payload;

      if ((index < state.selectedMovie.listOfDatesOfShowsOfSelectedTheatre.length) && (index >= 0)) {

        const selectedTheatreId = Object.keys(state.selectedMovie.mapOfTheatresToDatesToShows)[state.selectedMovie.selectedTheatreIndex];

        const dateMap = state.selectedMovie.mapOfTheatresToDatesToShows[selectedTheatreId].dates;

        state.selectedMovie.selectedDateIndex = index;
        state.selectedMovie.selectedDate = state.selectedMovie.listOfDatesOfShowsOfSelectedTheatre[state.selectedMovie.selectedDateIndex];


        state.selectedMovie.listOfTimesOfShowsOfSelectedTheatreAndDate = dateMap[state.selectedMovie.selectedDate].shows.map(show => {
          return show.timeKey;
        })

        if (state.selectedMovie.listOfTimesOfShowsOfSelectedTheatreAndDate.length > 0) {
          state.selectedMovie.selectedTimeIndex = 0;
          state.selectedMovie.selectedTime = state.selectedMovie.listOfTimesOfShowsOfSelectedTheatreAndDate[state.selectedMovie.selectedTimeIndex];
          state.selectedMovie.selectedShow = dateMap[state.selectedMovie.selectedDate].shows[state.selectedMovie.selectedTimeIndex];
        }
        else {
          state.selectedMovie.selectedTimeIndex = 0;
          state.selectedMovie.selectedTime = null;
          state.selectedMovie.selectedShow = null;
        }
      }
    },
    selectedTimeIndexInput: (state, action) => {
      const index = action.payload;

      if ((index < state.selectedMovie.listOfTimesOfShowsOfSelectedTheatreAndDate.length) && (index >= 0)) {

        const selectedTheatreId = Object.keys(state.selectedMovie.mapOfTheatresToDatesToShows)[state.selectedMovie.selectedTheatreIndex];

        const dateMap = state.selectedMovie.mapOfTheatresToDatesToShows[selectedTheatreId].dates;

        state.selectedMovie.selectedDateIndex = index;
        state.selectedMovie.selectedDate = state.selectedMovie.listOfDatesOfShowsOfSelectedTheatre[state.selectedMovie.selectedDateIndex];


        const shows = dateMap[state.selectedMovie.selectedDate].shows;

        state.selectedMovie.selectedTimeIndex = index;
        state.selectedMovie.selectedTime = shows[state.selectedMovie.selectedTimeIndex].timeKey;
        state.selectedMovie.selectedShow = dateMap[state.selectedMovie.selectedDate].shows[state.selectedMovie.selectedTimeIndex];
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchRecommendedMovies.fulfilled, (state, action) => {
      state.recommendedMovies = action.payload;
    });
    builder.addCase(selectedMovie.fulfilled, (state, action) => {
      state.selectedMovie.id = action.payload.id;
      state.selectedMovie.name = action.payload.name;
      state.selectedMovie.imageUrl = action.payload.imageUrl;
      state.selectedMovie.description = action.payload.description;
      state.selectedMovie.durationInMilliseconds = action.payload.durationInMilliseconds;
      state.selectedMovie.allShows = action.payload.shows;


      state.selectedMovie.durationInHours = Math.floor(state.selectedMovie.durationInMilliseconds / (3600 * 1000));
      state.selectedMovie.durationInMinutes = Math.floor((state.selectedMovie.durationInMilliseconds % (3600 * 1000)) / (60 * 1000));


      state.selectedMovie.availableShows = [];
      state.selectedMovie.mapOfTheatresToDatesToShows = {};
      state.selectedMovie.listOfTheatres = [];
      state.selectedMovie.selectedTheatreIndex = 0;
      state.selectedMovie.selectedTheatre = null;
      state.selectedMovie.listOfDatesOfShowsOfSelectedTheatre = [];
      state.selectedMovie.selectedDateIndex = 0;
      state.selectedMovie.selectedDate = null;
      state.selectedMovie.listOfTimesOfShowsOfSelectedTheatreAndDate = [];
      state.selectedMovie.selectedTimeIndex = 0;
      state.selectedMovie.selectedTime = null;
      state.selectedMovie.selectedShow = null;

      const formatter = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full"
      });


      state.selectedMovie.allShows.forEach((show) => {

        if ((show.startTimeTimestamp > Date.now()) && (show.emptySeats.length > 0)) {
          state.selectedMovie.availableShows.push(show);
          const theatreId = show.theatreId;


          const dateObj = new Date(show.startTimeTimestamp);

          const dateKey = formatter.format(dateObj);
          state.selectedMovie.mapOfTheatresToDatesToShows[theatreId] = state.selectedMovie.mapOfTheatresToDatesToShows[theatreId] || {
            name: show.theatre.name,
            dates: {}
          };
          state.selectedMovie.mapOfTheatresToDatesToShows[theatreId].dates[dateKey] = state.selectedMovie.mapOfTheatresToDatesToShows[theatreId][dateKey] || {
            dateKey,
            shows: []
          };

          const hours = dateObj.getHours();
          const hoursString = hours < 10 ? "0" + hours.toString() : hours.toString();
          const minutes = dateObj.getMinutes();
          const minutesString = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
          state.selectedMovie.mapOfTheatresToDatesToShows[theatreId].dates[dateKey].shows.push({
            ...show,
            timeKey: hoursString + ":" + minutesString
          });
        }
      });

      state.selectedMovie.listOfTheatres = Object.keys(state.selectedMovie.mapOfTheatresToDatesToShows)
        .map(theatreId => {
          return state.selectedMovie.mapOfTheatresToDatesToShows[theatreId].name
        })

      if (state.selectedMovie.listOfTheatres.length > 0) {
        state.selectedMovie.selectedTheatreIndex = 0;
        state.selectedMovie.selectedTheatre = state.selectedMovie.listOfTheatres[state.selectedMovie.selectedTheatreIndex];


        const selectedTheatreId = Object.keys(state.selectedMovie.mapOfTheatresToDatesToShows)[state.selectedMovie.selectedTheatreIndex];


        const dateMap = state.selectedMovie.mapOfTheatresToDatesToShows[selectedTheatreId].dates;


        state.selectedMovie.listOfDatesOfShowsOfSelectedTheatre = Object.keys(dateMap);

        if (state.selectedMovie.listOfDatesOfShowsOfSelectedTheatre.length > 0) {
          state.selectedMovie.selectedDateIndex = 0;
          state.selectedMovie.selectedDate = state.selectedMovie.listOfDatesOfShowsOfSelectedTheatre[state.selectedMovie.selectedDateIndex];


          state.selectedMovie.listOfTimesOfShowsOfSelectedTheatreAndDate = dateMap[state.selectedMovie.selectedDate].shows.map(show => {
            return show.timeKey;
          })

          if (state.selectedMovie.listOfTimesOfShowsOfSelectedTheatreAndDate.length > 0) {
            state.selectedMovie.selectedTimeIndex = 0;
            state.selectedMovie.selectedTime = state.selectedMovie.listOfTimesOfShowsOfSelectedTheatreAndDate[state.selectedMovie.selectedTimeIndex];
            state.selectedMovie.selectedShow = dateMap[state.selectedMovie.selectedDate].shows[state.selectedMovie.selectedTimeIndex];
          }
        }
      }

    });
  },
});
export const {
  selectedTheatreIndexInput,
  selectedDateIndexInput,
  selectedTimeIndexInput
} = movieSlice.actions;
export default movieSlice.reducer;
