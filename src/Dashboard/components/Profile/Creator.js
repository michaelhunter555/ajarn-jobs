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
} from '@mui/material';

import NewJob from '../../../jobs/pages/NewJob';
import { AuthContext } from '../../../shared/context/auth-context';
import { useForm } from '../../../shared/hooks/form-hook';
import { thaiCities } from '../../../shared/util/ThaiData';
import CreatorTabs from './CreatorTabs';
import PurchaseCredits from './PurchaseCredits';

const date = new Date();
const today = date.toISOString().split("T")[0];

const Creator = ({ creatorItem, onUpdate, onDelete }) => {
  const auth = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(true);
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
  const { isNew = false } = creatorItem;

  useEffect(() => {
    if (!isNew) {
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
  }, [creatorItem, setFormData, isNew]);

  useEffect(() => {
    if (auth.user?.creator !== null) {
      setIsEditing(false);
    }
  }, [auth.user?.creator]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const creatorItem = {
      company: formState.inputs.company.value,
      logoUrl: formState.inputs.logoUrl.value,
      companySize: formState.inputs.companySize.value,
      headquarters: formState.inputs.headquarters.value,
      established: formState.inputs.established.value,
      presence: formState.inputs.presence.value,
      about: formState.inputs.about.value,
    };
    onUpdate(creatorItem);
    setIsEditing(false);
  };

  const handleMenuItemClick = (componentName) => {
    setCreatorProfileTab(componentName);
  };

  const renderComponent = () => {
    switch (creatorProfileTab) {
      case "applicants":
        return <>You have no applicant's yet!</>;
      case "jobs":
        return "No jobs yet!";
      case "credits":
        return <PurchaseCredits />;
      case "createJob":
        return <NewJob />;
      default:
        return "nothing here yet";
    }
  };

  return (
    <>
      {isEditing && (
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
      )}

      {!isEditing && (
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
                <Typography component="h1" variant="h5" color="text.secondary">
                  {auth.user?.creator?.company}
                </Typography>
                <Button
                  sx={{ fontSize: 10 }}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  Edit Info
                </Button>
              </Stack>

              <Grid>
                <Typography variant="subtitle2" color="text.secondary">
                  <BusinessIcon /> Company Size:{" "}
                  {auth.user?.creator?.companySize}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="subtitle2" color="text.secondary">
                  <LocationOnIcon /> Location:{" "}
                  {auth.user?.creator?.headquarters}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="subtitle2" color="text.secondary">
                  <VerifiedUserIcon /> Established:{" "}
                  {auth.user?.creator?.established}
                </Typography>
              </Grid>
              <Stack direction="row" alignItems="start" spacing={2}>
                <Grid>
                  <Typography variant="subtitle2" color="text.secondary">
                    <MonetizationOnIcon /> Credit Balance: {auth.user?.credits}
                  </Typography>
                </Grid>
                <Grid>
                  <Link component="button" variant="subtitle2">
                    add credits?
                  </Link>
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
              <Stack sx={{ margin: "0 auto" }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Your account as of {today}{" "}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={4}
                >
                  <Paper elevation={0}>
                    <Typography variant="body1" color="text.secondary">
                      Applicants
                    </Typography>
                    <Typography variant="h4" color="text.secondary">
                      {(auth.user?.jobs?.applicants?.length || 0) < 1 && 0}
                    </Typography>
                  </Paper>
                  <Paper elevation={0}>
                    <Typography variant="body1" color="text.secondary">
                      Listings
                    </Typography>
                    <Typography variant="h4" color="text.secondary">
                      {(auth.user?.jobs?.length || 0) < 1 && 0}
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
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%", marginBottom: "1rem" }} flexItem />
          <CreatorTabs onTabChange={handleMenuItemClick} />
          <Box sx={{ height: "auto" }}>{renderComponent()}</Box>
        </Card>
      )}
    </>
  );
};

export default Creator;
