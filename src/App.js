import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import styled from "styled-components";
import Sidebar from "./components/Sidebar/Sidebar";
import SignIn from "./components/Login/SignUp";

function App() {
  const [user, setUser] = useState(false);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <SignIn />
        ) : (
          <>
            <Header />
            <Appbody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  {/* Chat */}
                </Route>
              </Switch>
            </Appbody>
          </>
        )} 
      </Router>
    </div>
  );
}

export default App;

const Appbody = styled.div`
  display: flex;
  height: 100vh;
`;
