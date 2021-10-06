import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { getChannelData } from '../../api/API';
import styled from "styled-components";

function ChatHeader({ receiver, headers }) {
  //state
  const [channelMembers, setChannelMembers] = useState([]);
  //parameter for URL
  const params = useParams();
  const { type, id } = params;
  //data obj
  const getDataObj = {
    id: parseInt(id),
    headers
  }

  const viewUserChannelOwned = () => {
    getChannelData(getDataObj)
      .then(res => {
        setChannelMembers(res.data.data.channel_members)
      })
      .catch(err => err)
  }

  const memberList = channelMembers.map((user, index) => {
    return(
      <div key={index}>
        <p>{user.user_id}</p>
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