import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Box, Card } from "@mui/material";
import { styled } from "@mui/material/styles";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

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
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  //const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  //switch from login to sign-up
  const signUpOrLoginHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
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
    } else {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/user/sign-up", {
          method: "POST",
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          headers: { "Content-type": "application/json" },
        });

        const data = await response.json();

        if (!data.ok) {
          throw new Error(data.message);
        }
        console.log(data);
        setIsLoading(false);
        auth.login();
        // navigate("/");
      } catch (err) {
        setIsLoading(false);
        setIsError(err.message || "Something went wrong. Please try again");
        console.log(err);
      }
    }
  };

  console.log("logged in user", auth.user);
  useEffect(() => {
    console.log("Auth is set:", auth.user);
  }, [auth.user]);

  const errorHandler = (err) => {
    setIsError(null);
  };

  return (
    <>
      <ErrorModal onClear={errorHandler} error={isError} />
      <StyledFormCard>
        {isLoading && <LoadingSpinner asOverlay />}
        <form onSubmit={authSubmitHandler}>
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
            label="Your e-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="please enter a name"
            onInput={inputHandler}
          />

          <Input
            element="input"
            type="password"
            id="password"
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
    </>
  );
};

export default Auth;
