import React from "react";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

const AdminMain = ({ children, description, title, author, keywords }) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <NavBar></NavBar>
      <div className="container flex flex-wrap mx-auto">
        <div className="lg:w-1/5 w-full p-0 [&_li>*]:rounded-none bg-base-200">
          <AdminMenu></AdminMenu>
        </div>

        {/* <main>
          {" "}
          <Toaster></Toaster>
          {children}
        </main> */}

        <div className="lg:w-4/5 w-full lg:pl-10 px-7 lg:py-6 mt-6 lg:mt-0">
          <Outlet></Outlet>
          
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
AdminMain.defaultProps = {
  description: "Mern Stack eCommerce app",
  title: "eCommerce",
  author: "My app",
  keywords: "Mern, React, Express, Node.js, Mongoose",
};

export default AdminMain;
