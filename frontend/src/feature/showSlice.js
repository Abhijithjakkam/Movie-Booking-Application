import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../port";
import { mainSocket } from "../socket";

const defaultSeatRowSize = 10;
const defaultSeatCode = 3;
function generateSeatMatrix(numberOfRows = defaultSeatRowSize, numberOfColumns = 10, seatCode = defaultSeatCode) {
    return Array.from({ length: numberOfRows }, (_, i) => {
        return Array.from({ length: numberOfColumns }, (_, i) => seatCode);
    });
}
function generateSeatMatrixFromNumberOfSeats(numberOfSeats, rowSize = defaultSeatRowSize, seatCode = defaultSeatCode) {
    let numberOfRows = Math.floor(numberOfSeats / rowSize);
    let returnArray = Array.from({ length: numberOfRows }, (_, i) => {
        return Array.from({ length: rowSize }, (_, i) => seatCode);
    });

    if (numberOfRows * rowSize !== numberOfSeats) {
        const leftOverSeats = (numberOfSeats - (numberOfRows * rowSize));
        returnArray.push(Array.from({ length: leftOverSeats }, (_, i) => seatCode));
    }
    return returnArray;
}
function getSeatIndicies(seatNumber, rowSize = defaultSeatRowSize) {
    const rowIndex = Math.floor((seatNumber - 1) / rowSize);
    const columnIndex = Math.floor((seatNumber - 1) % rowSize);
    return { rowIndex, columnIndex };
}
const initialState = {
    selectedShow: {
        id: "",
        movieId: "",
        theatreId: "",
        startTimeTimestamp: 0,
        endTimeTimestamp: 0,
        totalSeats: 0,
        emptySeats: [],
        movie: null,
        theatre: null,
        seatMatrix: []
    }
};
export const selectedShow = createAsyncThunk("show/selectedShow", async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/show/${id}`);
        const result = await mainSocket.emitWithAck("viewing show", {
            show_id: id
        })
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
});

export const unsubscribeShowSeats = createAsyncThunk("show/unsubscribeShowSeats", async (id) => {
    try {
        const result = await mainSocket.emitWithAck("not viewing show", {
            show_id: id
        })
        return result;
    }
    catch (error) {
        console.log(error);
    }
});

export const selectedSeat = createAsyncThunk("show/selectedSeat", async ({showId, seatNumber}) => {
    console.log("args",showId,seatNumber)
    try {
        console.log("selected");
        const result = await mainSocket.emitWithAck("selected seat", {
            show_id: showId,
            seatNumber: seatNumber.toString()
        })
        return { showId, seatNumber, result };
    }
    catch (error) {
        console.log(error);
    }
});

export const deselectedSeat = createAsyncThunk("show/deselectedSeat", async ({showId, seatNumber}) => {
    try {
        const result = await mainSocket.emitWithAck("deselected seat", {
            show_id: showId,
            seatNumber: seatNumber.toString()
        })
        return { showId, seatNumber, result };
    }
    catch (error) {
        console.log(error);
    }
});

export const showSlice = createSlice({
    name: "show",
    initialState,
    reducers: {
        someoneElseSelectedSeat: (state, action) => {
            const seatNumber = action.payload;
            const { rowIndex, columnIndex } = getSeatIndicies(Number(seatNumber));
            state.selectedShow.seatMatrix[rowIndex][columnIndex] = 2;
        },
        someoneElseDeselectedSeat: (state, action) => {
            const seatNumber = action.payload;
            const { rowIndex, columnIndex } = getSeatIndicies(Number(seatNumber));
            state.selectedShow.seatMatrix[rowIndex][columnIndex] = 0;
        },
        someoneElseSelectedSeats: (state, action) => {
            const seatNumbers = action.payload;
            seatNumbers.forEach(seatNumber=>{
                const { rowIndex, columnIndex } = getSeatIndicies(Number(seatNumber));
                state.selectedShow.seatMatrix[rowIndex][columnIndex] = 2;
            })
        },
        someoneElseDeselectedSeats: (state, action) => {
            const seatNumbers = action.payload;
            seatNumbers.forEach(seatNumber=>{
                const { rowIndex, columnIndex } = getSeatIndicies(Number(seatNumber));
                state.selectedShow.seatMatrix[rowIndex][columnIndex] = 0;
            })
        },
        
    },
    extraReducers(builder) {

        builder.addCase(selectedShow.fulfilled, (state, action) => {
            state.selectedShow.id = action.payload.id;
            state.selectedShow.movieId = action.payload.movieId;
            state.selectedShow.theatreId = action.payload.theatreId;
            state.selectedShow.startTimeTimestamp = action.payload.startTimeTimestamp;
            state.selectedShow.endTimeTimestamp = action.payload.endTimeTimestamp;
            state.selectedShow.totalSeats = action.payload.totalSeats;
            state.selectedShow.emptySeats = action.payload.emptySeats;
            state.selectedShow.movie = action.payload.movie;
            state.selectedShow.theatre = action.payload.theatre;

            state.selectedShow.seatMatrix = generateSeatMatrixFromNumberOfSeats(state.selectedShow.totalSeats);

            state.selectedShow.emptySeats.forEach(seatNumber => {
                const { rowIndex, columnIndex } = getSeatIndicies(seatNumber);
                state.selectedShow.seatMatrix[rowIndex][columnIndex] = 0;
            })
        });

        builder.addCase(unsubscribeShowSeats.fulfilled, (state, action) => {
            
        });

        builder.addCase(selectedSeat.fulfilled, (state, action) => {
            const seatNumber = action.payload.seatNumber;
            const { rowIndex, columnIndex } = getSeatIndicies(seatNumber);
            console.log("rowindex",rowIndex,"columnindex",columnIndex,"seatNumber");
            state.selectedShow.seatMatrix[rowIndex][columnIndex] = 1;
        });

        builder.addCase(deselectedSeat.fulfilled, (state, action) => {
            const seatNumber = action.payload.seatNumber;
            const { rowIndex, columnIndex } = getSeatIndicies(seatNumber);
            state.selectedShow.seatMatrix[rowIndex][columnIndex] = 0;
        });

    },
});
export const {
    someoneElseDeselectedSeat,
    someoneElseDeselectedSeats,
    someoneElseSelectedSeat,
    someoneElseSelectedSeats
} = showSlice.actions;
export default showSlice.reducer;
