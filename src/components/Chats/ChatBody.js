import React from 'react';
import styled from "styled-components";

function ChatBody({data}) {

  const { body, created_at, sender: {id, email} } = data

  return (
    <ChatBodyStyle>
      <div>
        <Image src={`https://picsum.photos/id/${id}/40`} alt=""/> 
      </div>
      <div>
        <h1>{email}</h1>
        <label>{created_at} ago</label>
      </div>
      <div>
        {body}
      </div>
    </ChatBodyStyle>
  );
};

export default ChatBody;

const ChatBodyStyle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Image = styled.img`
  border-radius: 50%;
`;
