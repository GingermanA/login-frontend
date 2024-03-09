import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "./Api";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const loadData = async (token) => {
      try {
        const response = await authApi.loadUserHome(token);
        console.log(response.data);
        setName(response.data.name);
        setUsername(response.data.username);
        setRole(response.data.roles);
      } catch (err) {
        try {
          const response = await authApi.loadManagerHome(token);
          setName(response.data.name);
          setUsername(response.data.username);
          setRole(response.data.roles);
        } catch (err) {
          console.log(err);
        }
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
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <br />
      <div>Name: {name}</div>
      <br />
      <div>Username: {username}</div>
      <br />
      <div>Role: {role}</div>
      <br />
      <div>
        {role === "MANAGER" && <Link to="/restricted">Restricted Page</Link>}
      </div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          value="Log out"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Home;
