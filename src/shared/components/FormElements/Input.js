import React, { useEffect, useReducer, useState } from "react";

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { validate } from "../../util/validators";

const LoginFormControl = styled("div")(({ theme }) => ({
  margin: "1rem 0.5rem",
  "& label, & input, & textarea": {
    display: "flex",
    maxWidth: "100%",
  },
  "& label": {
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  "& input, & textarea": {
    width: "100%",
    font: "inherit",

    background: theme.palette.background.default,
    margin: "0 auto",
  },
  "& input:focus, & textarea:focus": {
    outline: "none",
    background: theme.palette.background.default,
    borderColor: "#510077",
  },
  "&.form-control--invalid label, &.form-control--invalid p": {
    color: "red",
  },
  "&.form-control--invalid input, &.form-control--invalid textarea": {
    borderColor: "red",
    background: "#ffd1d1",
  },
}));

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });
  const [checkedCount, setCheckedCount] = useState(0);

  const { value, isValid } = inputState;
  const { id, onInput } = props;

  useEffect(() => {
    //NewJob.js contains function for this props.onInput
    //We will pass this to our custom form hook inputhandler function
    //please also view ../hooks/form-hooks.js to get 360 understanding.
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    if (props.element === "checkbox") {
      let newValues = [...inputState.value];
      if (event.target.checked) {
        newValues.push(event.target.value);
        setCheckedCount((prev) => prev + 1);
      } else {
        newValues = newValues.filter((val) => val !== event.target.value);
        setCheckedCount((prev) => prev - 1);
      }
      dispatch({
        type: "CHANGE",
        val: newValues.join(", "),
        validators: props.validators,
      });
    }
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <TextField
        id={props.id}
        type={props.type}
        helperText={props.helperText}
        label={props.fieldLabel}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        InputProps={{
          endAdornment: props.endAdornment
        }}
      />
    ) : props.element === "textarea" ? (
      <TextField
        id={props.id}
        multiline
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : props.element === "select" ? (
      <Select
        id={props.id}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      >
        {props.options &&
          props.options.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
      </Select>
    ) : (
      props.element === "checkbox" && (
        <FormGroup row onChange={changeHandler} onBlur={touchHandler}>
          {props.options &&
            props.options.map((item, i) => (
              <FormControlLabel
                key={i}
                id={props.id}
                value={item}
                control={
                  <Checkbox
                    disabled={
                      checkedCount === props.max &&
                      !inputState.value.split(", ").includes(item)
                    }
                  />
                }
                label={item}
                labelPlacement="top"
              />
            ))}
        </FormGroup>
      )
    );

  return (
    <LoginFormControl
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </LoginFormControl>
  );
};

export default Input;
