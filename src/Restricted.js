import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "./Api";

const Restricted = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadData = async (token) => {
      try {
        const response = await authApi.loadManagerRestricted(token);
        setMessage(response.data);
      } catch (err) {
        navigate("/home");
      }
    };
    const token = localStorage.getItem("jwt");
    if (token) {
      loadData(token);
    } else {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>{message}</div>
      </div>
      <div className="buttonContainer">
        <input
          className="inputButton"
          type="button"
          value="Logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Restricted;
