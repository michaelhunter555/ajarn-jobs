import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import BusinessIcon from '@mui/icons-material/Business';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';

import NewJob from '../../../jobs/pages/NewJob';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../../shared/context/auth-context';
import { useCreator } from '../../../shared/hooks/creator-hook';
import { useForm } from '../../../shared/hooks/form-hook';
import { useJob } from '../../../shared/hooks/jobs-hook';
//import { useJob } from "../../../shared/hooks/jobs-hook";
import { thaiCities } from '../../../shared/util/ThaiData';
import CreatorJobsTable from './CreatorJobsTable';
import CreatorTabs from './CreatorTabs';
import JobApplicantsTable from './JobApplicantsTable';
import PurchaseCredits from './PurchaseCredits';

const StyledModal = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 7,
  borderRadius: 7,
});

const date = new Date();
const today = date.toISOString().split("T")[0];

const Creator = ({ creatorItem, jobsCount }) => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(
    auth.user && auth.user.creator === null
  );
  const [creatorProfileTab, setCreatorProfileTab] = useState("applicants");
  const [formState, inputHandler, setFormData] = useForm(
    {
      company: {
        value: creatorItem.company || "",
        isValid: true,
      },
      logoUrl: {
        value: creatorItem.logoUrl || "",
        isValid: true,
      },
      companySize: {
        value: creatorItem.companySize || "",
        isValid: true,
      },
      headquarters: {
        value: creatorItem.headquarters || "",
        isValid: true,
      },
      established: {
        value: creatorItem.established || "",
        isvalid: true,
      },
      presence: {
        value: creatorItem.presence || "",
        isValid: true,
      },
      about: {
        value: creatorItem.about || "",
        isValid: true,
      },
      image: {
        value: creatorItem.image || null,
        isValid: true,
      },
    },
    true
  );
  //create and delete creator account
  const { deleteCreator, updateCreator, isPostLoading, error, clearError } =
    useCreator();
  const { activateTeacherBuffet, isPostLoading: buffetIsLoading } = useJob();

  const getJobs = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_JOBS}/user/${user?._id}`
      );
      const data = await response.json();
      return data.jobs;
    } catch (err) {
      console.log(
        "There was an error trying to get applicants count - Msg:" + err
      );
    }
  };

  const { data: jobs } = useQuery(["JobApplicants", user?._id], () =>
    getJobs()
  );

  //if is new or creator property is null, render new form.
  useEffect(() => {
    if (!creatorItem.company) {
      setFormData(
        {
          company: {
            value: creatorItem.company || "",
            isValid: true,
          },
          logoUrl: {
            value: creatorItem.logoUrl || "",
            isValid: true,
          },
          companySize: {
            value: creatorItem.companySize || "",
            isValid: true,
          },
          headquarters: {
            value: creatorItem.headquarters || "",
            isValid: true,
          },
          established: {
            value: creatorItem.established || "",
            isvalid: true,
          },
          presence: {
            value: creatorItem.presence || "",
            isValid: true,
          },
          about: {
            value: creatorItem.about || "",
            isValid: true,
          },
          image: {
            value: creatorItem.image || null,
            isValid: true,
          },
        },
        true
      );
    }
    console.log(creatorItem);
  }, [creatorItem, setFormData]);

  //PATCH remove Creator Data
  const handleCreatorDelete = (creatorItem) => {
    deleteCreator(user?._id, creatorItem);
  };

  //PATCH update creator information
  //data we would like to pass to our creator property
  const handleCreatorUpdate = async (event) => {
    event.preventDefault();
    //creator data fields
    const creatorItem = {
      company: formState.inputs.company.value,
      logoUrl: formState.inputs.logoUrl.value,
      companySize: formState.inputs.companySize.value,
      headquarters: formState.inputs.headquarters.value,
      established: formState.inputs.established.value,
      presence: formState.inputs.presence.value,
      about: formState.inputs.about.value,
    };
    try {
      updateCreator(user?._id, creatorItem);
    } catch (err) {
      console.log(err);
    }
    setIsEditing(false);
  };

  //Component tabs navigation for creator profile
  const handleMenuItemClick = (componentName) => {
    setCreatorProfileTab(componentName);
  };

  const handleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const activateTeacherBuffetHandler = () => {
    if (user?.buffetIsActive === false) {
      activateTeacherBuffet(user?._id);
    }
    setOpen(false);
  };

  const modalHandler = () => {
    setOpen((prev) => !prev);
  };

  
  const buffetStartTime = new Date(auth.user?.lastActiveBuffet);
  const getDifference = date.getTime() - buffetStartTime.getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  const getTimeLeft = Math.abs(getDifference - twentyFourHours);

  //components rendered from tab navigation
  const renderComponent = () => {
    switch (creatorProfileTab) {
      case "applicants":
        return <JobApplicantsTable />;
      case "jobs":
        return <CreatorJobsTable />;
      case "credits":
        return <PurchaseCredits />;
      case "createJob":
        return (
          <>
            <NewJob />
          </>
        );
      default:
        return "nothing here yet";
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {/*isLoading checks if user.creator is not null and renders form depending on this. */}
      {isPostLoading ? (
        <div> loading...</div>
      ) : isEditing ? (
        <Card sx={{ padding: "1rem 1rem" }}>
          <form onSubmit={handleCreatorUpdate}>
            <TextField
              sx={{ margin: "0 0 0.5rem 0" }}
              fullWidth
              name="company"
              label="Company Name"
              defaultValue={formState.inputs.company.value}
              onChange={(event) =>
                inputHandler(
                  "company",
                  event.target.value,
                  event.target.value !== ""
                )
              }
            />
            <Grid
              container
              alignItems="center"
              direction="row"
              sx={{ margin: "0 0 0.5rem 0" }}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="logoUrl"
                  label="Company Logo"
                  defaultValue={formState.inputs.logoUrl.value}
                  onChange={(event) =>
                    inputHandler(
                      "logoUrl",
                      event.target.value,
                      event.target.value !== ""
                    )
                  }
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  name="companySize"
                  id="companySize"
                  label="Company Size"
                  defaultValue={formState.inputs.companySize.value}
                  onChange={(event) =>
                    inputHandler(
                      "companySize",
                      event.target.value,
                      event.target.value !== ""
                    )
                  }
                />
              </Grid>
            </Grid>
            <FormControl sx={{ width: 200, margin: "0 0.5rem 0.5rem 0" }}>
              <InputLabel id="location-select">Location</InputLabel>
              <Select
                labelId="headquarters"
                id="headquarters"
                defaultValue={formState.inputs.headquarters.value}
                label="headquarters"
                onChange={(event) =>
                  inputHandler(
                    "headquarters",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              >
                {thaiCities.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              sx={{ margin: "0 0.5rem 0 0" }}
              name="established"
              helperText="year of launch (i.e. 2004)"
              label="established"
              defaultValue={formState.inputs.established.value}
              onChange={(event) =>
                inputHandler(
                  "established",
                  event.target.value,
                  event.target.value !== ""
                )
              }
            />
            <TextField
              name="presence"
              label="Presence"
              helperText="separate each location by comma"
              defaultValue={formState.inputs.presence.value}
              onChange={(event) =>
                inputHandler(
                  "presence",
                  event.target.value,
                  event.target.value !== ""
                )
              }
            />
            <Grid item xs={12} sx={{ margin: "0 0 0.5rem 0" }}>
              <TextField
                multiline
                rows={4}
                fullWidth
                name="about"
                label={`About`}
                defaultValue={formState.inputs.about.value}
                onChange={(event) =>
                  inputHandler(
                    "about",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              />
            </Grid>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit">
                Save
              </Button>
              <Button onClick={handleEditing}>Cancel</Button>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Button
                  onClick={() => handleCreatorDelete(user?.creator)}
                  variant="outlined"
                  color="warning"
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </form>
        </Card>
      ) : (
        !isEditing &&
        user?.creator && (
          <Card>
            <Grid container direction="row" justifyContent="flex-start">
              <Grid
                item
                xs={12}
                sm={6}
                md={5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                  alignItems: "start",
                  justifyContent: "flext-start",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Typography
                    component="h1"
                    variant="h5"
                    color="text.secondary"
                  >
                    {user?.creator?.company}
                  </Typography>
                  <Button sx={{ fontSize: 10 }} onClick={handleEditing}>
                    Edit Info
                  </Button>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid>
                    <BusinessIcon color="inherit" />
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle2" color="text.secondary">
                      Company Size: {user?.creator?.companySize}
                    </Typography>
                  </Grid>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Grid>
                    <LocationOnIcon color="info" />
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle2" color="text.secondary">
                      Location: {user?.creator?.headquarters}
                    </Typography>
                  </Grid>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Grid>
                    <VerifiedUserIcon color="info" />
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle2" color="text.secondary">
                      Established: {user?.creator?.established}
                    </Typography>
                  </Grid>
                </Stack>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={7}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                }}
              >
                <Divider orientation="vertical" flexItem />
                <Stack>
                  <Typography variant="subtitle2" color="text.secondary">
                    Your account as of {today}{" "}
                  </Typography>

                  <Stack
                    direction="row"
                    sx={{ margin: "0.5rem 0 0 1.5rem" }}
                    spacing={4}
                  >
                    <Paper elevation={0}>
                      <Typography variant="body1" color="text.secondary">
                        Applicants
                      </Typography>
                      <Typography variant="h4" color="text.secondary">
                        {jobs?.reduce(
                          (acc, job) => acc + job?.applicants.length,
                          0
                        )}
                      </Typography>
                    </Paper>
                    <Paper elevation={0}>
                      <Typography variant="body1" color="text.secondary">
                        Listings
                      </Typography>

                      <Typography variant="h4" color="text.secondary">
                        {(auth.user.jobs?.length || 0) < 1
                          ? 0
                          : auth.user.jobs?.length}
                      </Typography>
                    </Paper>
                    <Paper elevation={0}>
                      {buffetIsLoading && (
                        <>
                          <CircularProgress />
                        </>
                      )}
                      {!buffetIsLoading && (
                        <>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ padding: 0, margin: 0 }}
                          >
                            Teacher Buffet
                          </Typography>
                          {/* <Alert
                            sx={{
                              marginTop: 1,
                              paddingTop: 0,
                              paddingBottom: 0,
                              padding: "0 0.5rem",
                              borderRadius: 18,
                            }}
                            severity={
                              user?.buffetIsActive ? "success" : "warning"
                            }
                            icon={false}
                          >
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              sx={{ margin: 0, padding: 0 }}
                            >
                              {user?.buffetIsActive
                                ? `Active - ${(
                                    getTimeLeft /
                                    (60 * 60 * 1000)
                                  ).toFixed(0)} hours left.`
                                : "Inactive"}
                            </Typography>
                          </Alert> */}

                          {!auth.user?.buffetIsActive && (
                            <Button
                              sx={{ fontSize: 9 }}
                              startIcon={<ElectricBoltIcon />}
                              color="success"
                              variant="outlined"
                              onClick={modalHandler}
                            >
                              24hr Buffet!
                            </Button>
                          )}
                          <Alert
                            sx={{
                              marginTop: 1,
                              paddingTop: 0,
                              paddingBottom: 0,
                              padding: "0 0.5rem",
                              borderRadius: 18,
                              justifyContent: "center",
                            }}
                            severity={
                              user?.buffetIsActive ? "success" : "warning"
                            }
                            icon={false}
                          >
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                              sx={{ margin: 0, padding: 0 }}
                            >
                              {user?.buffetIsActive
                                ? `Active - ${(
                                    getTimeLeft /
                                    (60 * 60 * 1000)
                                  ).toFixed(0)} hours left.`
                                : "Not Active"}
                            </Typography>
                          </Alert>
                        </>
                      )}

                      <Modal open={open} onClose={modalHandler}>
                        <StyledModal>
                          <Typography variant="h5" color="text.primary">
                            Confirm Buffet Activation
                          </Typography>
                          <Typography
                            variant="subttitle2"
                            color="text.secondary"
                          >
                            You are about activate a teacher buffet for 2
                            credits for 24 hours. Please confirm.
                          </Typography>
                          <Button
                            sx={{ margin: "2rem auto" }}
                            variant="contained"
                            onClick={activateTeacherBuffetHandler}
                            disabled={
                              auth.user?.buffetIsActive ||
                              auth.user?.credits < 2
                            }
                          >
                            {auth.user?.credits >= 2
                              ? "Begin Buffet"
                              : "Not enough credits"}
                          </Button>
                        </StyledModal>
                      </Modal>
                    </Paper>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="end"
                    spacing={1}
                    sx={{ marginTop: "2rem" }}
                  >
                    <Grid>
                      <MonetizationOnIcon color="success" fontSize="small" />
                    </Grid>
                    <Grid>
                      <Typography variant="subtitle2" color="text.secondary">
                        Credits:
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography variant="h5" color="text.secondary">
                        {user?.credits}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Link
                        onClick={() => handleMenuItemClick("credits")}
                        component="button"
                        variant="subtitle2"
                      >
                        add credits?
                      </Link>
                    </Grid>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Divider sx={{ width: "100%", marginBottom: "1rem" }} flexItem />
            {/* set tab to get credits */}
            <CreatorTabs
              addCredits={creatorProfileTab}
              onTabChange={handleMenuItemClick}
            />
            <Box sx={{ height: "auto" }}>{renderComponent()}</Box>
          </Card>
        )
      )}
    </>
  );
};

export default Creator;
