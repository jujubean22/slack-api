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
  const [channels, setChannels] = useState([]);
  const [channelsOwned, setChannelOwned] = useState([]);
  const [recentUsers, setRecentUsers] = useState("");
  const [isRender, setIsRender] = useState(false);
  const [loginUserData, setloginUserData] = useState("");
  


  const handleIsRender = () => {
    setIsRender(!isRender);
  };

  useEffect(() => {
    //get header from loginData
    setloginUserData(loginData)

    const headers = {
      token: localStorage.getItem('access-token'),
      client : localStorage.getItem('client'),
      expiry: localStorage.getItem('expiry'),
      uid: localStorage.getItem('uid')
    };

    const channelData = { headers }

    setUserHeaders(headers)

    //get channels
    getChannel(channelData) 
      .then(res => {
        setChannels(res.data.data)
        //console.log(channels)
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
      .then(res => {
        setChannelOwned(res.data.data)
        //console.log(channelsOwned)
      })
      .catch(err => err);
    
  }, [isRender]);

  if (!recentUsers) {
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
              channelsJoined={channels} 
              loginData={loginUserData} 
              recentUsers={recentUsers}
              channelsOwned={channelsOwned}
              headers={userHeaders}
              handleIsRender={handleIsRender}
            />
            <Switch>              
              <Route path='/home' component={Homepage}/>
              <Route path='/:type/:id'>
                <Chat 
                  loginData={loginUserData} 
                  headers={userHeaders} 
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


