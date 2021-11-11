import { InfoWindow } from "react-google-maps";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./styles.css";

function CustomInfoWindow({ fullName, picture, email, phone }) {
  return (
    <InfoWindow className="info-window-container">
      <div className="info-window-body">
        <img className="profile-picture" alt="profile" src={picture} />
        <span style={{ fontWeight: "bold" }}>{fullName}</span>
        <span>{phone}</span>
        <span>{email}</span>
      </div>
    </InfoWindow>
  );
}

export default CustomInfoWindow;
