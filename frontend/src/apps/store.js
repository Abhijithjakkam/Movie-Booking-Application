// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movieReducer from "../feature/movieSlice";
import showReducer from "../feature/showSlice";
// import userReducer from "../feature/userSlice";
import ticketReducer from "../feature/ticketSlice";
import utilsReducer from "../feature/utilsSlice";
const rootReducer = combineReducers({
  movie: movieReducer,
  show: showReducer,
  ticket: ticketReducer,
  utils: utilsReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
