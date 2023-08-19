import {
    Grid,
    TextField,
    MenuItem,
    Typography,
    Select,
    Button,
    styled,
} from "@mui/material";
import React from "react";

export const EditProfile = ({ onClosed }) => {
    return (
        <Grid
            item
            container
            xs={12}
            sx={{ padding: "0px 20px 0 50px", width: 1000, height: 750 }}
        >
            <Grid item xs={12}>
                <Typography
                    fontSize={"30px"}
                    fontWeight={"bold"}
                    color={"black"}
                >
                    Edit Profile
                </Typography>
            </Grid>
            <Grid
                item
                container
                justifyContent={"space-between"}
                xs={12}
                mt={"40px"}
            >
                <Grid item xs={12}>
                    <Grid item xs={12} mb={"8px"}>
                        <TitleTextField fontSize={"24px"}>
                            Họ và tên
                        </TitleTextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth name="first_name" type="text" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                container
                justifyContent={"space-between"}
                xs={12}
                mt={"10px"}
            >
                <Grid item xs={12}>
                    <Grid item xs={12} mb={"8px"}>
                        <TitleTextField fontSize={"23px"}>Email</TitleTextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="email"
                            type="email"
                            placeholder="example@gmail.com"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                container
                justifyContent={"space-between"}
                xs={12}
                mt={"10px"}
            >
                <Grid item xs={12}>
                    <Grid item xs={12} mb={"8px"}>
                        <TitleTextField fontSize={"23px"}>
                            Địa chỉ
                        </TitleTextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="address"
                            type="text"
                            placeholder="123/44 Điện Biên Phủ, Bình Thạnh, HCM"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                container
                justifyContent={"space-between"}
                xs={12}
                mt={"10px"}
            >
                <Grid item xs={12}>
                    <Grid item xs={12} mb={"8px"}>
                        <TitleTextField fontSize={"23px"}>
                            Số điện thoại
                        </TitleTextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="contact_number"
                            type="text"
                            placeholder="0123-456-789"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                container
                justifyContent={"space-between"}
                xs={12}
                mt={"10px"}
            ></Grid>
            <Grid item container xs={12} mt={"40px"}>
                <Grid item xs={"auto"} mr={"10px"}>
                    <Button
                        variant="contained"
                        sx={{
                            background: "transparent",
                            color: "#1976d2",
                            border: "2px solid #1976d2",
                            "&:hover": {
                                color: "#FFF",
                            },
                        }}
                        onClick={onClosed}
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={"auto"}>
                    <Button
                        variant="contained"
                        sx={{
                            border: "2px solid #1976d2",
                            marginBottom: "40px",
                        }}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

const TitleTextField = styled(Typography)({
    fontSize: "26px",
    fontWeight: "bold",
    color: "black",
});
