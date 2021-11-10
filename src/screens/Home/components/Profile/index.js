import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PROFILE_CARDS } from "./constants";
import "./styles.css";

function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.authUser);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.profile) {
      navigate("/dashboard");
    }
  });

  const saveUserProfile = async (profile) => {
    if (user) {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/user/profile`, {
          withCredentials: true,
          user,
          profile,
        })
        .catch((error) => {
          console.log("No se pudo guardar el tipo de perfil del usuario");
        });
      navigate("/dashboard");
    }
  };

  return (
    <div className="profile-container">
      {PROFILE_CARDS.map((profileOption) => (
        <div onClick={() => saveUserProfile(profileOption.profile)}>
          <div className="profile-card">
            <img
              className={profileOption.classnames}
              alt={profileOption.profile}
              src={profileOption.cover}
            />
            <div className="profile-card-description">
              <h2 className="profile-card-description-title">
                {profileOption.title}
              </h2>
              <span className="profile-card-description-description">
                {profileOption.description}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile;
