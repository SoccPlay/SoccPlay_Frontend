import { Grid, Typography, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModeIcon from "@mui/icons-material/Mode";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

export const SideBar = () => {
    return (
        <Container item xs={2} height={1}>
            <Grid
                item
                xs={12}
                sx={{
                    padding: "40px",
                }}
            >
                <Grid
                    item
                    container
                    alignItems={"center"}
                    justifyContent={"center"}
                    xs={12}
                >
                    <Typography
                        fontSize={"32px"}
                        fontWeight={"bold"}
                        color={"#FFF"}
                    >
                        settings
                    </Typography>
                    <ExpandMoreIcon sx={{ color: "#FFF" }} />
                </Grid>
                <Grid item container rowGap={"40px"} mt={"60px"}>
                    <Grid
                        item
                        container
                        alignItems={"center"}
                        xs={12}
                        color={"#FFF"}
                    >
                        <ModeIcon sx={{ mr: "20px" }} />
                        <Typography fontSize={"28px"} fontWeight={"bold"}>
                            Edit profile
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        alignItems={"center"}
                        xs={12}
                        color={`rgba(234, 234, 234, .8)`}
                    >
                        <NotificationsNoneIcon sx={{ mr: "20px" }} />
                        <Typography fontSize={"28px"} fontWeight={"bold"}>
                            History
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        alignItems={"center"}
                        xs={12}
                        color={`rgba(234, 234, 234, .8)`}
                    >
                        <VpnKeyIcon sx={{ mr: "20px" }} />
                        <Typography fontSize={"28px"} fontWeight={"bold"}>
                            Security
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

const Container = styled(Grid)({
    background: "#1976d2",
    height: "auto",
});
