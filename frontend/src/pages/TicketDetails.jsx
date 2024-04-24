import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedTicket as selectedTicketAction } from "../feature/ticketSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Background, Button, ViewTicket } from "hyperverge-sde-ui-library";

export default function TicketDetailsPage({}) {
  const dispatch = useDispatch();
  const { ticket_id } = useParams();
  useEffect(() => {
    dispatch(selectedTicketAction(ticket_id));
  }, []);
  const ticket = useSelector((state) => state.ticket);

  const navigate = useNavigate();
  return (
    <>
      <div className="fixed w-full h-full z-[-1]">
        <Background />
      </div>

      <div className="text-white text-[36px] font-primary font-semibold px-[94px] py-[68px] w-full flex justify-center items-center">
        Ticket Detail
      </div>
      <div className="flex flex-col justify-center items-center mt-10 p-5">
        <ViewTicket
          date={ticket.selectedTicket?.show?.startTimeTimestamp}
          title={ticket.selectedTicket?.show?.movie?.name}
          tickets={ticket.selectedTicket?.bookedSeats}
        />
        <Button
          className="text-[1.5rem] w-[24.3rem] py-[1rem] font-medium mt-[10rem]"
          isSolid={false}
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </Button>
      </div>
    </>
  );
}
