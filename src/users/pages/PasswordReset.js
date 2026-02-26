import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { auth as firebaseAuth } from "../../shared/config/firebase";
import {
  Card,
  Typography,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import { useMutation } from "@tanstack/react-query";

const PageContainer = styled("div")({
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
  });
  
  const Content = styled("div")({
    flex: 1,
  });
  
  const StyledFormCard = styled(Card)(({ theme }) => ({
    listStyle: "none",
    margin: "6rem auto",
    padding: "1rem",
    width: "90%",
    maxWidth: "40rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
    borderRadius: "6px",
    background: theme.palette.background.paper,
  }));

  const PasswordResetPage = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const oobCode = queryParams.get("oobCode");
    const navigate = useNavigate();
    const [formState, inputHandler, setFormData] = useForm({
        password: { value: "", isValid: false },
        confirmPassword: { value: "", isValid: false },
    }, false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const mutatePasswordReset = useMutation({
        mutationKey: ["password-reset"],
        mutationFn: async () => {
            return await confirmPasswordReset(firebaseAuth, oobCode, formState.inputs.password.value);
        },
    });

    const { confirmPassword, password } = formState.inputs;
    const confirmPasswordResetHandler = async (password) => {
        if(!oobCode || password.length < 6) {
            return;
        }

       try {
        mutatePasswordReset.mutate(); 
        setFormData({
            password: { value: "", isValid: false },
            confirmPassword: { value: "", isValid: false },
        }, false);
        navigate("/auth");
       } catch (error) {
        console.error("❌ Password reset failed:", error);
       } 
    }

    const isValid = 
    password.value === confirmPassword.value 
    && password.value.length >= 6
    && /[0-9]/g.test(password.value);

    return (
        <PageContainer>
            <Content>
                <StyledFormCard>
                    <Typography variant="h6">Reset your password</Typography>
                    <Typography color="text.secondary" variant="subtitle2">
                        Please enter a password with at least 6 characters and one number.
                    </Typography>
                    {password.value.length < 6 && (
                        <Typography color="text.secondary" variant="subtitle2">
                            &bull; Password must be at least 6 characters long.
                        </Typography>
                    )}
                    {!/[0-9]/g.test(password.value) && (
                        <Typography color="text.secondary" variant="subtitle2">
                            &bull; Password must contain at least one number.
                        </Typography>
                    )}
                    {password.value !== confirmPassword.value && (
                        <Typography color="text.secondary" variant="subtitle2">
                            &bull; Passwords do not match.
                        </Typography>
                    )}
                        <Input
                        element="input"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        label="New Password"
                        placeholder="Enter your new password"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                        value={formState.inputs.password.value}
                        errorText="Please enter a valid password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        />
                        <Input
                        element="input"
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        label="Confirm Password"
                        placeholder="Confirm your new password"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                        value={formState.inputs.confirmPassword.value}
                        errorText="Please enter a valid password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        />
                        <Stack alignItems="end">
                        <Button disabled={!isValid} onClick={() => confirmPasswordResetHandler(formState.inputs.password.value)}>Reset Password</Button>
                        </Stack>
                </StyledFormCard>
            </Content>
        </PageContainer>
    );
  };

  export default PasswordResetPage;