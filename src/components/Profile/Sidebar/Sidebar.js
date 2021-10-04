import React, { useEffect } from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import EmailIcon from '@material-ui/icons/Email';
import SidebarOption from "./SidebarOption";
import { useHistory, NavLink } from "react-router-dom";

function Sidebar({channels, loginData, recentUsers, isRender, loginUserData}) {

  const userID = loginUserData && loginUserData.data ? loginUserData.data.id : null;
  const { id, email } = loginData.data.data

  const renderChannels = channels.data.data
    ? channels.data.data.map((channel, index) => {
        return (
          <NavLink 
            style={{textDecoration: 'none', color: 'white'}} 
            to={`/channel/${channel.id}`}>
            <SidebarOption
              key={index}
              Icon={InsertCommentIcon}
              title={channel.name}
            />
            {console.log(index)}
          </NavLink>
        );
      })
    : "";

  const renderRecentUsers = recentUsers
  ? recentUsers.map((user, index) => {
    if (user.id !== userID)
      return (
        <NavLink 
          style={{textDecoration: 'none', color: 'white'}} 
          to={`/user/${user.id}`}>
          <SidebarOption
            key={index}
            Icon={InsertCommentIcon}
            title={user.uid}
          />
          {console.log(index)}
        </NavLink>
      );
    })
  : "";

  useEffect(() => {}, [isRender]);

  const userName = email.split("@")[0]
  const capitalizedUser = userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <SidebarContainer>
      <SidebarHeader>
      <SidebarInfo>
        <h2>{email}</h2>
        <h2></h2>
        <h3>
        <FiberManualRecordIcon />
        {capitalizedUser}
        </h3>
      </SidebarInfo>
      <CreateIcon />
      </SidebarHeader>
      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & Reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channel" />
      <hr />
      {renderChannels}
      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
      <hr />
      <SidebarOption Icon={EmailIcon} addChannelOption title="Direct Messages" />
      <hr />
      {renderRecentUsers}
    </SidebarContainer>
  
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.5;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  overflow-y: auto;

  >hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 1000px;
  }
  `;

  const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 5px;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    font-weight: 400;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
  `;
