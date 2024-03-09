import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "./Api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await authApi.login({
        username: username,
        password: password,
      });
      localStorage.setItem("jwt", response.data);

      navigate("/home");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="Enter your username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
      </div>
      <br />
      {error && <div className="error">Error: Invalid userid or password</div>}
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={handleLogin}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
