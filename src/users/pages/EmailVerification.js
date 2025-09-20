import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Avatar,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useFirebaseAuth } from '../../shared/hooks/firebase-auth-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { auth as firebaseAuth } from '../../shared/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import OnboardingFlow from '../../shared/components/Onboarding/OnboardingFlow';
import EmployerOnboarding from '../components/EmployerOnboarding';

const VerificationContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
}));

const VerificationCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  padding: theme.spacing(3),
  textAlign: 'center',
  boxShadow: theme.shadows[4],
}));

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const { resendVerification, signInUser, isLoading, error } = useFirebaseAuth();
  const { sendRequest } = useHttpClient();
  const [user, setUser] = useState(null);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [isCheckingVerification, setIsCheckingVerification] = useState(false);
  const [pendingSignupData, setPendingSignupData] = useState(null);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Load pending signup data from localStorage
  useEffect(() => {
    const storedSignupData = localStorage.getItem('pendingSignup');
    if (storedSignupData) {
      try {
        const parsedData = JSON.parse(storedSignupData);
        console.log("💾 Found pending signup data:", parsedData);
        
        // Check if data is not too old (24 hours)
        const isDataValid = Date.now() - parsedData.timestamp < 24 * 60 * 60 * 1000;
        if (isDataValid) {
          setPendingSignupData(parsedData);
        } else {
          console.log("🗑️ Pending signup data is too old, removing...");
          localStorage.removeItem('pendingSignup');
        }
      } catch (err) {
        console.error("❌ Error parsing stored signup data:", err);
        localStorage.removeItem('pendingSignup');
      }
    }
  }, []);

  // Check if this is a Firebase-verified user who needs to complete signup
  const isFirebaseOnlySignup = pendingSignupData && pendingSignupData.firebaseUid && !pendingSignupData.name;

  // Generate and store temp token for Firebase-verified users
  const generateAndStoreTempToken = async (email, firebaseUid) => {
    try {
      console.log("🎫 Generating temp token for:", email);
      const response = await sendRequest(
        `${process.env.REACT_APP_USERS}/generate-temp-token`,
        "POST",
        JSON.stringify({
          email: email,
          firebaseUid: firebaseUid
        }),
        {
          "Content-Type": "application/json"
        }
      );
      
      console.log("✅ Temp token generated:", response.token ? "Token received" : "No token");
      
      // Store the temp token in localStorage while preserving all original signup data
      const updatedPendingData = {
        ...pendingSignupData, // Keep all original data (name, userType, image, etc.)
        token: response.token,
        email: response.email,
        firebaseUid: response.firebaseUid
      };
      
      console.log("💾 Updated pending data:", updatedPendingData);
      
      localStorage.setItem('pendingSignup', JSON.stringify(updatedPendingData));
      setPendingSignupData(updatedPendingData);
      
      console.log("💾 Temp token stored in localStorage");
    } catch (err) {
      console.error("❌ Error generating temp token:", err);
      throw err;
    }
  };

  // Handle continue signup for Firebase-verified users
  const handleContinueSignup = async () => {
    console.log("🔄 User wants to complete signup - generating temp token and showing onboarding");
    
    if (!user || !pendingSignupData) {
      console.error("❌ Missing user or pendingSignupData");
      return;
    }

    try {
      // Generate temp token first
      await generateAndStoreTempToken(user.email, user.uid);
      // Then show the onboarding flow
      setShowOnboarding(true);
    } catch (err) {
      console.error("❌ Error generating temp token for continue signup:", err);
    }
  };

  useEffect(() => {
    console.log("📧 EmailVerification component mounted");
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      console.log("🔥 Firebase auth state changed:", currentUser ? "User logged in" : "No user");
      if (currentUser) {
        console.log("👤 Current user:", currentUser.email, "Verified:", currentUser.emailVerified);
        setUser(currentUser);
        
        // If email is already verified, generate temp token and show onboarding
        if (currentUser.emailVerified) {
          console.log("✅ Email verified! Generating temp token and showing onboarding...");
          try {
            await generateAndStoreTempToken(currentUser.email, currentUser.uid);
            setShowOnboarding(true);
          } catch (err) {
            console.error("❌ Error generating temp token in useEffect:", err);
          }
        }
      } else {
        console.log("❌ No user found");
        // Check if we have pending signup data
        const storedData = localStorage.getItem('pendingSignup');
        if (storedData) {
          console.log("🔄 User not signed in but has pending signup data");
          // Don't redirect - let them continue the verification process
        } else {
          console.log("🔄 No pending signup data, redirecting to auth");
          navigate('/auth');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, sendRequest, auth]);



  const handleResendVerification = async () => {
    if (user && resendCount < 3) {
      const result = await resendVerification(user);
      if (result.success) {
        setResendSuccess(true);
        setResendCount(prev => prev + 1);
        setTimeout(() => setResendSuccess(false), 5000);
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const result = await signInUser(signInEmail, signInPassword);
      if (result.success) {
        console.log("✅ User signed in with Firebase");
        setUser(result.user);
        setShowSignInForm(false);
      } else {
        console.error("❌ Failed to sign in with Firebase:", result.error);
        alert(result.error);
      }
    } catch (err) {
      console.error("❌ Error signing in with Firebase:", err);
    }
  };

  const handleCheckVerification = async () => {
    console.log("🔍 Checking email verification...");
    if (user) {
      console.log("👤 Reloading user data...");
      user.reload().then(async () => {
        console.log("📧 Email verified status:", user.emailVerified);
        if (user.emailVerified) {
          console.log("✅ Email verified! Generating temp token and continuing to onboarding...");
          // Generate temp token and store it, then show onboarding
          await generateAndStoreTempToken(user.email, user.uid);
          setShowOnboarding(true);
        } else {
          console.log("❌ Email not yet verified");
        }
      });
    } else if (pendingSignupData) {
      console.log("🔄 No Firebase user but have pending signup data - user needs to sign in with Firebase first");
      // User needs to sign in with Firebase first
      try {
        const result = await signInUser(pendingSignupData.email, pendingSignupData.password);
        if (result.success) {
          console.log("✅ User signed in with Firebase");
          setUser(result.user);
          // Check verification status after sign in
          if (result.user.emailVerified) {
            console.log("✅ Email already verified! Generating temp token and continuing to onboarding...");
            // Generate temp token and store it, then show onboarding
            await generateAndStoreTempToken(result.user.email, result.user.uid);
            setShowOnboarding(true);
          }
        } else {
          console.error("❌ Failed to sign in with Firebase:", result.error);
          alert(result.error);
        }
      } catch (err) {
        console.error("❌ Error signing in with Firebase:", err);
      }
    } else {
      // No user and no pending data - show sign in form
      setShowSignInForm(true);
    }
  };

  if (!user && !pendingSignupData) {
    return (
      <VerificationContainer>
        <CircularProgress />
      </VerificationContainer>
    );
  }

  // Show onboarding flow if user clicked "Complete Signup"
  if (showOnboarding) {
    const userType = pendingSignupData?.userType || 'teacher';
    console.log("🏢 Showing onboarding for userType:", userType);
    
    if (userType === 'employer') {
      return (
        <EmployerOnboarding 
          user={{
            firebaseUid: user?.uid,
            email: user?.email,
            name: pendingSignupData?.name || user?.displayName || user?.email?.split('@')[0],
            image: pendingSignupData?.image || user?.photoURL || "",
            userType: userType,
            _id: pendingSignupData?.firebaseUid, // Use firebaseUid as temporary _id
          }}
          onComplete={() => {
            console.log("✅ Employer onboarding completed - user will be created in MongoDB");
            navigate("/");
          }} 
        />
      );
    } else {
      return (
        <OnboardingFlow 
          user={{
            firebaseUid: user?.uid,
            email: user?.email,
            name: pendingSignupData?.name || user?.displayName || user?.email?.split('@')[0],
            image: pendingSignupData?.image || user?.photoURL || "",
            userType: userType,
            _id: pendingSignupData?.firebaseUid, // Use firebaseUid as temporary _id
          }}
          onComplete={() => {
            console.log("✅ Teacher onboarding completed - user will be created in MongoDB");
            navigate("/");
          }} 
        />
      );
    }
  }

  return (
    <VerificationContainer>
      <VerificationCard>
        <CardContent>
          <Avatar
            sx={{ width: 80, height: 80, margin: '0 auto 24px', bgcolor: 'primary.main' }}
          >
            ✉️
          </Avatar>
          
          <Typography variant="h4" gutterBottom>
            Verify Your Email
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            We've sent a verification link to:
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 3, wordBreak: 'break-all' }}>
            {user?.email || pendingSignupData?.email}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Please check your email and click the verification link to activate your account.
            Don't forget to check your spam folder!
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>After clicking the email link:</strong><br/>
              • The link will open in a new tab<br/>
              • You'll see a "Email verified" message<br/>
              • Come back to this tab and click "Check Verification" below
            </Typography>
          </Alert>

          {user && !user.emailVerified && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Email not yet verified.</strong> If you haven't received the email, check your spam folder or click "Resend Verification Email" below.
              </Typography>
            </Alert>
          )}

          {!user && pendingSignupData && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Ready to verify your email?</strong> Click "Check Verification" below to sign in and check your verification status.
              </Typography>
            </Alert>
          )}

          {isFirebaseOnlySignup && (
            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>✅ Email verified by Firebase!</strong> Your email has been verified! Click "Complete Signup" below to finish creating your account and start your onboarding.
              </Typography>
              <Button
                variant="contained"
                onClick={handleContinueSignup}
                disabled={isLoading}
                color="success"
                fullWidth
              >
                Complete Signup
              </Button>
            </Alert>
          )}

          {!user && !pendingSignupData && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Already signed up?</strong> Enter your email and password below to check your verification status.
              </Typography>
            </Alert>
          )}

          {showSignInForm && (
            <Box component="form" onSubmit={handleSignIn} sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Sign In to Check Verification
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  type="email"
                  label="Email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button type="submit" variant="contained" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={20} /> : 'Sign In'}
                  </Button>
                  <Button variant="outlined" onClick={() => setShowSignInForm(false)}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          {isCheckingVerification && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Checking for verification...
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {resendSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Verification email sent! Please check your inbox.
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {user ? (
              <Button
                variant="contained"
                onClick={handleCheckVerification}
                disabled={isLoading || isCheckingVerification}
              >
                {isLoading || isCheckingVerification ? <CircularProgress size={24} /> : 'Check Verification'}
              </Button>
            ) : pendingSignupData ? (
              <Button
                variant="contained"
                onClick={handleCheckVerification}
                disabled={isLoading || isCheckingVerification}
                color="primary"
              >
                {isLoading || isCheckingVerification ? <CircularProgress size={24} /> : 'Continue Verification'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleCheckVerification}
              >
                Check My Verification Status
              </Button>
            )}
            
            {user && (
              <Button
                variant="outlined"
                onClick={handleResendVerification}
                disabled={isLoading || resendCount >= 3}
              >
                {resendCount >= 3 
                  ? 'Resend Limit Reached' 
                  : `Resend Verification Email ${resendCount > 0 ? `(${resendCount}/3)` : ''}`
                }
              </Button>
            )}
            
            <Button
              variant="text"
              onClick={() => navigate('/auth')}
            >
              Back to Login
            </Button>
          </Box>

          {resendCount >= 3 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              You've reached the resend limit. Please wait a few minutes before trying again.
            </Alert>
          )}
        </CardContent>
      </VerificationCard>
    </VerificationContainer>
  );
};

export default EmailVerification;
