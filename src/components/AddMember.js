import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components';

function AddMember({headers, handleToggleAddMembers, handleAddMemberstoArray}) {

  const [allUsers, setAllUsers] = useState([]);
  const [searching, setSearching] = useState("");

  const viewAllUsers = () => {
    const { token, client, expiry, uid  } = headers
    
    axios.get('http://206.189.91.54//api/v1/users',
    {
      headers:{
        "access-token": token,
        "client": client,
        "expiry": expiry,
        "uid": uid,
      }
    })
    .then(res => {
      const userArray = res.data.data
      const resArray = userArray.filter( u => u.email.includes(searching))
      setAllUsers(resArray)
    })
    .catch(err => err)
  }

  const handleSearch = (e) => {
    setSearching(e.target.value);
    viewAllUsers()
  }

  const searchUserList = allUsers.map((user, index) => {
    return(
      <LinkElement onClick={() => handleAddMemberstoArray(user.id)}>
        <SearchBoxResults key={index}>
          <p>{user.email}</p>
        </SearchBoxResults>
      </LinkElement>
    )
  })

  return (
    <div>
      <HeaderSearch>
          <input type="text" placeholder="SEARCH" onChange={handleSearch}/>
          <p onClick={handleToggleAddMembers}>x</p>
        </HeaderSearch> 
        <SearchBoxResult>
          {searchUserList}
        </SearchBoxResult>
    </div>
  )
}

export default AddMember


const HeaderSearch = styled.div`
  background-color: white;
  margin-top: 1rem;
  height: 3rem;
  width: 25rem;
  display: flex;
  padding-right: 1rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  border-bottom: 1px gray solid;
  
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    color: black;
    outline: 0;
    font-weight: bolder;
    font-size: 1rem;
  }

  > p {
    color: black;
    cursor: pointer;
  }
`;

const SearchBoxResult = styled.div`
  width: 100%;
  max-height: 30rem;
  overflow-y: scroll;
  border-radius: 0.5rem;
`

const LinkElement = styled.div`
  text-decoration: none;
`

const SearchBoxResults = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-left: 3rem;
  cursor: pointer;
  background: white;

  > p {
    font-size: 1rem;
    font-weight: bolder;
    padding-left: 1rem;
    letter-spacing: .2px;
    color: black;
  }

  :hover {
    background-color: #135999;

    > p {
      color: white;
    }
  }
`
