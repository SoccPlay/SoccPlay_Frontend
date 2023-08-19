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
            sx={{ padding: "0px 20px 0 50px", width: 1000 }}
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
                <Grid item xs={5.5}>
                    <Grid item xs={12} mb={"8px"}>
                        <TitleTextField fontSize={"23px"}>
                            First Name
                        </TitleTextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="first_name"
                            type="text"
                            placeholder="Dinh"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={5.5}>
                    <Grid item xs={12} mb={"8px"}>
                        <TitleTextField fontSize={"23px"}>
                            Last Name
                        </TitleTextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="last_name"
                            type="text"
                            placeholder="Dinh"
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
                            Address
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
                            Contact Number
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
            >
                <Grid item xs={5.5}>
                    <Grid item xs={12} mb={"8px"}>
                        <TitleTextField fontSize={"23px"}>City</TitleTextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            fullWidth
                            name="city"
                            type="select"
                            value={"default"}
                        >
                            <MenuItem value={"default"}>
                                -- Chọn City --
                            </MenuItem>
                            <MenuItem value={"hcm"}>Hồ Chí Minh</MenuItem>
                            <MenuItem value={"hn"}>Hà Nội</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid item xs={5.5}>
                    <Grid item xs={12} mb={"8px"}>
                        <TitleTextField fontSize={"23px"}>State</TitleTextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            fullWidth
                            name="state"
                            type="select"
                            value={"default"}
                        >
                            <MenuItem value={"default"}>
                                -- Chọn State --
                            </MenuItem>
                            <MenuItem value={"state 01"}>state 01</MenuItem>
                            <MenuItem value={"state 02"}>state 02</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </Grid>
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
