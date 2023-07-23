import React, { useEffect, useState } from "react";

import BusinessIcon from "@mui/icons-material/Business";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import NewJob from "../../../jobs/pages/NewJob";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { useCreator } from "../../../shared/hooks/creator-hook";
import { useForm } from "../../../shared/hooks/form-hook";
import { useJob } from "../../../shared/hooks/jobs-hook";
import CreatorForm from "./CreatorForm";
//import { useJob } from "../../../shared/hooks/jobs-hook";
//import { thaiCities } from "../../../shared/util/ThaiData";
import CreatorJobsTable from "./CreatorJobsTable";
import CreatorTabs from "./CreatorTabs";
import JobApplicantsTable from "./JobApplicantsTable";
import PurchaseCredits from "./PurchaseCredits";

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

const Creator = ({ creatorItem, user, isLoading, refetch }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(user && user?.creator === null);
  const [creatorProfileTab, setCreatorProfileTab] = useState("applicants");
  const [formState, inputHandler, setFormData] = useForm(
    {
      company: {
        value: user?.creator?.company || "",
        isValid: true,
      },
      logoUrl: {
        value: user?.creator?.logoUrl || "",
        isValid: true,
      },
      companySize: {
        value: user?.creator?.companySize || "",
        isValid: true,
      },
      headquarters: {
        value: user?.creator?.headquarters || "",
        isValid: true,
      },
      established: {
        value: user?.creator?.established || "",
        isvalid: true,
      },
      presence: {
        value: user?.creator?.presence || "",
        isValid: true,
      },
      about: {
        value: user?.creator?.about || "",
        isValid: true,
      },
      image: {
        value: user?.creator?.image || null,
        isValid: true,
      },
    },
    true
  );
  //create and delete creator account
  const { deleteCreator, updateCreator, isPostLoading, error, clearError } =
    useCreator();
  const { activateTeacherBuffet, isPostLoading: buffetIsLoading } = useJob();

  //if is new or creator property is null, render new form.
  useEffect(() => {
    if (!user?.creator?.company) {
      setFormData(
        {
          company: {
            value: user?.creator?.company || "",
            isValid: true,
          },
          logoUrl: {
            value: user?.creator?.logoUrl || "",
            isValid: true,
          },
          companySize: {
            value: user?.creator?.companySize || "",
            isValid: true,
          },
          headquarters: {
            value: user?.creator?.headquarters || "",
            isValid: true,
          },
          established: {
            value: user?.creator?.established || "",
            isvalid: true,
          },
          presence: {
            value: user?.creator?.presence || "",
            isValid: true,
          },
          about: {
            value: user?.creator?.about || "",
            isValid: true,
          },
          image: {
            value: user?.creator?.image || null,
            isValid: true,
          },
        },
        true
      );
    }
  }, [user, setFormData]);

  //PATCH remove Creator Data
  const handleCreatorDelete = (user) => {
    deleteCreator(user?._id, user?.creator);
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

  let buffetStartTime = new Date(user?.lastActiveBuffet);
  let getDifference = date.getTime() - buffetStartTime.getTime();
  let twentyFourHours = 24 * 60 * 60 * 1000;
  let getTimeLeft = Math.abs(getDifference - twentyFourHours);

  if (getTimeLeft <= 0) {
    user.lastActiveBuffet = new Date();
    buffetStartTime = new Date(user.lastActiveBuffet);
    getDifference = date.getTime() - buffetStartTime.getTime();
    getTimeLeft = twentyFourHours;
  }

  const jobApplicants = user?.jobs?.map((job) => job?.applicants);

  //components rendered from tab navigation
  const renderComponent = () => {
    switch (creatorProfileTab) {
      case "applicants":
        return (
          <>
            {jobApplicants && (
              <JobApplicantsTable
                isLoading={isLoading}
                applicants={jobApplicants}
              />
            )}
          </>
        );
      case "jobs":
        return (
          user?.jobs && (
            <CreatorJobsTable
              isLoading={isLoading}
              jobs={user?.jobs}
              refetch={refetch}
            />
          )
        );
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
        <div>
          {" "}
          <CircularProgress />
        </div>
      ) : isEditing ? (
        <CreatorForm
          handleCreatorUpdate={handleCreatorUpdate}
          formState={formState}
          inputHandler={inputHandler}
          handleEditing={handleEditing}
          handleCreatorDelete={handleCreatorDelete}
          user={user}
        />
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
                    <BusinessIcon style={{ color: "#176e7b" }} />
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle2" color="text.secondary">
                      Company Size: {user?.creator?.companySize}
                    </Typography>
                  </Grid>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Grid>
                    <LocationOnIcon style={{ color: "#176e7b" }} />
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle2" color="text.secondary">
                      Location: {user?.creator?.headquarters}
                    </Typography>
                  </Grid>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Grid>
                    <VerifiedUserIcon style={{ color: "#176e7b" }} />
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
                    sx={{ margin: "0.5rem 0 0 1.5rem", flexWrap: "wrap" }}
                    spacing={4}
                  >
                    <Paper elevation={0}>
                      <Typography variant="body1" color="text.secondary">
                        Applicants
                      </Typography>
                      <Typography variant="h4" color="text.secondary">
                        {isLoading && <CircularProgress />}
                        {!isLoading &&
                          user?.jobs &&
                          user?.jobs
                            ?.map((job, i) => job?.applicants?.length)
                            ?.reduce((acc, applicant) => (acc += applicant), 0)}
                      </Typography>
                    </Paper>
                    <Paper elevation={0}>
                      <Typography variant="body1" color="text.secondary">
                        Listings
                      </Typography>

                      <Typography variant="h4" color="text.secondary">
                        {(user.jobs?.length || 0) < 1 ? 0 : user.jobs?.length}
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

                          {!user?.buffetIsActive && (
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

                      <Modal
                        open={open}
                        onClose={modalHandler}
                        disableScrollLock={true}
                      >
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
                            disabled={user?.buffetIsActive || user?.credits < 2}
                          >
                            {user?.credits >= 2
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
