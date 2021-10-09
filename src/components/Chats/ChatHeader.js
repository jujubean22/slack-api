import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getChannelData, getAllUsers } from '../../api/API';
import styled from "styled-components";
import AddMember from '../AddMember';

function ChatHeader({ receiver, headers }) {
  //state
  const [channelMembers, setChannelMembers] = useState([]);
  const [channelMemberInfo, setChannelMemberInfo] = useState([]);
  const [allUsers, setAllUsers] = useState([])
  const [toggleViewMembers, setToggleViewMembers] = useState(false)
  const [toggleAddMembers, setToggleAddMembers] = useState(false)
  const [addUserArray, setAddUserArray] = useState([])

  //parameter for URL
  const params = useParams();
  const { type, id } = params;
  //data obj
  const getDataObj = {
    id: parseInt(id),
    headers
  }

  const handleToggleViewMembers = () => {
    setToggleViewMembers(!toggleViewMembers)
  }

  const handleToggleAddMembers = () => {
    setToggleAddMembers(!toggleAddMembers)
  }

  const handleAddMemberstoArray = (data) => {
    console.log(data)
  }

  useEffect(() => {
    getAllUsers(headers)
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
    setChannelMemberInfo([])
    channelMembers.forEach(member => {
      const kahitano = allUsers.find(user => user.id === member.user_id)
      setChannelMemberInfo(prev => [...prev, kahitano])
    })
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
        <button onClick={handleToggleViewMembers}>Member List</button>
        <button onClick={handleToggleAddMembers}>Add Member</button>
      </HeaderRight>
      {toggleViewMembers 
        ? 
        <MemberList>
          {memberList}
        </MemberList>
        : ""
      }
      {toggleAddMembers 
        ? 
        <MemberList>
          <AddMember 
            headers={headers} 
            handleToggleAddMembers={handleToggleAddMembers}
            handleAddMemberstoArray={handleAddMemberstoArray}
          />
        </MemberList>
        : ""
      }
      
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
  height: 40rem;
  width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: .5rem;
  transform: translateX(10rem);
`