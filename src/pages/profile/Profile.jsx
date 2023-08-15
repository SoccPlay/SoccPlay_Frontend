import { Grid, styled } from "@mui/material";
import { SideBar } from "./components/SideBar";
import { EditProfile } from "./components";

export default function Profile({ onClose }) {
    return (
        <Grid item container xs={12} height={"100vh"}>
            <SideBar />
            <ContentContainer item xs={10}>
                <EditProfile />
            </ContentContainer>
        </Grid>
    );
}

const ContentContainer = styled(Grid)({
    height: "100%",
});
