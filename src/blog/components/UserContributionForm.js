import React, { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Paper,
  TextField,
} from "@mui/material";

import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useUser } from "../../shared/hooks/user-hook";

const UserContributionForm = () => {
  const auth = useContext(AuthContext);
  const [toggleForm, setToggleForm] = useState(false);
  const { incomeDirectoryPost, isPostLoading, error, clearError } = useUser();
  const [formState, inputHandler, setFormData] = useForm(
    {
      jobTitle: {
        value: "",
        isValid: false,
      },
      monthlySalary: {
        value: "",
        isValid: false,
      },
      educationLevel: {
        value: "",
        isValid: false,
      },
      lifestyle: {
        value: "",
        isValid: false,
      },
      monthlySavings: {
        value: "",
        isValid: false,
      },
      perfectNumber: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    if (formState.isValid) {
      setFormData(
        {
          jobTitle: {
            value: formState.inputs.jobTitle.value,
            isValid: true,
          },
          monthlySalary: {
            value: formState.inputs.monthlySalary.value,
            isValid: true,
          },
          educationLevel: {
            value: formState.inputs.educationLevel.value,
            isValid: true,
          },
          lifestyle: {
            value: formState.inputs.lifestyle.value,
            isValid: true,
          },
          monthlySavings: {
            value: formState.inputs.monthlySavings.value,
            isValid: true,
          },
          perfectNumber: {
            value: formState.inputs.perfectNumber.value,
            isValid: true,
          },
        },
        true
      );
    }
  }, [setFormData, formState]);

  const submitIncomeDirectoryInfoHandler = async (event) => {
    event.preventDefault();

    const incomeDirectoryInputs = {
      ...auth.user,
      jobTitle: formState.inputs.jobTitle.value,
      monthlySalary: formState.inputs.monthlySalary.value,
      educationLevel: formState.inputs.educationLevel.value,
      lifestyle: formState.inputs.lifestyle.value,
      monthlySavings: formState.inputs.monthlySavings.value,
      perfectNumber: formState.inputs.perfectNumber.value,
    };

    console.log(incomeDirectoryInputs);
    //props.onSubmitContribution(incomeDirectory)

    try {
      incomeDirectoryPost(auth.user?._id, incomeDirectoryInputs);
    } catch (err) {
      console.log(err);
    }
    setToggleForm(false);
  };

  const toggleFormHandler = () => {
    setToggleForm((prev) => !prev);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        color={toggleForm ? "error" : "info"}
        sx={{ marginBottom: 2 }}
        onClick={toggleFormHandler}
        disabled={!auth.isLoggedIn || !!auth.user.incomeDirectory}
      >
        {!toggleForm && auth.isLoggedIn
          ? "Make Contribution"
          : auth.isLoggedIn
          ? "Cancel"
          : ""}
        {!auth.isLoggedIn && "Sign-up / Login"}
      </Button>
      {isPostLoading && <CircularProgress />}
      {toggleForm && !isPostLoading && (
        <Paper elevation={0} sx={{ borderRadius: 7, padding: 3 }}>
          <form onSubmit={submitIncomeDirectoryInfoHandler}>
            <FormControl fullWidth>
              <FormLabel>What is your current job title?</FormLabel>
              <TextField
                fullWidth
                id="jobTitle"
                type="text"
                helperText="enter current job title"
                value={formState.inputs.jobTitle.value}
                onChange={(event) =>
                  inputHandler(
                    "jobTitle",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>
                What are your current monthly earnings (in THB)?
              </FormLabel>
              <TextField
                fullWidth
                id="monthlySalary"
                type="text"
                helperText="How much are you taking home per month?"
                value={formState.inputs.monthlySalary.value}
                onChange={(event) =>
                  inputHandler(
                    "monthlySalary",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>
                How much can save per month (with minimum effort)?
              </FormLabel>
              <TextField
                fullWidth
                id="monthlySavings"
                type="text"
                helperText="How much can you save per month?"
                value={formState.inputs.monthlySavings.value}
                onChange={(event) =>
                  inputHandler(
                    "monthlySavings",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel>
                Do you mind sharing your highest education level?
              </FormLabel>
              <TextField
                fullWidth
                id="educationLevel"
                type="text"
                helperText="highest degree Achieved"
                value={formState.inputs.educationLevel.value}
                onChange={(event) =>
                  inputHandler(
                    "educationLevel",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>
                What's the minimum salary you would advise others to aim for in
                your current location?
              </FormLabel>
              <TextField
                fullWidth
                id="perfectNumber"
                type="text"
                helperText="What's the salary you would advise others to aim for"
                value={formState.inputs.perfectNumber.value}
                onChange={(event) =>
                  inputHandler(
                    "perfectNumber",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>
                How would you describe your lifestyle on your current salary?
              </FormLabel>
              <TextField
                fullWidth
                multiline
                id="lifestyle"
                type="text"
                rows={3}
                helperText="Comfortable, or could be better, or just fine, etc."
                value={formState.inputs.lifestyle.value}
                onChange={(event) =>
                  inputHandler(
                    "lifestyle",
                    event.target.value,
                    event.target.value !== ""
                  )
                }
              />
            </FormControl>
            <Button
              variant="contained"
              disabled={!formState.isValid}
              type="submit"
            >
              Submit Info
            </Button>
          </form>
        </Paper>
      )}
    </Box>
  );
};

export default UserContributionForm;
