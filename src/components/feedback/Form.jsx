import { Button, Rating, Stack } from "@mui/material";
import { useState } from "react";
import "./Form.scss";
import { withSnackbar } from "../../hook/withSnackbar";
import * as FeedbackApi from "../Axios/FeedBackApi";

const Form = ({ landId, customerId, snackbarShowMessage }) => {
    const [form, setFrom] = useState({});
    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setFrom((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitForm = async () => {
        const formData = {
            rate: form?.rate,
            description: form?.description,
            landId: landId,
            customerId: customerId,
        };
        try {
            await FeedbackApi.createFeedBack(formData);
            snackbarShowMessage("Cảm ơn bạn đã đánh giá", "success");
        } catch (error) {
            snackbarShowMessage("Gửi đánh giá thất bại", "error");
        }
    };
    return (
        <div>
            <h2
                className="underlined"
                style={{ marginTop: "30px", marginRight: "50px" }}
            >
                Gửi <span class="underlined underline-clip">Đánh giá</span> của
                bạn:
            </h2>
            <Stack sx={{ margin: "0px 0px 1% 12%", width: "100%" }} spacing={1}>
                <Rating
                    sx={{
                        width: "20%",
                        height: "10%",
                        position: "absolute",
                        top: "51.5%",
                        left: "61.5%",
                        margin: "20px",
                    }}
                    name="rate"
                    defaultValue={0}
                    precision={1}
                    onChange={handleChangeForm}
                />
                <textarea
                    style={{
                        position: "absolute",
                        top: "53.5%",
                        left: "61.5%",
                        width: "20%",
                        height: "10%",
                        border: "1px solid #ccc",
                    }}
                    placeholder="Gửi đánh giá của bạn"
                    minRows={4}
                    size="lg"
                    name="description"
                    onChange={handleChangeForm}
                />
                <Button
                    sx={{
                        position: "absolute",
                        top: "60%",
                        left: "55%",
                        border: "1px solid #ccc",
                    }}
                    onClick={handleSubmitForm}
                >
                    Gửi
                </Button>
            </Stack>
        </div>
    );
};

export default withSnackbar(Form);
