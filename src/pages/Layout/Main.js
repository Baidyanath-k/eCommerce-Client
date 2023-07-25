import React from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

const Main = ({ children, description, title, author, keywords }) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <NavBar></NavBar>
      <div className="container mx-auto">
        <main>
          {" "}
          <Toaster></Toaster>
          {children}
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
};
Main.defaultProps = {
  description: "Mern Stack eCommerce app",
  title: "eCommerce",
  author: "My app",
  keywords: "Mern, React, Express, Node.js, Mongoose",
};

export default Main;
