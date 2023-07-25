import React from "react";
import { Link } from "react-router-dom";
import Main from "../../pages/Layout/Main";

const NotFound = () => {
  return (
    <Main
      title={"Page Not Found"}
      description={
        "The typical trigger for an error 404 message is when website content has been removed or moved to another URL"
      }
    >
      <div className="h-screen flex justify-center items-center">
        <div className="">
          <h2 className="font-bold text-5xl">404</h2>
          <h4 className="font-bold text-2xl">Oops ! Page Not Found</h4>
          <Link to="/">
            <button className="btn text-center mt-5">Go Back</button>
          </Link>
        </div>
      </div>
    </Main>
  );
};

export default NotFound;
