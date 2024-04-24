import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken, signIn } from "../utils/accountService";
import { LeftRegister } from "hyperverge-sde-ui-library";
import { RightRegister } from "hyperverge-sde-ui-library";
import { Background } from "hyperverge-sde-ui-library";
export default function Register({}) {
  const navigate = useNavigate();
  useEffect(() => {
    const user = getAuthToken();
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Background className="z-[-1] w-1/2" />
      <div className="flex z-10 items-center w-full flex-col lg:!flex-row">
        <div className="w-1/2 hidden lg:!flex">
          <LeftRegister />
        </div>
        <div className="lg:!w-1/2 flex w-full">
          <RightRegister
            handleSubmit={signIn}
            handleLogin={() => navigate("/login")}
          />
        </div>
      </div>
    </div>
  );
}
