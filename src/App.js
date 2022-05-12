import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Register from "./pages/Register";
import Calm from "./pages/Calm";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    backgroundColor: "rgb(246, 244, 239)",
  },
  photoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  photo: {
    height: "25vh",
    width: "45vh",
  },
});
function App() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [openDell, setOpenDell] = React.useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setOpenDell(false), 2000);
    if (
      !localStorage.getItem("phoneNumber") ||
      !localStorage.getItem("name") ||
      !localStorage.getItem("color")
    ) {
      navigate("/register");
    }
  }, []);

  if (openDell) {
    return (
      <div className={classes.photoContainer}>
        <img className={classes.photo} src="photos/dell-logo.jpg" />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calm" element={<Calm />} />
      </Routes>
    </div>
  );
}

export default App;
