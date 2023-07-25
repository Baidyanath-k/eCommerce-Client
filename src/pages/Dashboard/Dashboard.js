import React from "react";
import { useAuth } from "../../context/authContext";

const Dashboard = () => {
  const {auth}=useAuth()
  return (
    <div className="">
      <h2>Name: {auth?.user?.name}</h2>
      <h2>Email: {auth?.user?.email}</h2>
      <h2>Phone: {auth?.user?.phone}</h2>
      <h2>Address: {auth?.user?.address}</h2>
    </div>
  );
};

export default Dashboard;
