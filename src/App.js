import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import styled from "styled-components";
import Login from "./components/Login"; 
import Home from './components/Profile/Home';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path='/slack-api' component={Login} />
          <Route exact path='/home' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
