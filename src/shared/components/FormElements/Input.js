import React, { useEffect, useReducer } from "react";

import { styled } from "@mui/material/styles";

import { validate } from "../../util/validators";

const FormControl = styled("div")(({ theme }) => ({
  margin: "1rem 0",
  "& label, & input, & textarea": {
    display: "block",
  },
  "& label": {
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  "& input, & textarea": {
    width: "100%",
    font: "inherit",
    border: "1px solid #ccc",
    background: "#f8f8f8",
    padding: "0.15rem 0.25rem",
  },
  "& input:focus, & textarea:focus": {
    outline: "none",
    background: "#ebebeb",
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

  const { value, isValid } = inputState;
  const { id, onInput } = props;

  useEffect(() => {
    //NewJob.js contains function for this props.onInput
    //We will pass this to our custom form hook inputhandler function
    //please also view ../hooks/form-hooks.js to get 360 understanding.
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
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
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : props.element === "textarea" ? (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      props.element === "select" && (
        <select
          id={props.id}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        >
          {props.options &&
            props.options.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
        </select>
      )
    );

  return (
    <FormControl
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </FormControl>
  );
};

export default Input;
