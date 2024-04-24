import axios from "axios";
import { Background, OTPInput } from "hyperverge-sde-ui-library";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../port";
import { useDispatch, useSelector } from "react-redux";
import { setLastBookedTicket } from "../feature/ticketSlice";

export default function SendOtp({ }) {
    const { startTimeTimestamp, movie, seatMatrix, id } = useSelector(state => state.show.selectedShow);
    let selectedSeats = [];

    
    seatMatrix.forEach((row, rowIndex) => {
        row.forEach((seatVal, colIndex) => {
            if (seatVal == 1) {
                selectedSeats.push((rowIndex * 10 + colIndex + 1).toString());
            }
        })
    })
    selectedSeats = selectedSeats.map(seat => Number(seat));
    const navigate = useNavigate();
    const dispacth = useDispatch();
    return (
        <>
            <Background classname="-z-100" />
            <div>
                <div className="h-screen overflow-y-hidden z-20 relative font-bold flex flex-col justify-center items-center">

                    <OTPInput
                        correctOTP={"1234"}
                        handleSubmit={async () => {
                            const res = await axios.post(`${BASE_URL}/api/booking/book`, {
                                showId: id,
                                seatNumbers: selectedSeats
                            })
                            console.log(res.data);
                            dispacth(setLastBookedTicket(res.data));
                            navigate("/paymentsuccess");
                        }}
                    />
                </div>
            </div>
        </>
    );
}
