import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import styled from "styled-components";
import axios from 'axios';


function ChatInput({loginData, handleIsRender, headers}) {
  const [sendMessage, setSendMessage] = useState('');

  const { token, client, expiry, uid  } = headers

  const handleMessage = (e) => {
    e.preventDefault()

    axios.post("http://206.189.91.54//api/v1/messages",
      {
        receiver_id: 765,
        receiver_class: "User",
        body: sendMessage
      },
      {
        headers: {
          "access-token": token,
          "client": client,
          "expiry": expiry,
          "uid": uid,
        }
      })
      .then(res => {
        // console.log("Chat send render: ", res);
        handleIsRender();
      })
      .catch(err => console.log("Error Sending Message: ", err));

    setSendMessage("");
  }

  
  const handleSendMessage = (e) => {
    setSendMessage(e.target.value);
  }

  return (
    <ChatInputContainer>
      <form >
        <input
          type="text"
          placeholder={'room'}
          onSubmit={handleMessage}
          value={sendMessage}
          onChange={handleSendMessage}
        />
        <Button
          type='submit'
          onClick={handleMessage}
        > Send
        </Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  >form >input{
    position: fixed;
    bottom: 2rem;
    width: 70%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 1rem;
    outline: none;
  }
  >form >button{
    display: none;
  }
`;
