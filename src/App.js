import React from "react";
import "./App.css";
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login"; 
import Home from './components/Profile/Home';
import Register from "./components/Register/Register";

function App() {
  const [loginData, setLoginData] = useState('');

  const handleSetLoginData = (res) => {
    setLoginData(res);
  };

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path='/register' component={Register}/>
          <Route path='/slack-api'>
            <Login handleSetLoginData={handleSetLoginData} />
          </Route>
          <Route path='/'>
            {
              loginData ? <Home loginData={loginData} /> : <Redirect to='/slack-api'/>
            }
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
