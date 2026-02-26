import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { thaiCities } from "../../shared/util/ThaiData";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const ModernCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  background: theme.palette.mode === "dark"
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: theme.palette.mode === "dark"
    ? "1px solid rgba(255, 255, 255, 0.2)"
    : "1px solid rgba(255, 255, 255, 0.3)",
}));

const EmployerOnboarding = ({ onComplete, user }) => {
  const auth = useContext(AuthContext);
  const { isPostLoading, sendRequest } = useHttpClient();
  const navigate = useNavigate();
  
  // Get userType from localStorage (set by OnboardingFlow when employer is selected)
  const selectedUserType = localStorage.getItem('selectedUserType') || 'employer';
  
  // console.log('🏢 EmployerOnboarding rendered!');
  // console.log('  - user:', user);
  // console.log('  - selectedUserType:', selectedUserType);

  const [form, setForm] = useState({
    company: "",
    logoUrl: "",
    companySize: "",
    headquarters: "",
    established: "",
    presence: "",
    about: "",
    image: null,
  });

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // For Firebase-only signups, we need to create the user first, then update creator
      if (!auth.user?._id || auth.user?._id === auth.user?.firebaseUid) {
        console.log("🔥 Firebase-only signup detected - creating user first");
        
        // Get token from localStorage for Firebase-only signups
        const pendingSignupData = localStorage.getItem('pendingSignup');
        let tokenToUse;
        if (pendingSignupData) {
          const parsedData = JSON.parse(pendingSignupData);
          tokenToUse = parsedData.token;
          console.log('🎫 Using temporary token from localStorage:', tokenToUse ? 'Token found' : 'No token');
        }
        
        if (!tokenToUse) {
          throw new Error('No authentication token available');
        }
        
        // Create user with company data
        const userData = {
          name: user?.name || 'User',
          email: user?.email,
          userType: selectedUserType, // Use the selected userType from localStorage
          image: form.image || user?.image || '',
          firebaseUid: user?.firebaseUid,
          company: form.company,
          logoUrl: form.logoUrl,
          companySize: form.companySize,
          headquarters: form.headquarters,
          established: form.established,
          presence: form.presence,
          about: form.about,
          isOnboarded: true,
          isVerified: true,
          password: null
        };
        
        // Create FormData for file upload
        const formData = new FormData();
        Object.keys(userData).forEach(key => {
          if (userData[key] instanceof File) {
            // If image is a file object, append it directly
            formData.append('image', userData[key]);
          } else if(userData[key] !== undefined && userData[key] !== null) {
            formData.append(key, userData[key]);
          }
        });
        formData.append('isRegistration', 'true');
        
        const response = await sendRequest(
          `${process.env.REACT_APP_USERS}/complete-onboarding/${user?.firebaseUid}`,
          "POST",
          formData,
          {
            Authorization: "Bearer " + tokenToUse,
          }
        );

       // console.log("response", response);
        
        // Login the user with the new data
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
            needsOnboarding: response.needsOnboarding,
          },
          response.token
        );
        
        // Clean up localStorage
        localStorage.removeItem('selectedUserType');
        
        // Navigate to home page
       navigate('/');
      } else {
        console.log("updating creator")
        // Regular user - just update creator with FormData for image upload
        const formData = new FormData();
        Object.keys(form).forEach(key => {
          if (form[key] instanceof File) {
            // If image is a file object, append it directly
            formData.append('image', form[key]);
          } else if(form[key] !== undefined && form[key] !== null) {
            formData.append(key, form[key]);
          }
        });
        
        // Add isRegistration flag
        formData.append('isRegistration', 'true');
        console.log("sending request");
       const res = await sendRequest(
          `${process.env.REACT_APP_USERS}/update-creator/${auth.user._id}`,
          "PATCH",
          formData,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        console.log("Request ok!")
        if(res.ok) {
        auth?.updateUser({
          ...auth.user,
          userType: "employer",
          needsOnboarding: false,
          creator: res.creator,
        });
        console.log("User updated")
    }
    localStorage.removeItem('selectedUserType');
        navigate('/');
      }
    } catch (err) {
      console.error("❌ Employer onboarding error:", err);
    }
  };

  const storedUser = localStorage.getItem("pendingSignup");
  const parsedUser = JSON.parse(storedUser);
  console.log("form", form);

  return (
    <ModernCard>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Complete Company Profile
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Tell candidates about your company. You can edit these later.
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                required
                value={parsedUser?.name || form.company}
                onChange={handleChange("company")}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Profile Picture (optional)
              </Typography>
              <ImageUpload 
                id="image" 
                onInput={(id, value, isValid) => setForm(prev => ({ ...prev, image: value }))}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Logo URL (optional)"
                value={form.logoUrl}
                onChange={handleChange("logoUrl")}
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Size (e.g. 10-50)"
                value={form.companySize}
                onChange={handleChange("companySize")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="headquarters-label">Headquarters</InputLabel>
                <Select
                  labelId="headquarters-label"
                  label="Headquarters"
                  value={form.headquarters}
                  onChange={handleChange("headquarters")}
                >
                  {thaiCities.map((city, i) => (
                    <MenuItem key={i} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Established (e.g. 2004)"
                value={form.established}
                onChange={handleChange("established")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Presence (comma separated)"
                helperText="e.g. Bangkok, Chiang Mai, Phuket"
                value={form.presence}
                onChange={handleChange("presence")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={4}
                label="About the Company"
                value={form.about}
                onChange={handleChange("about")}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" disabled={isPostLoading}>
                {isPostLoading ? <CircularProgress size={20} /> : "Save & Continue"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </ModernCard>
  );
};

export default EmployerOnboarding;


