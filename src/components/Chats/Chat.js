import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import ChatInput from './ChatInput';
import ChatBodyContainer from './ChatBodyContainer';
import axios from 'axios';

function Chat({ loginData, headers }) {
  const [chatData, setChatData] = useState("");
  const [isRender, setIsRender] = useState(false);
  const chatRef = useRef(null)

  const handleIsRender = () => {
    setIsRender(!isRender);
  }

  const scrollToBottomSmooth = () => {
    chatRef?.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToBottom = () => {
    chatRef?.current?.scrollIntoView()
  }

  useEffect(scrollToBottom, [chatData]);

  useEffect(() => {
    const { token, client, expiry, uid  } = headers

    axios.get(`http://206.189.91.54//api/v1/messages?receiver_class=User&receiver_id=${765}`, 
    {
    headers:{
      "access-token": token,
      "client": client,
      "expiry": expiry,
      "uid": uid,
      }
    })
    .then(res => {
      setChatData(res.data.data);
      //console.log("Chat render:", chatData);
    })
    .catch(err => console.log("Error Sending Message: ", err))

    scrollToBottomSmooth()

  }, [isRender]);

  return (
    <ChatContainer>
      <>
        <ChatHeaderContainer>
          <HeaderLeft>  
            <h2>
              <strong>Sender</strong>
            </h2>
          </HeaderLeft>
          <HeaderRight>
            {/* <button> Add Member</button>
            <button> Member List</button> */}
          </HeaderRight>
        </ChatHeaderContainer>
        <ChatMessages>
          <ChatBodyContainer chatData={chatData} chatRef={chatRef}/>
        </ChatMessages>
        
        <ChatInput loginData={loginData} handleIsRender={handleIsRender} headers={headers}/>
      </>
    </ChatContainer>
  )
}

export default Chat

const ChatContainer = styled.div`
  width: 100vw;
  flex: 0.7;
  flex-grow: 1;
  margin-top: 60px;
`;

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
  flex-direction: column;

  > button {
    margin: 1vh;
  }
`;

const ChatMessages = styled.div`
  padding: 3rem;
  margin-bottom: 2rem;
`;
