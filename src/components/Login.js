import {
  TextField,
  Box,
  Stack,
  Paper,
  Button,
  Typography,
  IconButton,
  Dialog,
  CircularProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";
import { display } from "@mui/system";

const Login = () => {
  const navigation = useNavigate();
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertData, serAlertData] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();

    setOpen(true);
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    fetch("https://server-api-2hpl.onrender.com/user/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          setError(true);
          // return response.json();
          // return;
        }
        return response.json();
      })
      .then((data) => {
        // window.alert(data.massege);

        if (data.massege === "Login SuccesFull") {
          toast.success(`${data.massege} !`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setOpen(false);
          setTimeout(() => {
            navigation("/");
            window.location.reload(false);
          }, 5000);
          setOpen(false);
        } else {
          toast.error(`${data.massege} !`, {
            position: toast.POSITION.TOP_CENTER,
          });
          setOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      <Dialog open={open}>
        <CircularProgress disableShrink />
      </Dialog>

      <Box
        sx={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LockOpenIcon
            sx={{ width: "100px", height: "100px", marginBottom: "20px" }}
          />
          {error ? (
            <Typography component={"span"} sx={{ color: "red" }}>
              Invalid Email or Password
            </Typography>
          ) : (
            ""
          )}
          <form onSubmit={(e) => loginHandler(e)}>
            <Stack gap="20px" height="120%">
              <TextField
                variant="outlined"
                label="Email.."
                type="email"
                name="email"
                autoFocus={true}
                onChange={(e) => setError(false)}
                error={error}
                sx={{ mb: "15px" }}
              />
              <TextField
                variant="outlined"
                label="Password.."
                name="password"
                type="password"
                error={error}
                onChange={(e) => setError(false)}
                sx={{ mb: "15px" }}
              />
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                {" "}
                Submit
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
