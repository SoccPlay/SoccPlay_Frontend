import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { Grid, Typography, styled } from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CustomizedTables from "./components/History";
import ChangePassword from "./components/Security";
import { EditProfile } from "./components/EditProfile";
export default function Profile({ onClosed }) {
    return (
        <Grid item container xs={20} height={"120vh"}>
            <Container item xs={1.79} height={2}>
                <Grid item xs={12} sx={{}}>
                    <Tabs
                        aria-label="Vertical tabs"
                        orientation="vertical"
                        sx={{
                            minWidth: 190,
                            background: "#1976d2",
                            color: "white",
                        }}
                    >
                        <TabList item container mt={"60px"} sx={{}}>
                            <Tab
                                item
                                container
                                alignItems={"center"}
                                xs={17}
                                color={"#FFF"}
                            >
                                <ModeIcon sx={{ mr: "20px", color: "white" }} />
                                <Typography
                                    fontSize={"28px"}
                                    fontWeight={"bold"}
                                    color={"#FFF"}
                                >
                                    Edit profile
                                </Typography>
                            </Tab>
                            <Tab
                                item
                                container
                                alignItems={"center"}
                                xs={12}
                                color={"#FFF"}
                            >
                                <NotificationsNoneIcon
                                    sx={{ mr: "20px", color: "white" }}
                                />
                                <Typography
                                    fontSize={"28px"}
                                    fontWeight={"bold"}
                                    color={"#FFF"}
                                >
                                    History
                                </Typography>
                            </Tab>
                            <Tab
                                item
                                container
                                alignItems={"center"}
                                xs={12}
                                color={`rgba(234, 234, 234, .8)`}
                            >
                                <VpnKeyIcon
                                    sx={{ mr: "20px", color: "white" }}
                                />
                                <Typography
                                    fontSize={"28px"}
                                    fontWeight={"bold"}
                                    color={"#FFF"}
                                >
                                    Security
                                </Typography>
                            </Tab>
                        </TabList>
                        <TabPanel value={0}>
                            <ContentContainer item>
                                <EditProfile onClosed={onClosed} />
                            </ContentContainer>
                        </TabPanel>
                        <TabPanel value={1} sx={{ padding: "0px 20px 0 50px" }}>
                            <CustomizedTables />
                        </TabPanel>
                        <TabPanel value={2} sx={{ padding: "0px 20px 0 50px" }}>
                            <ChangePassword />
                        </TabPanel>
                    </Tabs>
                </Grid>
            </Container>
        </Grid>
    );
}

const Container = styled(Grid)({});
const ContentContainer = styled(Grid)({
    height: "100%",
});
