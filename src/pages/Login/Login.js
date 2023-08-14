import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Main from "../Layout/Main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );

      // console.log("data", res.data);
      if (res && res.data) {
        toast.success(res.data && res.data.message, {
          duration: 4000,
          position: "top-center",
        });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(location.state || "/");
        }, 1000);
      } else {
        toast.error(res.data.message, {
          duration: 40000,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        duration: 4000,
        position: "top-center",
      });
    }
  };
  return (
    <Main title={"eCommerce-login"}>
      <div className="hero min-h-screen mx-auto ">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-center font-bold text-3xl">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  placeholder="Email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <label className="label">
                <Link
                  to="/forgot-password"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>
              </label>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
            <div className="">
              <h2 className="text-center">
                Don't have an account?{" "}
                <span className="text-emerald-500">
                  <Link to="/register">Sign Up</Link>
                </span>{" "}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Login;
