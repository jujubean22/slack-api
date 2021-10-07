import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getChannelData } from '../../api/API';
import styled from "styled-components";
import axios from "axios"

function ChatHeader({ receiver, headers }) {
  //state
  const [channelMembers, setChannelMembers] = useState([]);
  const [channelMemberInfo, setChannelMemberInfo] = useState([]);
  const [allUsers, setAllUsers] = useState([])
  //parameter for URL
  const params = useParams();
  const { type, id } = params;
  //data obj
  const getDataObj = {
    id: parseInt(id),
    headers
  }

  const viewUserChannelOwned = () => {

  }

  const { token, client, expiry, uid } = headers

  useEffect(() => {
    axios.get('http://206.189.91.54//api/v1/users',
    {
      headers:{
        "access-token": token,
        "client": client,
        "expiry": expiry,
        "uid": uid,
      }
    })
    .then(res => {
      setAllUsers(res.data.data)
      getChannelData(getDataObj)
      .then(res => {
        setChannelMembers(res.data.data.channel_members)
      })
      .catch(err => err)
    })
    .catch(err => err)

  }, [id])

  useEffect(() => {
      if (channelMembers){
        channelMembers.map(user => {
          axios.get('http://206.189.91.54//api/v1/users',
          {
            headers:{
              "access-token": token,
              "client": client,
              "expiry": expiry,
              "uid": uid,
            }
          })
          .then(res => {
            const userArray = res.data.data
            console.log(userArray[4].id)
            const resArray = userArray.filter(u => u.email.includes('user12@example.com'))
            //setAllUsers(resArray)
            //console.log(resArray)
          })
          .catch(err => err)

          //console.log(user.user_id)
        })
      }
    }, [channelMembers])

  const memberList = channelMemberInfo.map((user, index) => {
    return(
      <div key={index}>
        <p>{user.email}</p>
      </div>
    )
  })

  return (
    <ChatHeaderContainer>
      <HeaderLeft>  
        <h2>
          <strong>{type === "channel" ? receiver : receiver}</strong>
        </h2>
      </HeaderLeft>
      <HeaderRight>
        <button onClick={viewUserChannelOwned}>Member List</button>
        <button>Add Member</button>
      </HeaderRight>
      <MemberList>
        {memberList}
      </MemberList>
    </ChatHeaderContainer>
  )
}

export default ChatHeader

const ChatHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  text-transform: lowercase;
`;
const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;

  > button {
    margin: 1vh;
  }
`;

const MemberList = styled.div`
  position: absolute;
  background: gray;
  height: 20rem;
  width: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`