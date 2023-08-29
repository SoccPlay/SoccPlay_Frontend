import { Button, Rating, Stack } from "@mui/material";
import { useState } from "react";
import "./Form.scss";
import { withSnackbar } from "../../hook/withSnackbar";
import * as FeedbackApi from "../Axios/FeedBackApi";

const Form = ({
  landId,
  customerId,
  handleCloseFormFeedBackDialog,
  snackbarShowMessage,
}) => {
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
      handleCloseFormFeedBackDialog();
    } catch (error) {
      snackbarShowMessage("Gửi đánh giá thất bại", "error");
      handleCloseFormFeedBackDialog();
    }
  };
  return (
    <div>
      <h2 className="underlined">
        Gửi <span class="underlined underline-clip">Đánh giá</span> của bạn:
      </h2>
      <Stack
        // sx={{ margin: "0px 0px 1% 12%", width: "100%" }}
        spacing={1}
      >
        <Rating
          style={{ marginTop: "10px" }}
          sx={{}}
          name="rate"
          defaultValue={0}
          precision={1}
          onChange={handleChangeForm}
        />
        <textarea
          style={{
            height: "150px", // Điều chỉnh chiều cao của textarea
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "8px",
          }}
          placeholder="Gửi đánh giá của bạn"
          minRows={4}
          size="lg"
          name="description"
          onChange={handleChangeForm}
        />
        <Button
          sx={{ alignSelf: "flex-end" }} // Đưa nút Gửi lên cuối form
          onClick={handleSubmitForm}
        >
          Gửi
        </Button>
      </Stack>
    </div>
  );
};

export default withSnackbar(Form);
