import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import "./styles.css";

function Login() {
  const navigate = useNavigate();
  const redirectToGoogleSSO = async () => {
    let timer = null;
    const googleLoginUrl = "http://localhost:5000/api/v1/login/google";
    const newWindow = window.open(
      googleLoginUrl,
      "_blank",
      "width=500, height=600"
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we are athenticated!!");
          navigate("/home");
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
