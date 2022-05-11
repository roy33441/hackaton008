import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Register from "./pages/Register";
import Calm from "./pages/Calm";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    backgroundColor: "rgb(246, 244, 239)",
  },
});
function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calm" element={<Calm />} />
      </Routes>
    </div>
  );
}

export default App;
