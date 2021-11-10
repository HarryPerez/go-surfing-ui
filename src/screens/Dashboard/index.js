import { useCallback, useEffect, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { IconButton, Button, TextField, Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import axios from "axios";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

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

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    border: "1px solid #dadde9",
  },
}));

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
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [form, setForm] = useState({});
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

  const onSaveProfile = async () => {
    setIsProfileModalOpen(false);
    if (form.phone && form.description) {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/user/extrainfo`, {
          withCredentials: true,
          user,
          phone: form.phone,
          description: form.description,
        })
        .catch((error) => {
          console.log("No se pudo guardar el perfil del usuario");
        });
    }
  };

  const changeValue = (e, field) => {
    const newForm = form;
    newForm[field] = e;
    setForm(newForm);
  };

  return (
    <div className="dashboard-container">
      {location ? (
        <div className="dashboard-body-container">
          <script
            async
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=geometry&callback=initMap`}
          ></script>
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
              <HtmlTooltip
                title={
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <StyledBackButton
                      onClick={() => setIsProfileModalOpen(true)}
                      color="primary"
                    >
                      PERFIL
                    </StyledBackButton>
                    <StyledBackButton
                      onClick={() => navigate("/")}
                      color="primary"
                    >
                      SALIR
                    </StyledBackButton>
                  </div>
                }
              >
                <IconButton color="primary">
                  <img
                    className="profile-picture"
                    alt="profile"
                    src={user.picture}
                  />
                </IconButton>
              </HtmlTooltip>
            )}
          </div>
          <Modal
            open={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                position: "absolute",
                borderRadius: "12px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "400px",
              }}
            >
              <div className="info-window-body">
                <img
                  style={{ marginBottom: "10px" }}
                  className="profile-picture"
                  alt="profile"
                  src={user?.picture}
                />
                <span style={{ fontWeight: "bold" }}>{user?.fullName}</span>
                <span>{user?.email}</span>
              </div>
              <TextField
                required
                value={user.phone}
                label="Número de telefono"
                type="phonenumber"
                onChange={(e) => changeValue(e.target.value, "phone")}
              />
              <TextField
                value={user.description}
                onChange={(e) => changeValue(e.target.value, "description")}
                required
                label="Descripción"
                multiline
                rows={4}
              />
              <Button variant="contained" onClick={() => onSaveProfile()}>
                Guardar
              </Button>
            </Box>
          </Modal>
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
