import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { DASHBOARD_CARDS } from "./constants";
import "./styles.css";

function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.app.authUser);

  const saveUserProfile = async (profile) => {
    await axios
      .post("http://localhost:5000/api/v1/auth/user/profile", {
        withCredentials: true,
        user,
        profile,
      })
      .catch((error) => {
        console.log("No se pudo guardar el tipo de perfil del usuario");
      });

    navigate(`/${profile}`);
  };

  return (
    <div className="dashboard-container">
      {DASHBOARD_CARDS.map((dashboardOption) => (
        <div onClick={() => saveUserProfile(dashboardOption.profile)}>
          <div className="dashboard-card">
            <img
              className={dashboardOption.classnames}
              alt={dashboardOption.profile}
              src={dashboardOption.cover}
            />
            <div className="dashboard-card-description">
              <h2 className="dashboard-card-description-title">
                {dashboardOption.title}
              </h2>
              <span className="dashboard-card-description-description">
                {dashboardOption.description}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
