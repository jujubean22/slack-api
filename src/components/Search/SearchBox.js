import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function SearchBox({headers, handleToggleSearchBox}) {
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
      const resArray = userArray.filter(u => u.email.includes(searching))
      setAllUsers(resArray)
      //console.log(resArray)
    })
    .catch(err => err)
  }

  const handleSearch = (e) => {
    setSearching(e.target.value);
    viewAllUsers()
  }

  const searchUserList = allUsers.map((user, index) => {
    return(
      <NavLink to={`/user/${user.id}`} onClick={handleToggleSearchBox}>
        <SearchBoxResults key={index}>
          <p>{user.email}</p>
        </SearchBoxResults>
      </NavLink>
    )
  })
  
  return (
    <SearchBoxContainer>
      <div>
        <HeaderSearch>
          <input type="text" placeholder="SEARCH" onChange={handleSearch}/>
          <p onClick={handleToggleSearchBox}>x</p>
        </HeaderSearch> 
        <SearchBoxResult>
          {searchUserList}
        </SearchBoxResult>
      </div>
    </SearchBoxContainer>
  )
}

export default SearchBox;

const SearchBoxContainer = styled.div`
  position: absolute;
  width: 60vw;
  height: 100%;
  top: 1rem;
  left: 10rem;
  display: flex;
  padding-top: .5rem;
  align-items: flex-start;
  justify-content: center;
  overflow-y: hidden;
  
  > div {
    width: 60%;
    border-radius: .5rem;
  }
`

const HeaderSearch = styled.div`
  background-color: gray;
  height: 6vh;
  width: 100%;
  padding-left: 4rem;
  padding-right: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
    cursor: pointer;
  }
`;

const SearchBoxResult = styled.div`
  width: 100%;
  max-height: 30rem;
  overflow-y: scroll;
`

const SearchBoxResults = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  padding-left: 3rem;
  cursor: pointer;

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
