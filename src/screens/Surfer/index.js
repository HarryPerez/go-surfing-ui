import { useCallback, useEffect, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import axios from "axios";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./styles.css";

const StyledBackButton = styled(Button)`
  height: 36px;
  width: 85px;
`;

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={17} defaultCenter={props.center}>
      {props.isMarkerShown && <Marker position={props.center} />}
    </GoogleMap>
  ))
);

function Surfer() {
  const navigate = useNavigate();
  const [location, setLocation] = useState();
  const user = useSelector((state) => state.app.authUser);

  const saveUserLocation = useCallback(
    async ({ latitude, longitude }) => {
      await axios
        .post("http://localhost:5000/api/v1/auth/user/location", {
          withCredentials: true,
          user,
          latitude,
          longitude,
        })
        .catch((error) => {
          console.log("No se pudo guardar el la location del usuario");
        });
    },
    [user]
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        saveUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
    if (!user) {
      navigate("/");
    }
  }, [user, navigate, saveUserLocation]);

  return (
    <div className="surfer-container">
      {location ? (
        <div className="surfer-body-container">
          <div className="link-container">
            <Link to="/home" style={{ textDecoration: "none" }}>
              <StyledBackButton className="back-button" variant="text">
                Regresar
              </StyledBackButton>
            </Link>
          </div>
          <div className="surfer-dashboard-container">
            <div className="surfer-map-container">
              <MyMapComponent
                isMarkerShown
                center={{
                  lat: location.latitude,
                  lng: location.longitude,
                }}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
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
          </div>
          <div className="profile-picture-container">
            {user && user.picture && (
              <IconButton color="primary" aria-label="Tu perfil!">
                <img
                  className="profile-picture"
                  alt="profile"
                  src={user.picture}
                />
              </IconButton>
            )}
          </div>
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
  );
}

export default Surfer;
