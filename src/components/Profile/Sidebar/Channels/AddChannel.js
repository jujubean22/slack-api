import styled from 'styled-components'
import React, { useState} from 'react';
import { addChannel } from "../../../../api/API"

function AddChannel({loginData, headers, handleToggleAddChannel }) {

  //state
  const [channelName, setChannelName] = useState('')
  const [errorWarning, setErrorWarning] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [usersDataArray, setUsersDataArray] = useState([])

  //channel name value
  const handleChannelInput = (e) => {
    setChannelName(e.target.value);
  }

  const createChannel = (e) => {
    e.preventDefault();

    setUsersDataArray(loginData.data.data.id)

    const addNewChannelObj = {
      name: channelName,
      user_ids: [usersDataArray],
      headers: headers,
    }  

    addChannel(addNewChannelObj)
    .then(res => {
      if(res.data.errors[0] !== null) {
        setErrorText(res.data.errors[0])
        setErrorWarning(true)
      } else {
        console.log("successfully added", res)
        setErrorWarning(false)
      }
    })
    .catch(error => error)
  }

  return (
    <AddChannelOuterContainer>
      <AddChannelContainer>
        <AddChannelForm onSubmit={createChannel} >
          <AddChannelInput 
            placeholder='Add Channel Name' 
            onChange={handleChannelInput} 
            value = {channelName}
          />
          <button onClick={createChannel}>Next</button>
          <ErrorStyle>{errorWarning ? <p>{errorText}</p> : "" }</ErrorStyle>
        </AddChannelForm>
        {/* <AddMemberChannelForm>
        </AddMemberChannelForm> */}
      </AddChannelContainer>
  </AddChannelOuterContainer>
  )
}

export default AddChannel

const AddChannelOuterContainer = styled.div`
  z-index: 2;
  margin: 0 auto;
  position: absolute;
  top: 20%;
  left: 40%;
`

const AddChannelContainer = styled.div`
z-index: 2;
  height: 40vh;
  width: 30vw;
  flex-direction: column;
  background-color: whitesmoke;
  font-size: 1vh;
  box-shadow: 0 1px 3px rgba(219, 219, 219, 0.9), 0 1px 2px rgba(199, 194, 194, 0.75);
  border-radius: 2vh;
  display: flex;
`
const AddChannelForm = styled.form`
margin: auto;
  display: flex;
  flex-direction: column;
  width: 80%;
`

const AddChannelInput = styled.input`
  width: 100%;
  padding: 1.5vh;
  height: 2vh;
  margin: auto;
  border-radius: 2vh;
  border:1px solid black;
  font-size: 2vh;
`

const AddMemberChannelForm = styled.form`
  margin: auto;
  display: flex;
  width: 80%;
  padding: 2vh;
`

const AddMemberChannelSearch = styled.input`
  width: 100%;
  padding: 1.5vh;
  height: 2vh;
  margin: auto;
  border-radius: 2vh;
  border:1px solid black;
  font-size: 2vh;
`

const ErrorStyle = styled.div`
  > p {
    color: red;
  }
`