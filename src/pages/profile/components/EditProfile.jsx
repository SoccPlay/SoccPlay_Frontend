import { Grid, TextField, Typography, Button, styled } from "@mui/material";
import { useEffect, useState } from "react";
import CustomerApi from "../../../components/Axios/CustomerApi";
import * as Yup from "yup";
import { useFormik } from "formik";

export const EditProfile = ({ onClosed }) => {
    const [profile, setProfile] = useState([]);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Vui lòng nhập email"),
        phone: Yup.string()
            .matches(
                /^(\+?84|0)(3[2-9]|5[6|8|9]|7[0|6|7|8|9]|8[1-9]|9[0-9])(\d{7})$/,
                "Số điện thoại không hợp lệ"
            )
            .required("Vui lòng nhập số điện thoại"),
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await CustomerApi.getProfile(
                localStorage.getItem("ACCOUNTID")
            );
            setProfile(response.data); // Cập nhật profile từ API
        };
        fetchProfile();
    }, []);

    const formik = useFormik({
        initialValues: profile,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log("values", values);
            await CustomerApi.updateProfile(
                localStorage.getItem("ACCOUNTID"),
                values
            );
        },
    });
    console.log("profile", profile);
    console.log("formik", formik.values);

    return (
        <Grid
            item
            container
            xs={12}
            sx={{
                padding: "0px 20px 0 50px",
                width: 1000,
                height: 750,
                backgroundColor: "white",
                height: "100vh",
            }}
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
            <form onSubmit={formik.handleSubmit}></form>
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
                            value={formik.values.fullName}
                            fullWidth
                            name="fullName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
                            value={formik.values.email}
                            fullWidth
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div style={{ color: "red" }}>
                                {formik.errors.email}
                            </div>
                        ) : null}
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
                            value={formik.values.address}
                            fullWidth
                            name="address"
                            type="text"
                            placeholder="Số nhà, đường, phường, quận, thành phố"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
                            value={formik.values.phone}
                            fullWidth
                            name="phone"
                            type="text"
                            placeholder="0123-456-789"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div style={{ color: "red" }}>
                                {formik.errors.phone}
                            </div>
                        ) : null}
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
                <Grid item xs={"auto"}>
                    <Button
                        variant="contained"
                        sx={{
                            border: "2px solid #1976d2",
                            marginBottom: "40px",
                        }}
                        onClick={formik.handleSubmit}
                        disabled={formik.isSubmitting}
                    >
                        Lưu
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
