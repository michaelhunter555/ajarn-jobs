import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Footer from "../../shared/components/UIElements/Footer";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

const PageContainer = styled("div")({
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
});

const Content = styled("div")({
  flex: 1,
});

const StyledFormCard = styled(Card)({
  listStyle: "none",
  margin: "6rem auto",
  padding: "1rem",
  width: "90%",
  maxWidth: "40rem",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
  borderRadius: "6px",
  background: "white",
});

const StyledBoxForButtons = styled(Box)({
  display: "flex",
  flexDirection: "column",
  margin: "1rem auto",
  justifyContent: "center",
  alignItems: "center",
});

const Auth = () => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isPostLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const userId = user?._id;
  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate(`/users/${userId}`);
    }
  }, [auth.isLoggedIn, userId, navigate]);

  //switch from login to sign-up
  const signUpOrLoginHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined, image: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
          userType: { value: "teacher", isValid: true },
        },
        {
          image: { value: null, isValid: false },
        },
        false
      );
    }
    setIsLoginMode((prev) => !prev);
  };

  //submit login || signup
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    //api call
    if (isLoginMode) {
      try {
        //custom http hook accepts 4 arguments (see http-hook.js)
        //for login, we expect an email and password according to user as sign-up
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-type": "application/json" }
        );
        const {
          userId,
          token,
          image,
          buffetIsActive,
          blogPosts,
          resume,
          coverLetter,
          incomeDirectory,
          applications,
          jobs,
        } = response;

        auth.login(
          {
            _id: userId,
            image: image,
            buffetIsActive: buffetIsActive,
            blogPosts: blogPosts,
            resume: resume,
            coverLetter: coverLetter,
            incomeDirectory: incomeDirectory,
            applications: applications,
            jobs: jobs,
          },
          token
        );
      } catch (err) {
        //error handling done in custom hook
      }
    } else {
      try {
        //POST - sign up expects a name, email, userType, image and password
        const formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("userType", formState.inputs.userType.value);
        formData.append("image", formState.inputs.image.value);
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/sign-up`,
          "POST",
          formData
        );

        const {
          userId,
          token,
          image,
          buffetIsActive,
          blogPosts,
          resume,
          coverLetter,
          incomeDirectory,
        } = response;

        auth.login(
          {
            _id: userId,
            image: image,
            buffetIsActive: buffetIsActive,
            blogPosts: blogPosts,
            resume: resume,
            coverLetter: coverLetter,
            incomeDirectory: incomeDirectory,
          },
          token
        );
      } catch (err) {
        //error handling done in custom hook
      }
    }
  };

  const userTypeHandler = (event) => {
    inputHandler("userType", event.target.value, true);
  };

  //UNCOMMENT FOR LOGGING FORM INPUTS
  // useEffect(() => {
  //   console.log("Auth is set:", auth.user);
  //   console.log("Form State:", formState);
  // }, [auth.user, formState]);

  return (
    <PageContainer>
      <Content>
        <ErrorModal onClear={clearError} error={error} />
        <StyledFormCard>
          {isPostLoading && <CircularProgress />}
          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && <ImageUpload id="image" onInput={inputHandler} />}
            {!isLoginMode && (
              <FormControl component="fieldset">
                <FormLabel component="legend">User Type</FormLabel>
                <RadioGroup
                  row
                  value={formState.inputs.userType.value}
                  onChange={userTypeHandler}
                >
                  <FormControlLabel
                    id="teacher"
                    value="teacher"
                    control={<Radio />}
                    label="teacher"
                  />
                  <FormControlLabel
                    id="employer"
                    value="employer"
                    control={<Radio />}
                    label="employer"
                  />
                </RadioGroup>
              </FormControl>
            )}

            {!isLoginMode && (
              <Input
                element="input"
                type="text"
                id="name"
                label="Your name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a name"
                onInput={inputHandler}
              />
            )}

            <Input
              element="input"
              type="email"
              id="email"
              helperText="Your email address"
              fieldLabel="e-mail"
              label="Your e-mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="please enter a name"
              onInput={inputHandler}
            />

            <Input
              element="input"
              type="password"
              id="password"
              helperText="Enter Password"
              fieldLabel="Password"
              label="Password"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="please enter your password"
              onInput={inputHandler}
            />
            <StyledBoxForButtons>
              <Button type="submit" disabled={!formState.isValid}>
                {isLoginMode ? "Login" : "Sign-up"}
              </Button>
            </StyledBoxForButtons>
          </form>
          <StyledBoxForButtons>
            <Button inverse onClick={signUpOrLoginHandler}>
              Switch to {isLoginMode ? "Sign-up" : "Login"}
            </Button>
          </StyledBoxForButtons>
        </StyledFormCard>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default Auth;
