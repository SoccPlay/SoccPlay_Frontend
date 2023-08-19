import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";

export default function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSavePassword = () => {
        // Here you can add your logic to save the new password
        // and perform necessary validation
        console.log("Current Password:", currentPassword);
        console.log("New Password:", newPassword);
        console.log("Confirm Password:", confirmPassword);
    };

    return (
        <Container sx={{ width: 400, height: 750 }}>
            <Typography
                fontSize={"30px"}
                fontWeight={"bold"}
                color={"black"}
                left={10}
            >
                Thay đổi mật khẩu
            </Typography>
            <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                <InputLabel htmlFor="current-password">
                    Mật khẩu hiện tại
                </InputLabel>
                <OutlinedInput
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Mật khẩu hiện tại"
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                <InputLabel htmlFor="new-password">Mật khẩu mới</InputLabel>
                <OutlinedInput
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Mật khẩu mới"
                />
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                <InputLabel htmlFor="confirm-password">
                    Nhập lại mật khẩu
                </InputLabel>
                <OutlinedInput
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Nhập lại mật khẩu"
                />
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSavePassword}
                sx={{ mt: 2 }}
            >
                Save
            </Button>
        </Container>
    );
}
