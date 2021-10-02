import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import styled from "styled-components";
import Homepage from './Homepage';
import Chat from '../Chats/Chat';

function Home({loginData}) {
  return (
    <div>
      <Router>
        <Header loginData={loginData}/>
          <Appbody>
            <Sidebar />
            <Switch>              
            {/* <Route exact path='/' component={Chat}>
              <Homepage />
            </Route> */}
            <Route path='/'>
              <Chat loginData={loginData}/>
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


