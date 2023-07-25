import React from "react";
import { useAuth } from "../../context/authContext";

const AdminUser = () => {
  const { auth } = useAuth();
  return (
    <div>
      <h2 className="">Admin Name: {auth?.user?.name}</h2>
      <h2 className="">Admin Name: {auth?.user?.email}</h2>
      <h2 className="">Admin Phone: {auth?.user?.phone}</h2>
    </div>
  );
};

export default AdminUser;
