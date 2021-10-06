import styled from 'styled-components'
import axios from "axios"
import React, { useState, useEffect } from 'react';

function AddChannel({loginData}) {
  const [channelName, setChannelName] = useState('');
  const [usersDataArray, setUsersDataArray] = useState([]);

const createChannel = (e) => {
  e.preventDefault();
    const headers = {
      token: loginData.headers["access-token"],
      client: loginData.headers.client,
      expiry: loginData.headers.expiry,
      uid: loginData.headers.uid,
    }

    setUsersDataArray(loginData.data.data.id)
  
    const addNewChannel = {
      name: channelName,
      user_ids: [usersDataArray],
      headers: headers,
    }  

    const { name, user_ids, headers:{ token, client, expiry, uid } } = addNewChannel

    axios.post('http://206.189.91.54//api/v1/channels',
    {
      name,
      user_ids
    },
    {
      headers:{
        "access-token": token,
        "client": client,
        "expiry": expiry,
        "uid": uid,
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(error => error)


    axios.get('http://206.189.91.54//api/v1/channels',
    {
      headers:{
        "access-token": token,
        "client": client,
        "expiry": expiry,
        "uid": uid,
      }
    })
    .then(res => {
      console.log(res)
    })
    .catch(error => error)

  }

  const handleGetChannel = (e) => {
    setChannelName(e.target.value);
  }

  return (
    <AddChannelOuterContainer>
      <AddChannelContainer>
        <AddChannelForm onSubmit={createChannel} >
          <AddChannelInput 
            placeholder='Add Channel Name' 
            onChange={handleGetChannel} 
            value = {channelName}
          />    
          </AddChannelForm>
      </AddChannelContainer>
  </AddChannelOuterContainer>
  )
}

export default AddChannel

const AddChannelOuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`

const AddChannelContainer = styled.div`
z-index: 2;
height: 40vh;
width: 30vw;
background-color: whitesmoke;
font-size: 1vh;
box-shadow: 0 1px 3px rgba(219, 219, 219, 0.9), 0 1px 2px rgba(199, 194, 194, 0.75);
border-radius: 2vh;
display: flex;

`
const AddChannelForm = styled.form`
margin: auto;
display: flex;
width: 80%;
`

const AddChannelInput = styled.input`
width: 100%;
padding: 1.5vh;
height: 2vh;
margin: auto;
border-radius: 2vh;
border:1px solid black;
font-size: 2vh;
`