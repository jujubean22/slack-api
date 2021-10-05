import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import ChatInput from './ChatInput';
import ChatBodyContainer from './ChatBodyContainer';
import { getMessage, getUser, getChannelData } from '../../API';
import { useParams } from "react-router-dom"

function Chat({ loginData, headers, handleIsRender }) {
  const [chatData, setChatData] = useState("");
  const [receiver, setReceiver] = useState("");
  const [isRender, setIsRender] = useState(false);
  const chatRef = useRef(null);

  //parameter from URL
  const params = useParams();
  const { type, id } = params;

  //capitalize the first letter 
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  const handleChatIsRender = () => {
    setIsRender(!isRender);
    handleIsRender()
  }

  //Smooth scrolling to bottom
  const scrollToBottomSmooth = () => {
    chatRef?.current?.scrollIntoView({ behavior: "smooth" })
  }

  //Scroll to bottom on chat
  const scrollToBottom = () => {
    chatRef?.current?.scrollIntoView()
  }

  useEffect(scrollToBottom, [chatData]);

  //Message Object Data
  const getMessageObj = {
    receiver_class: capitalizedType,
    receiver_id: parseInt(id),
    headers
  };

  const getDataObj = {
    id: parseInt(id),
    headers
  }


  useEffect(() => {
    //Get User Message Data
    getMessage(getMessageObj)
      .then(res => { setChatData(res.data.data)})
      .catch(err => console.log("Error Sending Message: ", err))

    if(type==="user"){
      //Get User Data
      getUser(getDataObj)
      .then(result => {
        setReceiver(result[0].email)
      })
    } else {
      //Get Channel Data
      getChannelData(getDataObj)
        .then(res => {
          setReceiver(res.data.data.name)
        })
    }
scrollToBottomSmooth();
}, [id, isRender]); 

  return (
    <ChatContainer>
      <>
        <ChatHeaderContainer>
          <HeaderLeft>  
            <h2>
              <strong>{type === "channel" ? receiver : receiver}</strong>
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
        
        <ChatInput loginData={loginData} handleIsRender={handleChatIsRender} headers={headers}/>
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
