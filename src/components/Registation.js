import {
  TextField,
  Box,
  Stack,
  Paper,
  Button,
  Avatar,
  Dialog,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import loader from "./loader.gif";

const Registation = () => {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  // const [Statuse, setStatuse] = useState(null);
  const { data } = useSelector((state) => state.user);

  const navigation = useNavigate();

  let userdata = { ...data };

  const submit = async (e) => {
    e.preventDefault();
    setOpen(true);
    const formdata = new FormData();

    formdata.append("myfile", file);
    formdata.append("name", e.target.name.value);
    formdata.append("email", e.target.email.value);
    formdata.append("password", e.target.password.value);
    formdata.append("experiance", e.target.Expriance.value);
    formdata.append("feild", e.target.Field.value);
    formdata.append("education", e.target.Education.value);

    formdata.append("Stack", e.target.Tech.value);
    formdata.append("Comp", e.target.Comp.value);
    formdata.append("Post", e.target.Post.value);
    formdata.append("About", e.target.About.value);
    formdata.append("Mob", e.target.Mob.value);

    let api = "";
    if (Object.keys(userdata).length < 2) {
      api = "https://server-api-2hpl.onrender.com/user/register";
    } else {
      api = "https://server-api-2hpl.onrender.com/user/updateProfile";
    }

    // const res = await fetch(
    //   "https://server-api-2hpl.onrender.com/user/register",
    //   {
    //     method: "POST",
    //     body: formdata,
    //   }
    // );

    const res = await fetch(api, {
      method: Object.keys(userdata).length > 2 ? "put" : "post",
      body: formdata,
    });

    const data = await res.json();

    if (res.status === 201) {
      toast.success("Registation SuccesFull!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (res.status === 202) {
      toast.success("UpDate SuccesFull!", {
        position: toast.POSITION.TOP_CENTER,
      });

      setOpen(false);
      navigation("/login");
    } else {
      toast.error(`${data.massege} !`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setOpen(false);
    }

    // console.log(data);
    // window.alert(data.massege);
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
        <img
          src={loader}
          backgroundColor="transparent"
          width="80px"
          height="80px"
        />
      </Dialog>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "120%",
          mt: "50px",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "90vw",
          }}
        >
          <Avatar
            alt="Memy Sharp"
            sx={{
              width: { sm: "10vw", xs: 100 },
              height: { sm: "20vh", xs: 100 },
              mb: "50px",
            }}
            src={
              data?.Avatar
                ? data.Avatar
                : "https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?w=210&h=210&c=7&r=0&o=5&dpr=1.25&pid=1.7"
            }
          ></Avatar>
          <form onSubmit={submit} enctype="mulTipart/form-data">
            <Stack direction="row" flexWrap="wrap" gap="20px" height="120%">
              <TextField
                variant="outlined"
                label="Name.."
                type="text"
                name="name"
                autoFocus={true}
                required
                sx={{ mb: "15px" }}
                defaultValue={data?.name ? data?.name : ""}
              />

              <TextField
                variant="outlined"
                label="Email.."
                type="email"
                name="email"
                required
                sx={{ mb: "15px" }}
                defaultValue={data?.email ? data?.email : ""}
              />
              <TextField
                variant="outlined"
                label="Mob.."
                type="number"
                name="Mob"
                // autoFocus={true}
                maxLength={10}
                minLength={10}
                required
                sx={{ mb: "15px" }}
                defaultValue={data?.Mob ? data?.Mob : ""}
              />
              <TextField
                variant="outlined"
                label="Expriance-year.."
                type="number"
                name="Expriance"
                // autoFocus={true}
                required
                sx={{ mb: "15px" }}
                defaultValue={data?.experiance ? data?.experiance : ""}
              />
              <TextField
                variant="outlined"
                label="Field.."
                type="text"
                name="Field"
                // autoFocus={true}
                required
                sx={{ mb: "15px" }}
                defaultValue={data?.feild ? data?.feild : ""}
              />

              <TextField
                variant="outlined"
                label="Education.."
                type="text"
                name="Education"
                // autoFocus={true}
                required
                sx={{ mb: "15px" }}
                defaultValue={data?.education ? data?.education : ""}
              />

              <TextField
                variant="outlined"
                type="password"
                label="password.."
                name="password"
                required
                sx={{ mb: "15px" }}
                defaultValue={data?.password ? data?.password : ""}
              />

              <TextField
                variant="outlined"
                type="text"
                label="About-Me.."
                name="About"
                required
                sx={{ mb: "15px" }}
                inputProps={{ minLength: 60 }}
                defaultValue={data?.About ? data?.About : ""}
              />

              <TextField
                variant="outlined"
                type="text"
                label="Tech-Stack.."
                name="Tech"
                required
                sx={{ mb: "15px" }}
                defaultValue={data?.Stack ? data?.Stack : ""}
              />

              <TextField
                variant="outlined"
                type="text"
                label="Current-Comp.."
                name="Comp"
                required
                sx={{ mb: "15px" }}
                defaultValue={data?.Comp ? data?.Comp : ""}
              />
              <TextField
                variant="outlined"
                type="text"
                label="Current-Post.."
                name="Post"
                required
                sx={{ mb: "15px" }}
                defaultValue={data?.Post ? data?.Post : ""}
              />

              <TextField
                variant="outlined"
                type="file"
                name="myfile"
                onChange={(e) => setFile(e.target.files[0])}
                required
                sx={{ mb: "15px" }}
              />
            </Stack>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "inhiret",
                margin: "20px",
              }}
            >
              {Object.keys(data).length < 2 ? (
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Upadate
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Registation;
