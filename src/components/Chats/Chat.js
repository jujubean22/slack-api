import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import ChatInput from './ChatInput';
import ChatBodyContainer from './ChatBodyContainer';
import axios from 'axios';
import { useParams } from "react-router-dom"
import { ContactSupportOutlined } from '@material-ui/icons';

function Chat({ loginData, headers, handleIsRender }) {
  const [chatData, setChatData] = useState("");
  const [isRender, setIsRender] = useState(false);
  const chatRef = useRef(null)
  const [receiver, setReceiver] = useState("")

  const params = useParams()
  const { type, id } = params

  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  const handleChatIsRender = () => {
    setIsRender(!isRender);
    handleIsRender()
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

    //Get User Message Data
    axios.get(`http://206.189.91.54//api/v1/messages?receiver_class=${capitalizedType}&receiver_id=${parseInt(id)}`, 
    {
    headers:{
      "access-token": token,
      "client": client,
      "expiry": expiry,
      "uid": uid,
      }
    })
    .then(res => { setChatData(res.data.data) })
    .catch(err => console.log("Error Sending Message: ", err))

    if(type==="user"){
      //Get User Data
      axios.get(`http://206.189.91.54//api/v1/users`,
      {
        headers:{
          "access-token": token,
          "client": client,
          "expiry": expiry,
          "uid": uid,
        }
      })
      .then(res => {
        //console.log("User DATA: ", res.data.data.filter(data => data.id === parseInt(id)))
        const userData = res.data.data.filter(data => data.id === parseInt(id))
        //console.log(userData[0].email)
        setReceiver(userData[0].email)
      })
    } else {
      //Get Channel Data
      axios.get(`http://206.189.91.54//api/v1/channels/${parseInt(id)}`,
      {
        headers:{
          "access-token": token,
          "client": client,
          "expiry": expiry,
          "uid": uid,
        }
      }).then(res => {
        //console.log("Channel DATA: ",res)
        setReceiver(res.data.data.name)
      })
    }

    scrollToBottomSmooth()

  }, [id, isRender]);

  //if(!receiver) return <></>

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
