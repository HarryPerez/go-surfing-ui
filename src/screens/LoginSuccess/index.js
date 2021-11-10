import { useEffect } from "react";
import "./styles.css";

function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  });
  return <div className="login-success-container" />;
}

export default LoginSuccess;
