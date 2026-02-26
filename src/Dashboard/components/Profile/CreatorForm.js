import React from "react";

import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import { thaiCities } from "../../../shared/util/ThaiData";

const CreatorForm = ({
  handleCreatorUpdate,
  formState,
  inputHandler,
  handleEditing,
  handleCreatorDelete,
  user,
}) => {
  return (
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

<FormControl sx={{width: "100%", margin: "0 0.5rem 0.5rem 0" }}>
          <InputLabel id="location-select">Location</InputLabel>
          <Select
          fullWidth
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
            sx={{ margin: "0 0.5rem 0 0"}}
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
        <Stack direction="row" justifyContent="flex-end" spacing={2}>

          <Button color="error"onClick={handleEditing}>Cancel</Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default CreatorForm;
