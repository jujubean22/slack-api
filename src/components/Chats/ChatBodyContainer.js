import React from 'react';
import ChatBody from './ChatBody';
import styled from "styled-components";

function ChatBodyContainer({ chatData }) {

  return (
    <ChatBodyContainerStyle>
      {chatData.length > 0
      ? chatData.map(data=> <ChatBody key={data.id} data={data}/>)
      : ""}
    </ChatBodyContainerStyle>
  );
};

export default ChatBodyContainer;
const ChatBodyContainerStyle= styled.div`
  width: 100%;
  height: 600px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;