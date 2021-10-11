import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login"; 
import Home from './components/Profile/Home';
import Register from "./components/Register/Register";

function App() {

  const accessToken = localStorage.getItem('access-token')

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path='/register'>
            {accessToken ? <Redirect to='/'/> : <Register/>}
          </Route>
          <Route path='/login'>
            {accessToken ? <Redirect to='/'/> : <Login/>}
          </Route>
          <Route path='/home' component={Home}/>
          <Route path="/">
            {accessToken ? <Redirect to='/home'/> : <Redirect to='/login'/>}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
