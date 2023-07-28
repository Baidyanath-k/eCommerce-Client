import { createBrowserRouter } from "react-router-dom";
import AdminPrivateRoute from "../../PrivateRoute/AdminPrivateRoute";
import UserPrivateRoute from "../../PrivateRoute/UserPrivateRoute";
import NotFound from "../../components/NotFound/NotFound";

import AdminCategory from "../AdminDashboard/AdminCategory";
import AdminProduct from "../AdminDashboard/AdminProduct";
import AdminProductUpdate from "../AdminDashboard/AdminProductUpdate";
import AdminProducts from "../AdminDashboard/AdminProducts/AdminProducts";
import ProductsDetails from "../AdminDashboard/AdminProducts/ProductsDetails";
import AdminUser from "../AdminDashboard/AdminUser";
import Dashboard from "../Dashboard/Dashboard";
import UserDashBoardProduct from "../Dashboard/UserDashBoardProduct";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Home from "../HomePage/Home/Home";
import AdminMain from "../Layout/AdminMain";
import UserDashboardMain from "../Layout/UserDashboardMain";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Search from "../Search/Search";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main></Main>,
//     children: [
//       {
//         path: "/",
//         element: <Home></Home>,
//       },
//       {
//         path: "/register",
//         element: <Register></Register>,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/search",
    element: <Search></Search>
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: "/admin-dashboard",
    element: (
      <AdminPrivateRoute>
        <AdminMain></AdminMain>
      </AdminPrivateRoute>
    ),
    children: [
      {
        path: "/admin-dashboard/admin-dashboard-createCategory",
        element: <AdminCategory></AdminCategory>,
      },
      {
        path: "/admin-dashboard/admin-dashboard-createProduct",
        element: <AdminProduct></AdminProduct>,
      },
      {
        path: "/admin-dashboard/admin-dashboard-user",
        element: <AdminUser></AdminUser>,
      },
      {
        path: "/admin-dashboard/admin-dashboard-products",
        element: <AdminProducts></AdminProducts>,
      },
      {
        path: "/admin-dashboard/admin-dashboard-products/products-details/:_id",
        element: <ProductsDetails></ProductsDetails>,
      },
      {
        path: "products-update/:_id",
        element: <AdminProductUpdate></AdminProductUpdate>,
      },
    ],
  },

  {
    path: "/user-dashboard",
    element: (
      <UserPrivateRoute>
        <UserDashboardMain></UserDashboardMain>
      </UserPrivateRoute>
    ),
    children: [
      {
        path: "/user-dashboard",
        element: <UserDashBoardProduct></UserDashBoardProduct>,
      },
      {
        path: "/user-dashboard/user-dashboard-profile",
        element: <Dashboard></Dashboard>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default router;
