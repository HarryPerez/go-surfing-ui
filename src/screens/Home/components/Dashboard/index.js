import React from "react";
import { Link } from "react-router-dom";

import { DASHBOARD_CARDS } from "./constants";
import "./styles.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {DASHBOARD_CARDS.map((dashboardOption) => (
        <Link
          to={`/${dashboardOption.profile}`}
          style={{ textDecoration: "none" }}
        >
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
        </Link>
      ))}
    </div>
  );
}

export default Dashboard;
