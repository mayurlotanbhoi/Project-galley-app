import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
// import ProjectCard from "./ProjectCard";
import { Revderer } from "../App";
import CircularProgress from "@mui/material/CircularProgress";
import FetchData from "./FetchFunction";
import { Dialog, Divider, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { Box } from "@mui/system";
import loader from "./loader.gif";

const ProjectCard = lazy(() => import("./ProjectCard"));

const HomePage = () => {
  const [fetchedData, setFetchedData] = useState({});
  const { Refreshe, setRefreshe } = useContext(Revderer);
  const [filtered, setfiltered] = useState({});
  const [total, settotal] = useState(1);
  const [openD, setOpenD] = useState(false);
  const [pages, setpages] = useState(0);

  const [refTotal, setRefTotal] = useState(0);

  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setOpenD(true);
      const project = await FetchData(
        "https://server-api-2hpl.onrender.com/user/allProject/" + pages
      );
      setFetchedData(project.allProject);
      setfiltered(project.allProject);
      settotal(project.total);
      setRefTotal(project.total);
      setOpenD(false);
    };

    fetch();
  }, [Refreshe, pages]);

  const ProjectSort = async () => {
    console.log(email);

    if (email) {
      const project = await FetchData(
        "https://server-api-2hpl.onrender.com/user/serchProject/" + email
      );
      setFetchedData(project.allProject);
      settotal(project.total);

      console.log(project);
    } else {
      setFetchedData(filtered);
      settotal(refTotal);
    }
  };

  return (
    // .hasOwnProperty("Avatar")
    <>
      <Dialog open={openD}>
        <img
          src={loader}
          backgroundColor="transparent"
          width="80px"
          height="80px"
        />
      </Dialog>

      <div style={{ marginTop: "-50px" }}>
        <div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Project By Email"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IconButton
              type="button"
              sx={{ p: "10px", position: "sticky" }}
              aria-label="search"

              // onClick={(e) => ProjectSort(e)}
              // mongodb+srv://mayur:<password>@cluster0.hojr3ql.mongodb.net/?retryWrites=true&w=majority
            >
              <SearchIcon onClick={() => ProjectSort()} />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
        </div>

        {fetchedData.length > 0 ? (
          <Suspense
            fallback={
              <Box
                sx={{
                  width: "100vw",
                  height: "80vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress disableShrink />
              </Box>
            }
          >
            <ProjectCard
              projects={fetchedData}
              totalPage={total}
              pages={pages}
              setpages={setpages}
            />
          </Suspense>
        ) : (
          <Box
            sx={{
              width: "100vw",
              height: "80vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress disableShrink />
          </Box>
        )}
      </div>
    </>
  );
};

export default React.memo(HomePage);
