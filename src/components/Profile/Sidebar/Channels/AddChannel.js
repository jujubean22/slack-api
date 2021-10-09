import styled from 'styled-components'
import axios from "axios"
import React, { useState} from 'react';
import { Link } from "react-router-dom";

function AddChannel({loginData, headers, handleIsRender }) {
const [addChannel, setAddChannel] = useState('')
const [usersDataArray, setUsersDataArray] = useState([])
const [userList, setUserList] = useState([])
const [newMember, setNewMember] = useState('')
  
//calling add member in a created channel modal
  // const [toggleAddChannelMember, setToggleAddChannelMemberyar] = useState(false)

  const getAllUsers = () => {
    const {token, client, expiry, uid} = headers

    axios.get("http://206.189.91.54//api/v1/users", 
    {
      headers:{
        "access-token": token,
        "client": client,
        "expiry": expiry,
        "uid": uid,
      }
    })
    .then(res => {
      setUserList(res.data.data)
      console.log(userList)
    })
    .catch(error => error)
  }

  const createChannel = (e) => {
  const newMembers = userList.find( u => u.uid === newMember)
  e.preventDefault();

    setUsersDataArray([loginData.data.data.id])
    console.log(usersDataArray);

  
    const addNewChannel = {
      name: addChannel,
      user_ids: usersDataArray,
      headers: headers,
    }  

    const { name, user_ids, headers:{ token, client, expiry, uid } } = addNewChannel

    axios.post('http://206.189.91.54//api/v1/channels',
    {
      name,
      user_ids
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
    .catch(error => error)


    axios.get('http://206.189.91.54//api/v1/channels',
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
    .catch(error => error)
    handleIsRender()
  }

  const handleGetChannel = (e) => {
    e.preventDefault();
    setAddChannel(e.target.value);
    getAllUsers()
  }

  // const AddMemberChannel =(e) =>{
  //   e.preventDefault()
  //   const newMembers = userList.find( u => u.uid === newMember)
  //   let newMembersId = newMembers.id
  //   console.log(newMembers.id)

  //     const addingNewMember = {
  //     id: newMembersId,
  //     headers: headers,
  //   }
  //   const { id, member_id, headers:{token, client, expiry, uid}} = addingNewMember

  //   axios.post('http://206.189.91.54//api/v1/channel/add_member',
  //   {
  //     id,
  //     member_id
  //   },
  //   {
  //     headers:{
  //       "access-token": token,
  //       "client": client,
  //       "expiry": expiry,
  //       "uid": uid,
  //     }
  //   })
  //   .then(res => {
  //     console.log(res)
  //   })
  //   .catch(error => error)
  // }

  const handleAddMemberChannel = (e) => {
    setNewMember(e.target.value)
  }

  return (
    <AddChannelOuterContainer>
      <AddChannelContainer>
        <AddChannelForm onSubmit={createChannel} >
          <AddChannelInput 
            placeholder='Add Channel Name' 
            onChange={handleGetChannel} 
            value = {addChannel}
          />    
          </AddChannelForm>
          <AddMemberChannelForm 
          // onSubmit = {AddMemberChannel} 
          >
              <AddMemberChannelSearch
                placeholder='Add Member'
                onChange = {handleAddMemberChannel}
              />
          </AddMemberChannelForm>
          {/* <Link to="/addChannelMember" >Add Members</Link> */}
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