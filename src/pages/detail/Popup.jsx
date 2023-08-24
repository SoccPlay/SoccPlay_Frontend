import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Scheduler from "../../components/scheduler/Scheduler";
import Order from "../../components/bill/Order";
import Invoice from "../../components/bill/Invoice";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    maxWidth: "100%",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export function Popups({ data }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log("Data của popup: ", data);

  return (
    <div>
      {/* <button
        className="check-calender"
        style={{ width: "200px" }}
        onClick={handleClickOpen}
      >
        Xem khung giờ trống
      </button> */}
      {/* <BootstrapDialog
        maxWidth={"xl"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Khung giờ trống
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Scheduler data={data} />
          </Typography>
        </DialogContent>
      </BootstrapDialog> */}
      <Scheduler data={data} />
    </div>
  );
}

export function Orders({ data }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="check-order" onClick={handleClickOpen}>
        Thông Tin Đã Đặt
      </button>
      <BootstrapDialog
        maxWidth={"md"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Thông Tin Đã Đặt
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Order data={data} />
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export function Bills({ data }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        className="check-order"
        // style={{ width: "200px" }}
        onClick={handleClickOpen}
      >
        Thông Tin Đã Đặt
      </button>
      <BootstrapDialog
        maxWidth={"md"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Thông Tin Đã Đặt
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Invoice data={data} />
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
