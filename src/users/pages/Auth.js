import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

const Auth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
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
  const authSubmitHandler = (event) => {
    event.preventDefault();
    //api call
    auth.login();
    navigate("/");
  };

  return (
    <>
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
          label="Your name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="please enter your password"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Login" : "Sign-up"}
        </Button>
      </form>
      <Button inverse onClick={signUpOrLoginHandler}>
        Switch to {isLoginMode ? "Sign-up" : "Login"}
      </Button>
    </>
  );
};

export default Auth;
