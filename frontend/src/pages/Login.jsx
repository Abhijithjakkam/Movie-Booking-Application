import {
  Background,
  Button,
  Input,
  Login as LoginComponent,
} from "hyperverge-sde-ui-library";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getAuthToken, signIn } from "../utils/accountService";

export default function Login({}) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = getAuthToken();
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Background className="-z-10" />
      <div className="flex flex-row justify-center items-center w-full h-screen">
        <LoginComponent
          onHandleSubmit={signIn}
          onRedirection={() => navigate("/register")}
        />
      </div>
    </div>
  );
}
