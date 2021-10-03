import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import styled from "styled-components";
import Homepage from './Homepage';
import Chat from '../Chats/Chat';
import axios from 'axios'

function Home({loginData}) {

  const [userHeaders, setUserHeaders] = useState("");
  const [isRender, setIsRender] = useState(false);

  const handleIsRender = () => {
    setIsRender(!isRender);
  }

  useEffect(() => {

    const headers = {
      token: loginData.headers["access-token"],
      client: loginData.headers.client,
      expiry: loginData.headers.expiry,
      uid: loginData.headers.uid,
    };

    setUserHeaders(headers)

    const { token, client, expiry, uid  } = headers

    axios.get("http://206.189.91.54//api/v1/channels",
    {
      headers:{
        "access-token": token,
        "client": client,
        "expiry": expiry,
        "uid": uid,
      },
    })
    .then(res => {
      console.log("Channel render:", res);
    })
    .catch(err => console.log("Error Getting Channel: ", err))

  }, [isRender]);
  
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
              <Chat loginData={loginData} headers={userHeaders} handleIsRender={handleIsRender} />
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


