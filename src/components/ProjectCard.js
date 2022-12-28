import React, { useState, useContext } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Revderer } from "../App";
import Editform from "./EditPublicProject.js";

import { Box } from "@mui/system";
import {
  Button,
  CircularProgress,
  Dialog,
  Pagination,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { aboutme } from "../Redux/Slicers/GetUserSlicer";
import { useDispatch, useSelector } from "react-redux";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { toast, ToastContainer } from "react-toastify";
import { updateProject } from "../Redux/Slicers/ProjectIpdate";

export default function ProjectCard({
  Avatars,
  email,
  projects,
  totalPage,
  pages,
  setpages,
}) {
  const { userData, data } = useSelector((state) => state.user);
  const { projectData } = useSelector((state) => state.projectUpdate);
  const [open, setOpen] = useState(false);
  const { Refreshe, setRefreshe } = useContext(Revderer);
  const [openform, setopenform] = useState(false);

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setpages(newPage - 1);
  };

  const makePublicProject = async (project) => {
    project.Avatar = Avatars;
    project.userdata = { ...data };
    setOpen(true);

    // console.log(" project id " + project._id);
    // console.log("use id" + project.userdata._id);

    const res = await fetch(
      "https://server-api-2hpl.onrender.com/user/public",
      {
        method: "POST",
        body: JSON.stringify(project),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await res.json();
    setOpen(false);
    toast.success("PROJECT PUBLISHED", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const DeleteProjectFun = async (projectObject) => {
    setOpen(true);
    dispatch(updateProject({ ...projectObject }));

    const { _id } = { ...projectObject };
    const res = await fetch(
      "https://server-api-2hpl.onrender.com/user/public/Project/delete/" + _id,
      {
        method: "delete",
        credentials: "include",
      }
    );
    const sms = await res.json();
    setOpen(false);
    toast.success(`${sms.massege}`, {
      position: toast.POSITION.TOP_CENTER,
    });
    setRefreshe(!Refreshe);
  };

  const updateProjectFun = async (projectObject) => {
    dispatch(updateProject({ ...projectObject }));
    setopenform(!openform);
  };

  return (
    <>
      <Editform openform={openform} setopenform={setopenform} />
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

      <>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "100%",
            justifyContent: "center",
          }}
        >
          {" "}
          {projects
            ? projects.map((project, inde) => {
                return (
                  <div key={inde}>
                    <Card
                      sx={{ maxWidth: 345, margin: "20px", maxHeight: 400 }}
                    >
                      <CardHeader
                        avatar={
                          !Avatars ? (
                            <Link to="/PORTFOLIO">
                              <Avatar
                                alt="Remy Sharp"
                                onClick={() =>
                                  dispatch(
                                    aboutme({
                                      project: project,
                                      allProjects: projects,
                                    })
                                  )
                                }
                                src={
                                  ` ${Avatars || project?.Avatar}`
                                    ? `${Avatars || project.Avatar}`
                                    : "/static/images/avatar/1.jpg"
                                }
                              ></Avatar>
                            </Link>
                          ) : (
                            <Avatar
                              alt="Remy Sharp"
                              onClick={() => dispatch(aboutme(project))}
                              src={
                                `${Avatars || project?.Avatar}`
                                  ? `${Avatars || project.Avatar}`
                                  : "/static/images/avatar/1.jpg"
                              }
                            ></Avatar>
                          )
                        }
                        action={
                          <IconButton aria-label="add to like">
                            <WorkspacePremiumIcon
                              className="medal"
                              fontSize="large"
                            />
                          </IconButton>
                        }
                        title={project.titel}
                        subheader={project.email}
                      />

                      <Typography>{project.Stack}</Typography>
                      <CardMedia
                        component="img"
                        height="130"
                        image={project.Photo}
                        alt="Paella dish"
                      />
                      <CardContent>
                        <Typography variant="p" color="text.secondary">
                          <Typography
                            sx={{
                              maxWidth: 340,
                              height: 90,
                              overflowY: "hidden",
                            }}
                          >
                            {project.Description}
                          </Typography>
                        </Typography>
                      </CardContent>

                      <CardActions disableSpacing>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <Tooltip title="Github Link" arrow>
                              <IconButton aria-label="github">
                                <a href={project.Github}>
                                  <GitHubIcon />
                                </a>
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Project Link" arrow>
                              <IconButton aria-label="link">
                                <a href={project.Projectlink}>
                                  <LinkIcon />
                                </a>
                              </IconButton>
                            </Tooltip>
                          </Box>

                          {/* ****************************************************************** */}

                          {project.email === data.email && !Avatars ? (
                            <Box>
                              <Tooltip title="Delete project " arrow>
                                <IconButton
                                  aria-label="github"
                                  onClick={() => DeleteProjectFun(project)}
                                >
                                  <DeleteForeverIcon color="primary" />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Edit Project" arrow>
                                <IconButton
                                  aria-label="github"
                                  onClick={() => updateProjectFun(project)}
                                >
                                  <EditIcon color="primary" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          ) : (
                            ""
                          )}

                          {/* ***************  ******************************** */}

                          {/* {console.log(project.accessibility)} */}

                          {Avatars ? (
                            <Tooltip
                              title={`${
                                project.accessibility === "PRIVET"
                                  ? "MAKE IT PUBLIC"
                                  : "MAKE IT PRIVET"
                              }`}
                              arrow
                            >
                              <Button
                                color="primary"
                                className="public"
                                onClick={() => makePublicProject(project)}
                              >
                                {project.accessibility}
                              </Button>
                            </Tooltip>
                          ) : (
                            ""
                          )}
                        </Box>
                      </CardActions>
                    </Card>
                  </div>
                );
              })
            : ""}
        </div>
      </>
      {/* {console.log(+(totalPage / 9 + 1).toFixed(0))} */}
      {!Avatars ? (
        <Pagination
          count={Math.ceil(+(totalPage / 9)).toFixed(0)}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
          color={"primary"}
        />
      ) : (
        ""
      )}
    </>
  );
}
