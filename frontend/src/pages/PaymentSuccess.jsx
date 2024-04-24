import {
  Background,
  PaymentSuccess as PaymentSuccessComponent,
} from "hyperverge-sde-ui-library";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess({}) {
  const { lastBookedTicket } = useSelector((state) => state.ticket);
  const navigate = useNavigate();
  return (
    <>
      <Background classname="-z-100" />
      <div>
        <div className="h-screen overflow-y-hidden z-20 relative font-bold flex flex-col justify-center items-center">
          <PaymentSuccessComponent
            onBackToHomePage={() => navigate("/")}
            onViewTicket={() => navigate(`/ticket/${lastBookedTicket.id}`)}
          />
        </div>
      </div>
    </>
  );
}
