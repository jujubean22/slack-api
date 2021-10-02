import React, { useState } from 'react'
import styled from 'styled-components';
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import axios from 'axios'


function Header({loginData}) {

  const [allUsers, setAllUsers] = useState([])
  const [searching, setSearching] = useState("")

  const viewAllUsers = () => {
  
    axios.get('http://206.189.91.54//api/v1/users',
    {
      headers:{
        "access-token": loginData.headers["access-token"],
        "client": loginData.headers.client,
        "expiry": loginData.headers.expiry,
        "uid": loginData.headers.uid,
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

  //generate UI for searches
  const searchUserList = allUsers.map(user => {
    return(
      <div key={user.id}>
        <h3>{user.email}</h3>
      </div>
    )
  })

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar 
        //ADD onClick 
        />
        <AccessTimeIcon />
      </HeaderLeft>

      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="SEARCH" onChange={handleSearch}/>
      </HeaderSearch> 
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
      <UsersSearched> 
        {searching ? searchUserList : ""}
      </UsersSearched>
    </HeaderContainer>
)
}

export default Header

const HeaderSearch = styled.div`
  flex: 0.4;
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
    outline:0;
    color: white;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const UsersSearched = styled.div`
  position: absolute;
  top: 8rem;
  right: 10rem;
  color: black;
  height: 100%;
  width: 50%;
`;