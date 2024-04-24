import {
  Background,
  Navbar,
  Tabs,
  ViewTicket,
  ViewTicketList,
} from "hyperverge-sde-ui-library";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";
import { signOut } from "../utils/accountService";
import { fetchAllTickets } from "../feature/ticketSlice";
import CameraModule from "./CameraModule";

export default function MyTicketPage({}) {
  const ticket = useSelector((state) => state.ticket);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTickets());
  }, []);
  const navigate = useNavigate();
  const profilePicture = useSelector((state) => state.utils.profilePicture);
  return (
    <>
      <div className="fixed w-full h-full z-[-1]">
        <Background />
      </div>

      <CameraModule />


      <Navbar
        profilePicture={profilePicture}
        handleProfileChange={() => dispatch(changeModalState())}
        isLoggedIn={true}
        onLogout={signOut}
        highlightMyTickets={true}
        handleNavigation={() => navigate("/")}
      />
      <Tabs tabLables={["Upcoming", "History"]}>
        {ticket.upcomingTickets.length == 0 ? (
          <div className="text-white text-2xl">No Bookings</div>
        ) : (
          <ViewTicketList>
            {ticket.upcomingTickets &&
              ticket.upcomingTickets.map((ticket) => (
                <ViewTicket
                  date={ticket?.show?.startTimeTimestamp}
                  title={ticket?.show?.movie?.name}
                  tickets={ticket?.bookedSeats}
                />
              ))}
          </ViewTicketList>
        )}
        {ticket.pastTickets.length == 0 ? (
          <div className="text-white text-2xl">No History</div>
        ) : (
          <ViewTicketList>
            {ticket.pastTickets &&
              ticket.pastTickets.map((ticket) => (
                <ViewTicket
                  disableDownload={true}
                  date={ticket?.show?.startTimeTimestamp}
                  title={ticket?.show?.movie?.name}
                  tickets={ticket?.bookedSeats}
                />
              ))}
          </ViewTicketList>
        )}
      </Tabs>
    </>
  );
}
