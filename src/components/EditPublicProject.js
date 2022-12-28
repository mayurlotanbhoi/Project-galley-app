import React, { useState, useContext } from "react";
import {
  TextField,
  Box,
  Paper,
  Button,
  Avatar,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  TextareaAutosize,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";

// import { updateProject } from "../Redux/Slicers/ProjectIpdate";

import SendIcon from "@mui/icons-material/Send";

import { useSelector } from "react-redux";
import { Revderer } from "../App";
import { toast, ToastContainer } from "react-toastify";

const EditpublicProject = ({ openform, setopenform }) => {
  //   const [file, setFile] = useState(null);
  const [openD, setOpenD] = useState(false);
  const { data } = useSelector((state) => state.user);
  const { Refreshe, setRefreshe } = useContext(Revderer);

  const { projectData } = useSelector((state) => state.projectUpdate);

  const [email, setemail] = useState(projectData?.email);
  const [titel, settitel] = useState(projectData?.titel);
  const [Github, setGithub] = useState(projectData?.Github);
  const [Projectlink, setProjectLink] = useState(projectData?.Projectlink);
  const [Description, setDescription] = useState(projectData?.Description);
  const [TStack, setStack] = useState(projectData?.Stack);

  const handleClose = () => {
    setopenform(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    setOpenD(true);

    const formdata = new FormData();

    console.log(e.target.email.value);

    formdata.append("titel", e.target.titel.value);
    formdata.append("email", e.target.email.value);
    formdata.append("Github", e.target.Git.value);
    formdata.append("Projectlink", e.target.Plink.value);
    formdata.append("Description", e.target.discre.value);
    formdata.append("Stack", e.target.Stack.value);

    // dispatch(updateProject({ ...projectObject }));
    const { _id } = { ...projectData };

    console.log(JSON.stringify(formdata));
    const value = Object.fromEntries(formdata.entries());
    console.log(value);
    const res = await fetch(
      "https://server-api-2hpl.onrender.com/user/public/Project/update/" + _id,
      {
        method: "put",
        body: JSON.stringify(value),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    setOpenD(false);
    setOpenD(false);
    toast.success(`PROJECT updated`, {
      position: toast.POSITION.TOP_CENTER,
    });
    setRefreshe(!Refreshe);
    handleClose();
  };

  //   const DeleteProjectFun = async (projectObject) => {

  //         dispatch(updateProject({ ...projectObject }));
  //         const { _id } = { ...projectObject };
  //         const res = await fetch(
  //           "http://localhost:8000/user/public/Project/update/:id,
  //           {
  //             method: "update",
  //             credentials: "include",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );
  //         const sms = await res.json();

  //         toast.success(`${sms.massege}`, {
  //           position: toast.POSITION.TOP_CENTER,
  //         });
  //         setRefreshe(!Refreshe);
  //         // window.location.reload(true);
  //         console.log(_id);
  //       };

  return (
    <>
      <Dialog open={openform} onClose={handleClose}>
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

        <Dialog open={openD}>
          <CircularProgress disableShrink />
        </Dialog>

        {/* <DialogTitle>Add Project</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>

          <Box>
            <Paper
              elevation={10}
              sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "80vw",
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
              {Object.keys(projectData).length > 1 ? (
                <form onSubmit={submit} method="put">
                  {console.log(email)}
                  <Stack sx={{ display: "flex", flexWrap: "wrap" }} gap="20px">
                    <TextField
                      variant="outlined"
                      label="email.."
                      type="email"
                      name="email"
                      // value={email}
                      // onChange={(e) => setemail(e.target.value)}
                      defaultValue={projectData?.email}
                      autoFocus={true}
                      required
                    />
                    <TextField
                      variant="outlined"
                      label="ProjectTilet.."
                      type="text"
                      name="titel"
                      // value={titel}
                      // onChange={(e) => settitel(e.target.value)}
                      defaultValue={projectData.titel}
                      autoFocus={true}
                      required
                    />

                    {/* <TextField
                    required
                    id="outlined-required"
                    label="Start date"
                    type="text"
                    name="Sdate"
                    value={projectData.email}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="end date"
                    type="text"
                    name="Edate"
                    value={projectData.email}
                  /> */}

                    <TextField
                      variant="outlined"
                      label="Stack.."
                      type="text"
                      name="Stack"
                      // autoFocus={true}
                      required
                      // value={TStack}
                      // onChange={(e) => setStack(e.target.value)}
                      defaultValue={projectData.Stack}
                    />

                    <TextField
                      variant="outlined"
                      type="link"
                      label="Github Link.."
                      name="Git"
                      inputProps={{
                        pattern: "https://github.com/?.+",
                        title: "Include https://github.com/",
                      }}
                      required
                      value={Github}
                      onChange={(e) => setGithub(e.target.value)}
                      defaultValue={projectData.Github}
                    />
                    <TextField
                      variant="outlined"
                      type="link"
                      label="Project Link.."
                      name="Plink"
                      inputProps={{
                        pattern: "https?://.+",
                        title: "Include http://",
                      }}
                      required
                      // value={Projectlink}
                      // onChange={(e) => setProjectLink(e.target.value)}
                      defaultValue={projectData.Projectlink}
                    />
                    <TextareaAutosize
                      aria-label="sminimum height"
                      minRows={3}
                      // maxLength={120}
                      minLength={50}
                      placeholder="Project Description"
                      type="text"
                      label="Project Description.."
                      name="discre"
                      required
                      style={{ maxWidth: "450px", minWidth: "200px" }}
                      // value={Description}
                      // onChange={(e) => setDescription(e.target.value)}
                      defaultValue={projectData.Description}
                    />

                    {/* <TextField
                    variant="outlined"
                    type="file"
                    name="myfile"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  /> */}
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
                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<SendIcon />}
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              ) : (
                <Typography> "No Project information"</Typography>
              )}
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditpublicProject;
