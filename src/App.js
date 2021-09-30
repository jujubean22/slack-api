import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login"; 
import Home from './components/Profile/Home';
import Register from "./components/Register/Register";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path='/slack-api' component={Login} />
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
