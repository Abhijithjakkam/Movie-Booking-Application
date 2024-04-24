import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../port";
const initialState = {
    allTickets: [],
    pastTickets:[],
    upcomingTickets:[],
    selectedTicket: {
        id: "",
        userId: "",
        showId: "",
        bookedSeats: [],
        user: {
            id: "",
            email: "",
            name: "",
            googleId: "",
            isAdmin: false
        },
        show: {
            id: "",
            movieId: "",
            theatreId: "",
            startTimeTimestamp: 0,
            endTimeTimestamp: 0,
            totalSeats: 0,
            emptySeats: [],
            movie: {
                id: "",
                name: "",
                imageUrl: "",
                description: "",
                durationInMilliseconds: 0
            },
            theatre: {
                id: "",
                name: "",
                totalSeats: 0
            }
        }
    },
    lastBookedTicket:{
        id:""
    }
};
export const fetchAllTickets = createAsyncThunk("ticket/fetchAllTickets", async () => {
    try {
        const res = await axios.get(`${BASE_URL}/api/booking/my_bookings`);
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
});
export const selectedTicket = createAsyncThunk("ticket/selectedTicket", async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/booking/${id}`);
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
});

export const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        setLastBookedTicket: (state,action)=>{
            state.lastBookedTicket.id=action.payload.id;
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchAllTickets.fulfilled, (state, action) => {
            state.allTickets = action.payload;

            state.pastTickets=[];
            state.upcomingTickets=[];
            const nowTimestamp = new Date().getTime();
            state.allTickets.forEach(booking=>{
                const startTimeTimestamp = booking?.show?.startTimeTimestamp;
                if(typeof(startTimeTimestamp)=="number")
                {
                    if(startTimeTimestamp>nowTimestamp)
                    {
                        state.upcomingTickets.push(booking);
                    }
                    else
                    {
                        state.pastTickets.push(booking);
                    }
                }
            })
        });
        builder.addCase(selectedTicket.fulfilled, (state, action) => {
            state.selectedTicket = action.payload;
        });
    },
});
export const {
    setLastBookedTicket
} = ticketSlice.actions;
export default ticketSlice.reducer;
