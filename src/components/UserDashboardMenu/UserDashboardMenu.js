import React from "react";
import { Link } from "react-router-dom";

const UserDashboardMenu = () => {
  return (
    <div>
      <div className="">
        <h2 className="text-center py-3 font-bold text-xl">User Dashboard</h2>
      </div>
      <ul className="menu">
        <li type="btn" className="text-center">
          <Link to="/user-dashboard" className="text-center block ">
            Product
          </Link>
        </li>
        <li>
          <Link to="user-dashboard-profile" className="text-center block">
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserDashboardMenu;
