import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getChannel, getRecentDm, getOwnedChannel } from '../../api/API';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import styled from "styled-components";
import Homepage from './Homepage';
import Chat from '../Chats/Chat';
import NewMessage from '../NewMessage/NewMessage';

function Home({ loginData }) {
  //state
  const [userHeaders, setUserHeaders] = useState("");
  const [channels, setChannels] = useState("");
  const [channelOwned, setChannelOwned] = useState('');
  const [recentUsers, setRecentUsers] = useState("");
  const [isRender, setIsRender] = useState(false);
  const [loginUserData, setloginUserData] = useState("");


  const handleIsRender = () => {
    setIsRender(!isRender);
  };

  useEffect(() => {
    //get header from loginData
    const headers = {
      token: loginData.headers["access-token"],
      client: loginData.headers.client,
      expiry: loginData.headers.expiry,
      uid: loginData.headers.uid,
    };

    const channelData = { headers }

    setUserHeaders(headers);
    setloginUserData(loginData.data);

    //get channels
    getChannel(channelData) 
      .then(res => {
        setChannels(res)
      })
      .catch(err => console.log("Error Getting Channel: ", err))

    //recently DMs
    getRecentDm(channelData)
      .then(res => {
        setRecentUsers(res.data.data)
      })
      .catch(err => console.log("Error Getting Recent Users: ", err))
    
    //get owned channels
    getOwnedChannel(channelData)
      .then(res => setChannelOwned(res.data.data))
      .catch(err => err);
    
  }, [isRender]);

  if (!channels.data || !recentUsers) {
    return <div><h1>Loading...</h1></div>
  }
  
  return (
    <div>
      <Router>
        <Header 
          loginData={loginData} 
          headers={userHeaders}
          />
          <Appbody>
            <Sidebar 
              channels={channels} 
              loginData={loginData} 
              recentUsers={recentUsers}
              channelOwned={channelOwned}
              isRender={isRender}
              loginUserData={loginUserData}
              headers={userHeaders}
              handleIsRender = {handleIsRender}
            />
            <Switch>              
              <Route exact path='/' component={Homepage}>
                <Homepage />
              </Route>
              <Route path='/:type/:id'>
                <Chat 
                  loginData={loginData} 
                  headers={userHeaders} 
                  handleIsRender={handleIsRender} 
                  />
              </Route>
              <Route exact path="/new-message">
                <NewMessage headers={userHeaders} />
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


