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
  const [channels, setChannels] = useState("");
  const [recentUsers, setRecentUsers] = useState("");

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
      setChannels(res)
      //console.log("Channel render:", res);
    })
    .catch(err => console.log("Error Getting Channel: ", err))

    axios.get("http://206.189.91.54//api/v1/users/recent/",
    {
      headers:{
        "access-token": token,
        "client": client,
        "expiry": expiry,
        "uid": uid,
      },
    })
    .then(res => {
      setRecentUsers(res.data.data)
    })
    .catch(err => console.log("Error Getting Recent Users: ", err))

  }, []);

  if (!channels.data) {
    return <div><h1>Loading...</h1></div>
  }
  
  return (
    <div>
      <Router>
        <Header loginData={loginData} headers={userHeaders}/>
          <Appbody>
            <Sidebar channels={channels} loginData={loginData} recentUsers={recentUsers}/>
            <Switch>              
            <Route exact path='/' component={Homepage}>
              <Homepage />
            </Route>
            <Route path='/:type/:id'>
              <Chat loginData={loginData} headers={userHeaders} />
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


