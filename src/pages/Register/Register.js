import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Main from "../Layout/Main";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, phone, address, password, answer },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("data", data);
      if (data) {
        toast.success(data && data.message, {
          duration: 4000,
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(data.message, {
          duration: 20000,
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
    <Main title={"eCommerce-register"}>
      <div className="hero min-h-screen mx-auto ">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-center font-bold text-3xl">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                  placeholder="Name"
                  className="input input-bordered"
                />
              </div>
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
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  name="phone"
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Phone Number"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  name="address"
                  placeholder="Address"
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
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Register;
