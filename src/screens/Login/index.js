import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import GoogleButton from "react-google-button";
import axios from "axios";

import * as AppSliceActions from "../../appSlice";
import "./styles.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAuthUser = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/user`, {
        withCredentials: true,
      })
      .catch((error) => {
        console.log("Not properly authenticated");
      });

    if (response && response.data) {
      navigate("/home");
      dispatch(AppSliceActions.setIsAthenticated(true));
      dispatch(AppSliceActions.setAuthUser(response.data));
    }
  };

  const redirectToGoogleSSO = async () => {
    let timer = null;
    const googleLoginUrl = `${process.env.REACT_APP_BACKEND_URL}/login/google`;
    const newWindow = window.open(
      googleLoginUrl,
      "_blank",
      "width=500, height=600"
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we are athenticated!!");
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <GoogleButton onClick={redirectToGoogleSSO} />
      </div>
    </div>
  );
}

export default Login;
