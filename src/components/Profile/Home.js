import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import styled from "styled-components";
import Homepage from './Homepage';
import Chat from '../Chats/Chat';

function Home() {
  return (
    <div>
      <Router>
        <Header />
          <Appbody>
            <Sidebar />
            <Switch>              
              {/* <Route path='/'  component={Homepage} /> */}
              <Route exact path='/chat' component={Chat} />
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


