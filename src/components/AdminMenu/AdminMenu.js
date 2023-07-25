import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <div className="">
        <h2 className="text-center py-3 font-bold text-xl">Admin Panel</h2>
      </div>
      <ul className="menu">
        <li type="btn" className="text-center">
          <Link
            to="admin-dashboard-createCategory"
            className="text-center block "
          >
            Create Category
          </Link>
        </li>
        <li>
          <Link
            to="admin-dashboard-createProduct"
            className="text-center block"
          >
            Create Product
          </Link>
        </li>
        <li>
          <Link to="admin-dashboard-products" className="text-center block">
            All Products
          </Link>
        </li>
        <li>
          <Link to="admin-dashboard-user" className="text-center block">
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
