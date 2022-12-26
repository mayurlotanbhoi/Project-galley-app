import React, { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Button,
  Menu,
  Stack,
  Box,
  MenuItem,
  IconButton,
  Dialog,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddProject from "./AddProject";
import { logout, removedata } from "../Redux/Slicers/GetUserSlicer";
import { useSelector, useDispatch } from "react-redux";
import FetchData from "./FetchFunction";
import { toast, ToastContainer } from "react-toastify";

const NavBar = () => {
  const [menu, setmenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);

  const { data } = useSelector((state) => state.user);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    // fetch("http://localhost:8000/user/logout", {
    //   method: "get",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       navigation("/login");
    //       dispatch(logout());
    //       dispatch(removedata());
    //     }
    //   })
    //   .catch((error) => console.log(error));
    const fetch = async () => {
      setOpenD(true);
      const res = await FetchData("https://server-api-2hpl.onrender.com/user/logout");

      if (res.massege === "logout") {
        navigation("/login");
        dispatch(logout());
        dispatch(removedata());

        toast.success("LogOut SuccesFull !", {
          position: toast.POSITION.TOP_CENTER,
        });
        setOpenD(false);
      }

      // setFetchedData(project.allProject);
    };
    fetch();
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

      <Dialog open={openD}>
        <CircularProgress disableShrink />
      </Dialog>

      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ dispaly: "flex", justifyContent: "space-between" }}>
          <Stack>
            <Link to="/">
              {" "}
              <Typography id="myproject" variant="h6">
                MY PROJECT
              </Typography>
            </Link>
          </Stack>
          <Stack
            sx={{
              dispaly: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Box>
              <IconButton onClick={() => setOpen(!open)}>
                {" "}
                <Typography id="myproject">ADD PROJECT</Typography>
              </IconButton>
              <AddProject open={open} setOpen={setOpen} />
              <Button onClick={() => setmenu(!menu)}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    data?.Avatar ? data.Avatar : "/static/images/avatar/1.jpg"
                  }
                ></Avatar>
                {/* {console.log(data.Avatar)} */}
              </Button>
              <Menu
                open={menu}
                //       onClick={() => setmenu(!menu)}
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                onClose={() => setmenu(!menu)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {Object.keys(data).length > 0 ? (
                  <MenuItem onClick={() => logOut()}>
                    <Link>
                      <Typography>LOGOUT</Typography>
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Link to="/login">
                      <Typography>LOGIN</Typography>
                    </Link>
                  </MenuItem>
                )}

                <MenuItem>
                  <Link to="/registation">
                    <Typography>REGISTATION</Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/">HOME</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/ABOUT">ABOUT</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/MY-PROJECT">MY-PROJECT</Link>
                </MenuItem>
              </Menu>
            </Box>
            <Typography variant="h6">{data?.name?.split(" ")[0]}</Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
