import { useEffect } from "react";
import "./styles.css";

function LoginSuccess() {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  });
  return (
    <div className="login-success-container">
      <h2 className="login-success-title">Gracias por logearte!</h2>
    </div>
  );
}

export default LoginSuccess;
