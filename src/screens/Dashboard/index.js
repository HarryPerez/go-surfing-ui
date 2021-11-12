import { useCallback, useEffect, useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";
import { TextField, Typography, Box, ButtonBase, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import CustomMarker from "./components/CustomMarker";
import mapStyles from "./mapStyles.json";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./styles.css";

const COACH_MARKER_ICON_URL =
  "https://drive.google.com/uc?id=1uy8ZhNpPc17LmzRySGmoCKBXpPvRamic";

const SURFER_MARKER_ICON_URL =
  "https://drive.google.com/uc?id=1ISGEJ0wKwBxiWSUJWsom-NXWfiicctDy";

const defaultMapOptions = {
  styles: mapStyles,
};

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
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
  const [coaches, setCoaches] = useState();
  const [surfers, setSurfers] = useState();

  const saveUserLocation = useCallback(async ({ latitude, longitude }) => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/user/location`, {
        withCredentials: true,
        latitude,
        longitude,
      })
      .catch((error) => {
        console.log("No se pudo guardar el la location del usuario", error);
      });
  }, []);

  const getAllSurfers = useCallback(async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/user/surfers`, {
        withCredentials: true,
      })
      .catch((error) => {
        console.log("No se pudieron obtener los surfers", error);
      });

    if (response && response.data) {
      setSurfers(response.data);
    }
  }, []);

  const getAllCoaches = useCallback(async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/user/coaches`, {
        withCredentials: true,
      })
      .catch((error) => {
        console.log("No se pudieron obtener los coaches", error);
      });

    if (response && response.data) {
      setCoaches(response.data);
    }
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
    if (!coaches) {
      getAllCoaches();
    }
    if (!surfers) {
      getAllSurfers();
    }
  }, [
    coaches,
    navigate,
    saveUserLocation,
    surfers,
    getAllSurfers,
    getAllCoaches,
    location,
  ]);

  const images = [
    {
      url: SURFER_MARKER_ICON_URL,
      title: "Surfer",
      width: "50%",
    },
    {
      url: COACH_MARKER_ICON_URL,
      title: "Coach",
      width: "50%",
    },
  ];

  return (
    <div className="dashboard-container">
      {location ? (
        <div className="dashboard-body-container">
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <script
            async
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=geometry&callback=initMap`}
          ></script>
          <div className="profile-container">
            <Typography style={{ marginBottom: "20px" }} variant="h5">
              Mi Perfil
            </Typography>
            <div style={{ display: "flex" }}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch", marginLeft: 0 },
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField label="Nombre" variant="outlined" />
                <TextField label="Email" variant="outlined" />
                <TextField label="Teléfono" variant="outlined" />
              </Box>
              <div
                style={{
                  alignSelf: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    minWidth: 400,
                    width: "100%",
                  }}
                >
                  {images.map((image) => (
                    <ImageButton
                      focusRipple
                      key={image.title}
                      style={{
                        width: image.width,
                      }}
                    >
                      <ImageSrc
                        style={{ backgroundImage: `url(${image.url})` }}
                      />
                      <ImageBackdrop className="MuiImageBackdrop-root" />
                      <Image>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          sx={{
                            position: "relative",
                            p: 4,
                            pt: 2,
                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                          }}
                        >
                          {image.title}
                          <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                      </Image>
                    </ImageButton>
                  ))}
                </Box>
              </div>
            </div>
            <Button style={{ marginTop: "20px" }} variant="contained">
              Guardar
            </Button>
          </div>
          <div className="dashboard-dashboard-container">
            <div className="dashboard-map-container">
              <MyMapComponent
                isMarkerShown
                markers={coaches && surfers && coaches.concat(surfers)}
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
        </div>
      ) : (
        <div className="loader-container">
          <Loader
            type="Puff"
            color="black"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
