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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
