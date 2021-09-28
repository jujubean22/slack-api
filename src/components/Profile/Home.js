import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import styled from "styled-components";

function Home() {
  return (
    <div>
      <Router>
        <Header />
        <Appbody>
          <Sidebar />
          <Switch>
            <Route path="/" exact>
              {/* Chat */}
            </Route>
          </Switch>
        </Appbody>
      </Router>
    </div>
  );
}

export default Home;

const Appbody = styled.div`
  display: flex;
  height: 100vh;
`;


