import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';


function ChatInput() {
    const [loginData, setLoginData] = useState("")
    const [sendMessage, setSendMessage] = useState('')


    const handleMessage = (e) => {
        e.preventDefault()

        const headers = {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'expiry': localStorage.getItem('expiry'),
        'uid': localStorage.getItem('uid'),
        }

        const sendMessageObj = {
        receiver_id: 765,
        receiver_class: "User",
        body: sendMessage,
        headers: headers
        }

        const { receiver_id, receiver_class, body, headers:{ token, client, expiry, uid } } = sendMessageObj

        axios.post("http://206.189.91.54//api/v1/messages", 
        {
        receiver_id,
        receiver_class,
        body
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
        .catch(err => console.log("Error Sending Message: ", err))

        
        axios.get("http://206.189.91.54//api/v1/messages", 
        {
        headers:{
            "access-token": token,
            "client": client,
            "expiry": expiry,
            "uid": uid,
        },
        params: {
            receiver_id,
            receiver_class
        }
        })
        .then(res => {
        console.log("this is the message data: ")
        console.log(res.data)
        })
        .catch(err => console.log("Error Sending Message: ", err))
    }

    return (
        <ChatInputContainer>
            <form >
                <input type="text" placeholder={'room'} />
                <Button hidden type='submit' onClick={handleMessage} >Send</Button>
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
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }
    >form >button{
        display: none;
    }
`;
