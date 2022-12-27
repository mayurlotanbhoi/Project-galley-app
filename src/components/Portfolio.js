import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import { CircularProgress, Paper, Slider } from "@mui/material";
import { Box, Stack } from "@mui/system";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";

const ProjectCard = lazy(() => import("./ProjectCard"));

const Portfolio = () => {
  const { About } = useSelector((state) => state.user);
  console.log(About);

  const projectSort = About?.allProjects.filter((pro) => {
    if (About?.project.userdata?.email === pro?.email) {
      return pro;
    }
  });

  console.log(projectSort);

  return (
    <>
      {Object.keys(About).length > 0 ? (
        <>
          <Box
            sx={{
              flexWrap: { xs: "wrap", md: "nowrap" },
              m: "50px",
              display: "flex",
              width: "100vw",
              height: "100%",
            }}
          >
            {/* //left */}
            <Stack sx={{ padding: "20px", display: "flex" }}>
              <Paper elevation={10}>
                <Card sx={{ width: 380 }}>
                  <CardMedia
                    image={
                      About?.project.userdata?.Avatar
                        ? `${About?.project.userdata.Avatar}`
                        : "https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?w=210&h=210&c=7&r=0&o=5&dpr=1.25&pid=1.7"
                    }
                    title="green iguana"
                    component="img"
                    height="200"
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {About?.project.userdata?.name.toUpperCase()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: "50px" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: "10px",
                        }}
                      >
                        <BusinessCenterIcon
                          fontSize="medium"
                          sx={{ mr: "10px" }}
                          color="primary"
                        />
                        <Typography component="span">
                          {About?.project.userdata?.feild}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: "10px",
                        }}
                      >
                        <LocalPhoneIcon
                          fontSize="medium"
                          sx={{ mr: "10px" }}
                          color="primary"
                        />
                        <Typography component="span">
                          {About?.project.userdata?.Mob}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: "5px",
                        }}
                      >
                        <EmailIcon
                          fontSize="medium"
                          sx={{ mr: "10px" }}
                          color="primary"
                        />
                        <Typography component="span">
                          {About?.project.userdata?.email}
                        </Typography>
                      </Box>
                    </Typography>

                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: "30px",
                        }}
                      >
                        <AcUnitIcon
                          fontSize="large"
                          sx={{ mr: "20px" }}
                          color="primary"
                        />
                        <Typography
                          component="span"
                          variant="h5"
                          fontFamily={"sans-serif"}
                        >
                          TECH-STACK
                        </Typography>
                      </Box>

                      <Box>
                        <Box sx={{ mb: "10px" }}>
                          <Typography variant="h6" color="text.secondary">
                            {About?.project.userdata?.Stack.toUpperCase()}
                          </Typography>
                          <Slider
                            defaultValue={70}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            size="large"
                            fontWeight={600}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Paper>
            </Stack>
            {/* //rigth satch */}
            <Stack
              sx={{
                padding: "20px",
                display: "flex",
                width: "80%",
                height: "100%",
                minWidth: "420px",
              }}
            >
              <Paper elevation={10} sx={{ padding: "20px" }}>
                {" "}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: "10px",
                    }}
                  >
                    <PersonIcon
                      fontSize="large"
                      sx={{ mr: "10px" }}
                      color="primary"
                    />
                    <Typography
                      component="span"
                      color="text.secondary"
                      fontSize={30}
                    >
                      ABOUT ME
                    </Typography>
                  </Box>
                  <Box></Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ padding: "20px" }}
                    fontSize={18}
                  >
                    {About?.project.userdata?.About}
                  </Typography>{" "}
                </Box>
                <Box sx={{ mb: "20px" }}>
                  <Typography
                    component="span"
                    color="text.secondary"
                    fontSize={20}
                    fontWeight={500}
                  >
                    YEAR OF EXPERIANCE
                  </Typography>
                  <Typography ml="20px">
                    {About?.project.userdata?.experiance} year
                  </Typography>
                </Box>
                <Box sx={{ mb: "20px" }}>
                  <Typography
                    component="span"
                    color="text.secondary"
                    fontSize={20}
                    fontWeight={500}
                  >
                    CURRENT COMPANY
                  </Typography>
                  <Typography ml="20px">
                    {About?.project.userdata?.Comp.toUpperCase()}
                  </Typography>
                </Box>
                <Box sx={{ mb: "20px" }}>
                  <Typography
                    component="span"
                    color="text.secondary"
                    fontSize={20}
                    fontWeight={500}
                  >
                    CURRENT POSITION
                  </Typography>
                  <Typography ml="20px">
                    {About?.project.userdata?.Post.toUpperCase()}
                  </Typography>
                </Box>
              </Paper>

              <Paper elevation={10} sx={{ padding: "20px", mt: "10px" }}>
                {" "}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: "10px",
                    }}
                  >
                    <BusinessCenterIcon
                      fontSize="large"
                      sx={{ mr: "10px" }}
                      color="primary"
                    />
                    <Typography
                      component="span"
                      color="text.secondary"
                      fontSize={30}
                    >
                      ABOUT THIS PROJECT
                    </Typography>
                  </Box>

                  <Box sx={{ mt: "20px" }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ padding: "20px" }}
                      fontSize={18}
                    >
                      {About?.project?.Description}
                    </Typography>{" "}
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                    <Box sx={{ mb: "20px" }}>
                      <CalendarMonthIcon
                        fontSize="medium"
                        sx={{ mr: "10px" }}
                        color="primary"
                      />
                      <Typography
                        component="span"
                        color="text.secondary"
                        fontSize={20}
                        fontWeight={500}
                      >
                        TECH-STATCK
                      </Typography>
                      <Typography ml="20px">
                        {About?.project?.Stack} year
                      </Typography>
                    </Box>

                    <Box sx={{ mb: "20px" }}>
                      <Typography
                        component="span"
                        color="text.secondary"
                        fontSize={20}
                        fontWeight={500}
                      >
                        TITEL
                      </Typography>
                      <Typography ml="20px">{About?.project?.titel}</Typography>
                    </Box>

                    <Box
                      sx={{
                        mb: "20px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        component="span"
                        color="text.secondary"
                        fontSize={20}
                        fontWeight={500}
                      >
                        GITHUB LINK
                      </Typography>
                      <a href={About?.project?.Github}>
                        <GitHubIcon />
                      </a>
                    </Box>

                    <Box
                      sx={{
                        mb: "20px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        component="span"
                        color="text.secondary"
                        fontSize={20}
                        fontWeight={500}
                      >
                        LIVE DEMO
                      </Typography>
                      <a href={About?.project?.Projectlink}>
                        <LinkIcon />
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Stack>
          </Box>

          {/* poject */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: "10px",
            }}
          >
            <AssignmentTurnedInIcon
              fontSize="large"
              sx={{ mr: "10px" }}
              color="primary"
            />
            <Typography component="span" color="text.secondary" fontSize={30}>
              MY PROJECTS...
            </Typography>
          </Box>

          <Box>
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
                projects={projectSort}
                // totalPage={total}
                // pages={pages}
                // setpages={setpages}
              />
            </Suspense>
          </Box>
        </>
      ) : (
        <CircularProgress disableShrink />
      )}
    </>
  );
};

export default Portfolio;
