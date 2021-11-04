import { DASHBOARD_CARDS } from "./constants";
import "./styles.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {DASHBOARD_CARDS.map((dashboardOption) => (
        <div className="dashboard-card">
          <img
            className="dashboard-card-cover"
            alt={dashboardOption.type}
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
      ))}
    </div>
  );
}

export default Dashboard;
