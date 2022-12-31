import { Route, Routes } from "react-router-dom";

import "./App.css";
import React, { createContext, useEffect, useState } from "react";

import {
  NavBar,
  Home,
  Login,
  Registation,
  Myproject,
  ABoutME,
  Portfolio,
} from "./components/index";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./Redux/Slicers/GetUserSlicer";
export const Revderer = createContext();

function App() {
  const { access } = useSelector((state) => state.user);
  const dispatch = useDispatch({});

  const [Refreshe, setRefreshe] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchUser());
  }, [access]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          // ml: "150px",
          mt: "80px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Collapse in={open}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="error"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            This website deploys on a free server, might be possible to take
            some time please be a pension,
          </Alert>
        </Collapse>
      </Box>

      <Revderer.Provider
        value={{ Refreshe: Refreshe, setRefreshe: setRefreshe }}
      >
        <div className="App">
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/registation" element={<Registation />}></Route>

              <Route path="/MY-PROJECT" element={<Myproject />}></Route>
              <Route path="/PORTFOLIO" element={<Portfolio />}></Route>
              <Route path="/useprofile" element={<ABoutME />}></Route>
            </Routes>
          </div>
        </div>
      </Revderer.Provider>
    </>
  );
}

export default App;
