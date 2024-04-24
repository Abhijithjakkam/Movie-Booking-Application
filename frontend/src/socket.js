import io from "socket.io-client";
import { BASE_URL } from "./port";
// import { store } from "./apps/store";
import { useDispatch } from "react-redux";
import { someoneElseSelectedSeats } from "./feature/showSlice";
const mainSocket = io(BASE_URL);



export {mainSocket};