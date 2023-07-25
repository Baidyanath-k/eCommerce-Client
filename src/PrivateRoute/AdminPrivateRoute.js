import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner/Spinner";
import { useAuth } from "../context/authContext";

const AdminPrivateRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/adminPrivateRoute`,
        { headers: { Authorization: auth?.token } }
      );

      if (res?.data?.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? children : <Spinner />;
};
export default AdminPrivateRoute;
