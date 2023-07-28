import React from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import SearchInput from "../SearchInput/SearchInput";

const NavBar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  // console.log(auth?.user?.role);
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("Logout Successful");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    // className="max-w-[1280px] mx-auto"
    <div className="p-0 navbar bg-base-200">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <div className="block w-52">
                <SearchInput></SearchInput>
              </div>
              <li>
                <Link className="text-lg font-semibold" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-lg font-semibold">Categoryss</Link>
                <ul className="p-2">
                  <li>
                    <Link className="text-lg font-semibold">Submenu 1</Link>
                  </li>
                  <li>
                    <Link className="text-lg font-semibold">Submenu 2</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link to="/" className="text-xl font-bold w-1/3">
            eCommerce
          </Link>
        </div>
        <div className="hidden lg:flex">
          <SearchInput></SearchInput>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/" className="text-lg font-semibold">
                Home
              </Link>
            </li>
            <li tabIndex={0}>
              <details>
                <summary className="text-lg font-semibold">Categorys</summary>
                <ul className="p-2">
                  <li>
                    <Link className="text-lg font-semibold">Submenu 1</Link>
                  </li>
                  <li>
                    <Link className="text-lg font-semibold">Submenu 2</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end w-1/3">
          <div className="flex justify-end flex-1 px-2">
            <div className="flex items-stretch">
              {auth?.token ? (
                <>
                  <Link className="btn btn-ghost rounded-btn px-1">
                    card(0)
                  </Link>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost rounded-btn">
                      <h2 className="text-xl font-bold">
                        {auth?.user ? auth?.user?.name : "user"}
                      </h2>
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {auth?.user?.role === 1 ? (
                        <>
                          <li>
                            <Link
                              to="/admin-dashboard/admin-dashboard-createCategory"
                              className="text-lg font-semibold"
                            >
                              Admin Dashboard
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link
                              to="/user-dashboard"
                              className="text-lg font-semibold"
                            >
                              User Dashboard
                            </Link>
                          </li>
                        </>
                      )}

                      <li>
                        <Link
                          onClick={handleLogOut}
                          className="text-lg font-semibold"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <ul className="navbar-center menu menu-horizontal">
                  <li>
                    <Link to="/login" className="text-lg font-semibold">
                      LogIn
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-lg font-semibold">
                      Register
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
