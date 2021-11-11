import React, { Component } from "react";
import { Marker } from "react-google-maps";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import CustomInfoWindow from "./components/CustomInfoWindow";
import "./styles.css";

const COACH_MARKER_ICON_URL =
  "https://drive.google.com/uc?id=1uy8ZhNpPc17LmzRySGmoCKBXpPvRamic";

const SURFER_MARKER_ICON_URL =
  "https://drive.google.com/uc?id=1ISGEJ0wKwBxiWSUJWsom-NXWfiicctDy";

class CustomMarker extends Component {
  state = {
    showInfoWindow: false,
  };

  handleOnClick = () => {
    this.setState({
      showInfoWindow: !this.state.showInfoWindow,
    });
  };

  render() {
    const { showInfoWindow } = this.state;
    const { latitude, longitude, profile, fullName, picture, email, phone } =
      this.props;

    console.log(this.props);

    return (
      <Marker
        icon={{
          url:
            profile === "coach"
              ? COACH_MARKER_ICON_URL
              : SURFER_MARKER_ICON_URL,
          scaledSize: {
            width: 64,
            height: 64,
          },
        }}
        position={{
          lat: Number(latitude),
          lng: Number(longitude),
        }}
        animation={window.google.maps.Animation.DROP}
        onClick={this.handleOnClick}
      >
        {showInfoWindow && (
          <CustomInfoWindow
            fullName={fullName}
            picture={picture}
            email={email}
            phone={phone}
          />
        )}
      </Marker>
    );
  }
}
export default CustomMarker;
