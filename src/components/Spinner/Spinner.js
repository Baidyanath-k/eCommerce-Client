import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);

    count === 0 && navigate("/login", { state: location.pathname });

    return () => clearInterval(interval);
  }, [count, navigate, location]);
  return (
    <div className="w-screen h-screen relative">
      <div className="absolute top-1/2 left-1/2">
        <span className="loading loading-bars loading-lg"></span>
        <h2 className="font-bold text-2xl">{count}s</h2>
      </div>
    </div>
  );
};

export default Spinner;
