import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  const decodeJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Extract user fields from credential on client to match backend expectations
      const token = credentialResponse?.credential;
      const payload = token ? decodeJwt(token) : null;
      const email = payload?.email;
      const name = payload?.name;
      const picture = payload?.picture;
      const sub = payload?.sub;

      const response = await fetch(`${process.env.REACT_APP_USERS}/google-auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          picture,
          sub,
          googleId: sub
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Debug logging
        console.log('Google auth response:', data);
        console.log('User image URL:', data.image);
        
        // Login user with your existing auth system
        auth.login(
          {
            _id: data.userId,
            email: data.email,
            image: data.image,
            buffetIsActive: data.buffetIsActive,
            blogPosts: data.blogPosts,
            resume: data.resume,
            pdfResume: data.pdfResume,
            coverLetter: data.coverLetter,
            incomeDirectory: data.incomeDirectory,
            applications: data.applications,
            jobs: data.jobs,
            buffetStartDate: data.buffetStartDate,
            buffetEndDate: data.buffetEndDate,
            userType: data.userType,
            theme: data.theme,
            name: data.name,
            needsOnboarding: data.needsOnboarding,
          },
          data.token
        );
        
        // Handle onboarding flow for new Google users
        if (data.needsOnboarding) {
          console.log('🔄 Google user needs onboarding, redirecting...');
          navigate('/onboarding');
        } else {
          navigate('/');
        }
        
        if (onSuccess) {
          onSuccess(data);
        }
      } else {
        throw new Error(data.message || 'Google authentication failed');
      }
    } catch (error) {
      console.error('Google auth error:', error);
      if (onError) {
        onError(error);
      }
    }
  };

  const handleGoogleError = () => {
    console.log('Google Login Failed');
    if (onError) {
      onError(new Error('Google login failed'));
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
      useOneTap={false}
      auto_select={false}
      theme="outline"
      size="large"
      width="100%"
      text="signin_with"
      shape="rectangular"
      ux_mode="popup"
      popup_type="popup"
      scope="profile email"
    />
  );
};

export default GoogleLoginButton;
