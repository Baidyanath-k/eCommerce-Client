import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Main from "../Layout/Main";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );

      // console.log("data", res.data);
      if (res && res.data) {
        toast.success(res.data && res.data.message, {
          duration: 2000,
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(res.data.message, {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        duration: 2000,
        position: "top-center",
      });
    }
  };
  return (
    <Main>
      <div className="hero min-h-screen mx-auto ">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-center font-bold text-3xl">Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
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
                  <span className="label-text">Answer</span>
                </label>
                <input
                  type="text"
                  name="answer"
                  onChange={(event) => setAnswer(event.target.value)}
                  value={answer}
                  placeholder="What is your favorite sports?"
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
                  onChange={(event) => setNewPassword(event.target.value)}
                  value={newPassword}
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default ForgotPassword;
