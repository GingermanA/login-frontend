import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import "./App.css";
import { useEffect, useState } from "react";
import Restricted from "./Restricted";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/restricted" element={<Restricted />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
