import { mainSocket } from "../socket";
import {
    selectedShow,
    someoneElseDeselectedSeat,
    someoneElseDeselectedSeats,
    someoneElseSelectedSeat,
    someoneElseSelectedSeats,
    unsubscribeShowSeats
} from "./../feature/showSlice";

function registerShowSocket(show_id, dispatch) {

    return () => {

        console.log("called", mainSocket);
        mainSocket.on("connect", () => {
            console.log("socket connected successfully");
            dispatch(selectedShow(show_id));
        });

        mainSocket.on("previously selected seats", (data) => {
            dispatch(someoneElseSelectedSeats(data));
        })
        mainSocket.on("selected seat", (data) => {
            dispatch(someoneElseSelectedSeat(data.seatNumber));
        });

        mainSocket.on("deselected seat", (data) => {
            dispatch(someoneElseDeselectedSeat(data.seatNumber));
        });

        mainSocket.on("deselected seats", (data) => {
            dispatch(someoneElseDeselectedSeats(data.seatNumbers));
        });
        mainSocket.connect();

        return () => {
            dispatch(unsubscribeShowSeats(show_id));
            mainSocket.removeAllListeners();
            mainSocket.disconnect();
        }
    }
}

export { registerShowSocket };