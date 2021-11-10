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

import CustomMarker from "./components/CustomMarker";
import mapStyles from "./mapStyles.json";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./styles.css";

const defaultMapOptions = {
  styles: mapStyles,
};

const StyledBackButton = styled(Button)`
  height: 36px;
  width: 85px;
`;

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultOptions={defaultMapOptions}
      defaultZoom={16}
      defaultCenter={props.center}
    >
      {props.isMarkerShown && (
        <Marker
          animation={window.google.maps.Animation.DROP}
          position={props.center}
        />
      )}
      {props.markers &&
        props.markers.map((marker) => (
          <CustomMarker key={marker.email} {...marker} />
        ))}
    </GoogleMap>
  ))
);

function Dashboard() {
  const navigate = useNavigate();
  const [location, setLocation] = useState();
  const [users, setUsers] = useState();
  const user = useSelector((state) => state.app.authUser);

  const saveUserLocation = useCallback(
    async ({ latitude, longitude }) => {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/user/location`, {
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

  const getAllSurfers = useCallback(async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/user/surfers`, {
        withCredentials: true,
      })
      .catch((error) => {
        console.log("No se pudieron obtener los surfers");
      });
    setUsers(response.data);
  }, []);

  const getAllCoaches = useCallback(async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/user/coaches`, {
        withCredentials: true,
      })
      .catch((error) => {
        console.log("No se pudieron obtener los coaches");
      });
    setUsers(response.data);
  }, []);

  useEffect(() => {
    if (!location && "geolocation" in navigator) {
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

    if (user && !users) {
      if (user?.profile === "surfer") {
        getAllCoaches();
      } else {
        getAllSurfers();
      }
    }
  }, [
    user,
    navigate,
    saveUserLocation,
    users,
    getAllSurfers,
    getAllCoaches,
    location,
  ]);

  return (
    <div className="dashboard-container">
      {location ? (
        <div className="dashboard-body-container">
          <script
            async
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=geometry&callback=initMap`}
          ></script>
          <div className="link-container">
            <Link to="/" style={{ textDecoration: "none" }}>
              <StyledBackButton variant="text">LOGOUT</StyledBackButton>
            </Link>
          </div>
          <div className="dashboard-dashboard-container">
            <div className="dashboard-map-container">
              <MyMapComponent
                isMarkerShown
                markers={users}
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

export default Dashboard;
