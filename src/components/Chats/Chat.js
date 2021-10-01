import React from 'react'
import styled from "styled-components";
import ChatInput from './ChatInput';

function Chat() {
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
                {/* <ChatMessages> */}
                    {/* list of msgs */}
                {/* </ChatMessages> */}
                <ChatInput/ >
            </>
        </ChatContainer>
    )
}

export default Chat

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
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
