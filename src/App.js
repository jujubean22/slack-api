import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Login from "./components/Login/Login"; 
import Home from './components/Profile/Profile';

function App() {
  const [user, setUser] = useState(false);
  return (
    <div className="app">
      <Router>
        {/* {!user ? (
          <Login />
        ) : ( */}
          <>
            <Home />
          </>
        {/* )}  */}
      </Router>
    </div>
  );
}

export default App;

