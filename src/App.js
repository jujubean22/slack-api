import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import styled from "styled-components";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="app">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;

const Appbody = styled.div`
  display: flex;
  height: 100vh;
`;
