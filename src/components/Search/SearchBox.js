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

  const searchUserList = allUsers.map(user => {
    return(
      <NavLink to={`/user/${user.id}`} onClick={handleToggleSearchBox}>
        <div key={user.id}>
          <h3>{user.email}</h3>
        </div>
      </NavLink>
    )
  })
  
  return (
    <div>
      <HeaderSearch>
        <input type="text" placeholder="SEARCH" onChange={handleSearch}/>
      </HeaderSearch> 
      <UsersSearched>
        {searchUserList}
      </UsersSearched>
      
    </div>
  )
}

export default SearchBox;

const HeaderSearch = styled.div`
  position: absolute;
  top: 1rem;
  right: 10rem;
  opacity: 1;
  border-radius: 6px;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: grey;
  border: 1px gray solid;
  
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw ;
    outline: 0;
    color: white;
  }
`;

const UsersSearched = styled.div`
  position: absolute;
  background: gray;
  top: 8rem;
  right: 10rem;
  color: black;
  height: 100%;
  width: 50%;
`;