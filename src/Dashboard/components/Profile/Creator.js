import React, { useContext, useEffect, useState } from "react";

import BusinessIcon from "@mui/icons-material/Business";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import NewJob from "../../../jobs/pages/NewJob";
import { AuthContext } from "../../../shared/context/auth-context";
import { useForm } from "../../../shared/hooks/form-hook";
import { thaiCities } from "../../../shared/util/ThaiData";
import CreatorJobsTable from "./CreatorJobsTable";
import CreatorTabs from "./CreatorTabs";
import JobApplicantsTable from "./JobApplicantsTable";
import PurchaseCredits from "./PurchaseCredits";

const date = new Date();
const today = date.toISOString().split("T")[0];

const Creator = ({ creatorItem, onUpdate, onDelete }) => {
  const auth = useContext(AuthContext);
  //editing toggle for creator info
  const [isEditing, setIsEditing] = useState(true);
  //loading state - checks if user has creator profile already or not.
  const [isLoading, setIsLoading] = useState(auth.user?.creator !== null);
  //dynamic creator profile for rendering components based on click, set to 'applicants'
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
    },
    true
  );

  //destructured boolean value to check if a form is new or not
  const { isNew = false } = creatorItem;
  //on load, check if user has a creator profile
  //simple check is to see if the company name exists already or not
  // if it does, no need to show form
  useEffect(() => {
    if (auth.user?.creator?.company) {
      setIsEditing(false);
      setIsLoading(false);
    } else {
      setIsEditing(true);
      setIsLoading(false);
    }
  }, [auth.user?.creator]);
  //if is new or creator property is null, render new form.
  useEffect(() => {
    if (!isNew || auth.user?.creator === null) {
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
        },
        true
      );
    }
  }, [creatorItem, setFormData, isNew, auth.user?.creator]);

  //data we would like to pass to our creator property
  const handleSubmit = (event) => {
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
    //props function for handling creator update
    onUpdate(creatorItem);
    setIsEditing(false);
  };

  //Component tabs navigation for creator profile
  const handleMenuItemClick = (componentName) => {
    setCreatorProfileTab(componentName);
  };

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
      {/*isLoading checks if user.creator is not null and renders form depending on this. */}
      {isLoading ? (
        <div> loading...</div>
      ) : isEditing ? (
        <Card sx={{ padding: "1rem 1rem" }}>
          <form onSubmit={handleSubmit}>
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
                label={`About ${auth.user?.creator?.company}`}
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
              <Button onClick={() => setIsEditing(!isEditing)}>Cancel</Button>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Button onClick={onDelete} variant="outlined" color="warning">
                  Delete
                </Button>
              </Stack>
            </Stack>
          </form>
        </Card>
      ) : (
        !isEditing && (
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
                    {auth.user?.creator?.company}
                  </Typography>
                  <Button
                    sx={{ fontSize: 10 }}
                    onClick={() => setIsEditing(!isEditing)}
                  >
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
                      Company Size: {auth.user?.creator?.companySize}
                    </Typography>
                  </Grid>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Grid>
                    <LocationOnIcon color="info" />
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle2" color="text.secondary">
                      Location: {auth.user?.creator?.headquarters}
                    </Typography>
                  </Grid>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Grid>
                    <VerifiedUserIcon color="info" />
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle2" color="text.secondary">
                      Established: {auth.user?.creator?.established}
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
                        {(auth.user?.jobs?.applicants?.length || 0) < 1
                          ? 0
                          : auth.user?.jobs?.applicants?.length}
                      </Typography>
                    </Paper>
                    <Paper elevation={0}>
                      <Typography variant="body1" color="text.secondary">
                        Listings
                      </Typography>
                      <Typography variant="h4" color="text.secondary">
                        {(auth.user?.jobs?.length || 0) < 1
                          ? 0
                          : auth.user?.jobs?.length}
                      </Typography>
                    </Paper>
                    <Paper elevation={0}>
                      <Typography variant="body1" color="text.secondary">
                        Find Teachers
                      </Typography>

                      <Button
                        sx={{ fontSize: 9 }}
                        startIcon={<ElectricBoltIcon />}
                        color="success"
                        variant="outlined"
                      >
                        24hr Buffet!
                      </Button>
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
                        {auth.user?.credits}
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
