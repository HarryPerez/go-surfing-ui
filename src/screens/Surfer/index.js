import { useEffect, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./styles.css";

const StyledBackButton = styled(Button)`
  align-self: flex-start;
  height: 36px;
  width: 85px;
`;

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={16} defaultCenter={props.center}>
      {props.isMarkerShown && <Marker position={props.center} />}
    </GoogleMap>
  ))
);

function Surfer() {
  const [location, setLocation] = useState();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  });

  return (
    <div className="surfer-container">
      <Link
        to="/home"
        style={{ textDecoration: "none", alignSelf: "flex-start" }}
      >
        <StyledBackButton className="back-button" variant="text">
          Regresar
        </StyledBackButton>
      </Link>
      <div className="surfer-dashboard-container">
        {location ? (
          <div className="surfer-map-container">
            <MyMapComponent
              isMarkerShown
              center={{
                lat: location.latitude,
                lng: location.longitude,
              }}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAWAqaNNymBnj7ZPhKkWL4IUdR9iMdtVfI&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                  }}
                />
              }
              containerElement={
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                  }}
                />
              }
              mapElement={
                <div style={{ height: "100%", borderRadius: "12px" }} />
              }
            />
          </div>
        ) : (
          <div className="loader-container">
            <Loader
              type="Puff"
              color="black"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Surfer;
