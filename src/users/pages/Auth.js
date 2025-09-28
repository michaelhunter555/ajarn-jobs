import React, { useContext, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Card,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Footer from "../../shared/components/UIElements/Footer";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useFirebaseAuth } from "../../shared/hooks/firebase-auth-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import GoogleLoginButton from "../../shared/components/FormElements/GoogleLoginButton";
import EmployerOnboarding from "../components/EmployerOnboarding";

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

const StyledBoxForButtons = styled(Box)({
  display: "flex",
  flexDirection: "column",
  margin: "1rem auto",
  justifyContent: "center",
  alignItems: "center",
});

const AuthMethodContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "1rem 0",
  padding: "1rem",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.grey[200]}`,
}));

const AuthMethodLabel = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
  fontWeight: 500,
}));

const Auth = () => {
  const { search, state: locationState } = useLocation();
  const queryParams = new URLSearchParams(search);
  const queryValue = queryParams.get("name");
  const auth = useContext(AuthContext);

  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [useGoogleAuth, setUseGoogleAuth] = useState(true); // Default to Google OAuth
  const [showPassword, setShowPassword] = useState(false);
  const { isPostLoading, error, sendRequest, clearError } = useHttpClient();
  const { createUser, signInUser } = useFirebaseAuth();
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

  // Employer onboarding gate after manual signup
  const [showEmployerOnboarding, setShowEmployerOnboarding] = useState(false);

  // Check if we should show employer onboarding from email verification
  useEffect(() => {
    if (locationState?.showEmployerOnboarding) {
      setShowEmployerOnboarding(true);
    }
  }, [locationState]);

  useEffect(() => {
    if (isLoginMode && queryValue === "signUp") {
      setIsLoginMode(false);
    }
  }, [isLoginMode, queryValue]);

  //switch from login to sign-up
  const signUpOrLoginHandler = () => {
    if (!isLoginMode) {
      // Switching from sign-up to login mode
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
          userType: undefined,
        },
        formState?.inputs?.email?.isValid &&
          formState?.inputs?.password?.isValid
      );
    } else {
      // Switching from login to sign-up mode
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
          userType: { value: "teacher", isValid: true },
        },
        formState?.inputs?.email?.isValid &&
          formState?.inputs?.password?.isValid &&
          formState?.inputs?.name?.isValid
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
        // Use Firebase Auth for login
        const result = await signInUser(
          formState.inputs.email.value,
          formState.inputs.password.value
        );
        
        if (!result.success) {
          console.error("❌ Firebase login failed:", result.error);
          // Show error to user
          alert(result.error);
          return;
        }
        
        const firebaseUser = result.user;

        // Get user data from your backend
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            firebaseUid: firebaseUser.uid,
          }),
          { "Content-type": "application/json" }
        );
        
        // Check if user needs to complete signup (Firebase verified but not in MongoDB)
        if (response.needsSignupCompletion) {
          console.log("🔄 User needs to complete signup process");
          // Store the Firebase UID, email, userType, and temporary token for signup completion
          localStorage.setItem('pendingSignup', JSON.stringify({
            email: response.email,
            firebaseUid: response.firebaseUid,
            userType: formState.inputs.userType.value, // Include the selected userType
            token: response.token,
            timestamp: Date.now()
          }));
          // Redirect to email verification page to complete signup
          
          navigate('/verify-email');
          return;
        }
        
        const {
          userId,
          token,
          image,
          buffetIsActive,
          blogPosts,
          resume,
          pdfResume,
          coverLetter,
          incomeDirectory,
          applications,
          jobs,
          buffetStartDate,
          buffetEndDate,
          userType,
          theme,
          name,
          needsOnboarding,
        } = response;

        auth.login(
          {
            _id: userId,
            image: image,
            buffetIsActive: buffetIsActive,
            blogPosts: blogPosts,
            resume: resume,
            pdfResume: pdfResume,
            coverLetter: coverLetter,
            incomeDirectory: incomeDirectory,
            applications: applications,
            jobs: jobs,
            buffetStartDate: buffetStartDate,
            buffetEndDate: buffetEndDate,
            userType: userType,
            theme: theme,
            name,
            needsOnboarding,
          },
          token
        );
        
        // Don't navigate if user needs onboarding
        if (!needsOnboarding) {
          navigate("/");
        }
      } catch (err) {
        //error handling done in custom hook
      }
    } else {
      try {
        // console.log("🔥 Starting Firebase signup process...");
        // console.log("📧 Email:", formState.inputs.email.value);
        // console.log("👤 User type:", formState.inputs.userType.value);
        
        // Store signup data in localStorage before Firebase signup
        const signupData = {
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          userType: formState.inputs.userType.value,
          timestamp: Date.now()
        };
        
        // console.log("💾 Storing signup data in localStorage:", signupData);
        // console.log("🏢 UserType being stored:", signupData.userType);
        localStorage.setItem('pendingSignup', JSON.stringify(signupData));

        // Use Firebase Auth for manual signup
        const result = await createUser(
          formState.inputs.email.value,
          formState.inputs.password.value
        );
        
        if (!result.success) {
          console.error("❌ Firebase signup failed:", result.error);
          // Clear stored data on failure
          localStorage.removeItem('pendingSignup');
          // Show error to user
          alert(result.error);
          return;
        }
        
        const firebaseUser = result.user;
        
        // console.log("✅ Firebase user created:", firebaseUser.uid);
        // console.log("📧 Firebase email verified:", firebaseUser.emailVerified);

        // Redirect to email verification page (don't create user in MongoDB yet)
        console.log("🔄 Redirecting to email verification...");
        navigate("/verify-email");
      } catch (err) {
        console.error("❌ Signup error:", err);
        //error handling done in custom hook
      }
    }
  };

  const userTypeHandler = (event) => {
    inputHandler("userType", event.target.value, true);
  };

  const isEmployer = formState?.inputs?.userType?.value === "employer";

  return (
    <PageContainer>
      <Content>
        <ErrorModal onClear={clearError} error={error} />
        <StyledFormCard>
          {auth?.isLoggedIn && (
            <Alert
              action={
                <Chip
                  color="warning"
                  variant="outlined"
                  label="Go back to Home"
                  size="small"
                  clickable
                  component="button"
                  onClick={() => navigate("/")}
                />
              }
              severity="warning"
            >
              You are logged in already.
            </Alert>
          )}
          {isPostLoading && <CircularProgress />}
          
          {/* Auth Method Switch */}
          <AuthMethodContainer>
            <AuthMethodLabel variant="body1">
              Manual Login
            </AuthMethodLabel>
            <Switch
              checked={useGoogleAuth}
              onChange={(e) => setUseGoogleAuth(e.target.checked)}
              color="primary"
            />
            <AuthMethodLabel variant="body1">
              Google Sign-In
            </AuthMethodLabel>
          </AuthMethodContainer>

          {useGoogleAuth ? (
            // Google OAuth Section
            <Box>
              <Typography variant="h6" align="center" gutterBottom>
                Sign in with Google
              </Typography>
              <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
                Quick and secure sign-in using your Google account
              </Typography>
              <StyledBoxForButtons>
                <GoogleLoginButton />
              </StyledBoxForButtons>
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              <StyledBoxForButtons>
                <Button inverse onClick={() => setUseGoogleAuth(false)}>
                  Use Manual Login Instead
                </Button>
              </StyledBoxForButtons>
            </Box>
          ) : (
            // Manual Login Section
            <Box>
              <Typography variant="h6" align="center" gutterBottom>
                {isLoginMode ? "Sign In" : "Create Account"}
              </Typography>
              {!isLoginMode && showEmployerOnboarding ? (
                <EmployerOnboarding onComplete={() => navigate("/")} />
              ) : (
              <form onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">User Type</FormLabel>
                    <RadioGroup
                      row
                      value={formState?.inputs?.userType?.value}
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
                    label={isEmployer ? "Your company name" : "Your name"}
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  helperText="Enter Password"
                  fieldLabel="Password"
                  label="Password"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="please enter your password"
                  onInput={inputHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <StyledBoxForButtons>
                  <Button
                    type="submit"
                    disabled={!formState.isValid || auth?.isLoggedIn}
                  >
                    {isLoginMode ? "Login" : "Sign-up"}
                  </Button>
                </StyledBoxForButtons>
              </form>
              )}
              <StyledBoxForButtons>
                <Button inverse onClick={signUpOrLoginHandler}>
                  Switch to {isLoginMode ? "Sign-up" : "Login"}
                </Button>
              </StyledBoxForButtons>
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              <StyledBoxForButtons>
                <Button inverse onClick={() => setUseGoogleAuth(true)}>
                  Use Google Sign-In Instead
                </Button>
              </StyledBoxForButtons>
            </Box>
          )}
        </StyledFormCard>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default Auth;
