import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployerOnboarding from '../../../users/components/EmployerOnboarding';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Avatar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/http-hook';
import { thaiProvinces, educationLevels, nationalities, experienceYears } from '../../data/thaiLocations';
import ImageUpload from '../FormElements/ImageUpload';

const OnboardingContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
}));

const OnboardingCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  padding: theme.spacing(3),
  boxShadow: theme.shadows[4],
}));

const StepContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  minHeight: '400px',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(3),
}));

const steps = [
  'Role Selection',
  'Personal Information',
  'Professional Details',
  'Location & Education',
  'Profile Picture'
];

const OnboardingFlow = ({ user, onComplete }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest, isPostLoading, error } = useHttpClient();
  
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    userType: user?.userType || 'teacher', // Default to teacher, but allow change
    nationality: '',
    workExperience: '',
    education: '',
    university: '',
    location: '',
    image: user?.image || null
  });

  const handleNext = () => {
    // If user selects employer in step 0, just continue to next step
    if (activeStep === 0 && formData.userType === 'employer') {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
const formState = formData;
// console.log("user", user);
  const handleComplete = async () => {
    try {
      // console.log('Onboarding completion - user object:', user);
      // console.log('Onboarding completion - user._id:', user._id);
      // console.log('Onboarding completion - formData:', formState);
      
      // Check if this is Firebase-only signup (no real _id or _id is undefined)
      let tokenToUse = auth.token;
      if (!user._id || user._id === user.firebaseUid) {
       // console.log('🔥 Firebase-only signup detected - using temporary token from localStorage');
        const pendingSignupData = localStorage.getItem('pendingSignup');
        if (pendingSignupData) {
          const parsedData = JSON.parse(pendingSignupData);
          tokenToUse = parsedData.token;
         // console.log('🎫 Using temporary token:', tokenToUse ? 'Token found' : 'No token');
        }
      }
      
     // console.log('🔑 Token being used:', tokenToUse ? `Token: ${tokenToUse.substring(0, 20)}...` : 'NO TOKEN');
      if (!tokenToUse) {
        console.error('❌ No token available for onboarding completion');
        throw new Error('No authentication token available');
      }
      
      // Validate token format (should start with eyJ)
      if (!tokenToUse.startsWith('eyJ')) {
       // console.error('❌ Invalid token format:', tokenToUse);
        throw new Error('Invalid authentication token format');
      }
      
      // Include Firebase user data in the request
      const requestData = {
        ...formState,
        name: user.name,
        email: user.email,
        userType: formState.userType || user.userType || 'teacher', // Use form data userType if available
        firebaseUid: user.firebaseUid
      };
      
      // console.log('👤 User object passed to OnboardingFlow:', user);
      // console.log('📤 Request data being sent:', requestData);
      // console.log('🏢 UserType being sent:', requestData.userType);

      // Use firebaseUid as the endpoint parameter since _id is undefined
      const endpointId = user._id || user.firebaseUid;
      //console.log('🎯 Using endpoint ID:', endpointId);
      
      // Create FormData for file upload
      const formData = new FormData();
      Object.keys(requestData).forEach(key => {
        if (key === 'image' && requestData[key] && typeof requestData[key] === 'object') {
          // If image is a file object, append it directly
          formData.append('image', requestData[key]);
        } else {
          formData.append(key, requestData[key]);
        }
      });

      // for (let [key, val] of formData.entries()) {
      //   console.log("🚚 Sending:", key, val);
      // }
      

      const response = await sendRequest(
        `${process.env.REACT_APP_USERS}/complete-onboarding/${endpointId}`,
        'POST',
        formData,
        {
          'Authorization': `Bearer ${tokenToUse}`
        }
      );

      if (response) {
        // Login the user with the new data and token
        auth.login(
          {
            _id: response.userId,
            image: response.image,
            buffetIsActive: response.buffetIsActive,
            blogPosts: response.blogPosts,
            resume: response.resume,
            coverLetter: response.coverLetter,
            incomeDirectory: response.incomeDirectory,
            applications: response.applications,
            jobs: response.jobs,
            buffetStartDate: response.buffetStartDate,
            buffetEndDate: response.buffetEndDate,
            userType: response.userType,
            theme: response.theme,
            name: response.name,
            nationality: response.nationality,
            location: response.location,
            workExperience: response.workExperience,
            education: response.education,
            university: response.university,
            isOnboarded: response.isOnboarded,
            needsOnboarding: response.needsOnboarding
          },
          response.token
        );
        
        navigate('/');
      }
    } catch (err) {
      console.error('Onboarding completion error:', err);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return formData.userType; // Role selection is required
      case 1:
        return formData.nationality && formData.workExperience;
      case 2:
        return formData.education && formData.university;
      case 3:
        return formData.location;
      case 4:
        return true; // Image is optional
      default:
        return false;
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose Your Role
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Are you looking for teaching jobs or posting them?
            </Typography>
            
            <FormControl fullWidth>
              <InputLabel>I am a...</InputLabel>
              <Select
                value={formData.userType}
                label="I am a(n)..."
                onChange={(e) => handleInputChange('userType', e.target.value)}
              >
                <MenuItem value="teacher">Teacher - Looking for jobs</MenuItem>
                <MenuItem value="employer">Employer - Posting jobs</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Tell us about yourself
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Help us understand your background and experience
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Nationality</InputLabel>
              <Select
                value={formData.nationality}
                label="Nationality"
                onChange={(e) => handleInputChange('nationality', e.target.value)}
              >
                {nationalities.map((nationality) => (
                  <MenuItem key={nationality} value={nationality}>
                    {nationality}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Years of Experience</InputLabel>
              <Select
                value={formData.workExperience}
                label="Years of Experience"
                onChange={(e) => handleInputChange('workExperience', e.target.value)}
              >
                {experienceYears.map((experience) => (
                  <MenuItem key={experience} value={experience}>
                    {experience}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Your Education
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Share your educational background
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Highest Education Level</InputLabel>
              <Select
                value={formData.education}
                label="Highest Education Level"
                onChange={(e) => handleInputChange('education', e.target.value)}
              >
                {educationLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="University/Institution"
              value={formData.university}
              onChange={(e) => handleInputChange('university', e.target.value)}
              placeholder="Enter your university or institution name"
            />
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Your Location
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Where are you currently located in Thailand?
            </Typography>
            
            <FormControl fullWidth>
              <InputLabel>Location in Thailand</InputLabel>
              <Select
                value={formData.location}
                label="Location in Thailand"
                onChange={(e) => handleInputChange('location', e.target.value)}
              >
                {thaiProvinces.map((province) => (
                  <MenuItem key={province} value={province}>
                    {province}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );

      case 4:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Profile Picture
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Add a profile picture to help others recognize you (optional)
            </Typography>
            
            <ImageUpload 
              id="image" 
              onInput={(id, value, isValid) => handleInputChange('image', value)}
            />
          </Box>
        );

      default:
        return 'Unknown step';
    }
  };

  // If user selected employer, render EmployerOnboarding directly
  if (formData.userType === 'employer' && activeStep > 0) {
    return <EmployerOnboarding user={user} />;
  }

  return (
    <OnboardingContainer>
      <OnboardingCard>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar
            src={user.image}
            sx={{ width: 80, height: 80, margin: '0 auto 16px' }}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <Typography variant="h4" gutterBottom>
            Welcome, {user.name}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Let's set up your profile to get you started
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <StepContent>
          {renderStepContent(activeStep)}
        </StepContent>

        <ButtonContainer>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleComplete}
              disabled={!isStepValid(activeStep) || isPostLoading}
            >
              {isPostLoading ? <CircularProgress size={24} /> : 'Complete Setup'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!isStepValid(activeStep)}
            >
              Next
            </Button>
          )}
        </ButtonContainer>
      </OnboardingCard>
    </OnboardingContainer>
  );
};

export default OnboardingFlow;
