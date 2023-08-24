import { useEffect, useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { Grid, Typography, styled } from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ChangePassword from "./components/Security";
import { EditProfile } from "./components/EditProfile";
import CustomizedTables from "./components/Security";
import Sidebar from "./components/SideBar";
import "../profile/profile.css";

const Profile = () => {
  return (
    <div className="App">
      <Sidebar />
      {/* <div className="AppGlass"><CustomizedTables /></div> */}
    </div>
  );
};
export default Profile;
// const Container = styled(Grid)({});
// const ContentContainer = styled(Grid)({
//   height: "100%",
// });
