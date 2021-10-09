import React, { useState } from 'react'
import styled from 'styled-components';
import { getAllUsers, getUser } from '../api/API'

function AddMember({headers, handleToggleAddMembers, handleAddMemberstoArray}) {

  const [allUsers, setAllUsers] = useState([]);
  const [searching, setSearching] = useState("");

  const userSearchDetails = (id) => {

  }

  const viewAllUsers = () => {
    
    getAllUsers(headers)
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
      <LinkElement onClick={() => userSearchDetails(user.id)}>
        <SearchBoxResults key={index}>
          <p>{user.email}</p>
        </SearchBoxResults>
      </LinkElement>
    )
  })

  return (
    <AddMemberContainer>
      <HeaderSearch>
          <input type="text" placeholder="SEARCH" onChange={handleSearch}/>
          <p onClick={handleToggleAddMembers}>x</p>
        </HeaderSearch> 
        <SearchBoxResult>
          {searchUserList}
        </SearchBoxResult>
    </AddMemberContainer>
  )
}

export default AddMember

const AddMemberContainer = styled.div`
  
`

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
  width: 26rem;
  max-height: 30rem;
  overflow-y: scroll;
  overflow-x: hidden;
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
