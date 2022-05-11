import React from "react";
import logo from "./logo.svg";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Register from "./pages/Register";
import Calm from "./pages/Calm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/calm" component={Calm} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
