import { Grid, TextField, Typography, Button, styled } from "@mui/material";
import { useEffect, useState } from "react";
import * as CustomerApi from "../../../components/Axios/CustomerApi";

export const EditProfile = ({ onClosed }) => {
    const [profile, setProfile] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        phone: "",
    });

    const { fullName, email, address, phone } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await CustomerApi.updateProfile(
            localStorage.getItem("ACCOUNTID"),
            fullName,
            email,
            address,
            phone
        );
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await CustomerApi.getProfile(
                localStorage.getItem("ACCOUNTID")
            );
            setProfile(response);
        };
        fetchProfile();
    }, []);

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
                    Cập nhật thông tin cá nhân
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
                        <TextField
                            defaultValue={profile.fullName}
                            fullWidth
                            name="fullName"
                            type="text"
                            onChange={(e) => handleChange(e)}
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
                            value={profile.email}
                            fullWidth
                            name="email"
                            type="email"
                            placeholder="example@gmail.com"
                            onChange={(e) => handleChange(e)}
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
                            defaultValue={profile.address}
                            fullWidth
                            name="address"
                            type="text"
                            placeholder="Số nhà, đường, phường, quận, thành phố"
                            onChange={(e) => handleChange(e)}
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
                            defaultValue={profile.phone}
                            fullWidth
                            name="phone"
                            type="text"
                            placeholder="0123-456-789"
                            onChange={(e) => handleChange(e)}
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
                        onClick={(e) => handleUpdate(e)}
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
