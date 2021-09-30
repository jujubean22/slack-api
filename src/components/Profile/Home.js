import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import styled from "styled-components";
import Homepage from './Homepage';

function Home() {
  return (
    <div>
      <Router>
        <Header />
        <Appbody>
          <Sidebar />
          <Homepage />
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


