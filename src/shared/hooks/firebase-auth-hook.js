import { useState, useCallback } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, actionCodeSettings } from '../config/firebase';

export const useFirebaseAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create user with email and password
  const createUser = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Send email verification with custom action code settings
      await sendEmailVerification(user, actionCodeSettings);
      
      return {
        success: true,
        user: user,
        message: 'Account created! Please check your email to verify your account.'
      };
    } catch (error) {
      console.error("❌ Firebase signup error:", error);
      let errorMessage = error.message;
      
      // Handle specific Firebase error codes
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Please try logging in instead.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters long.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          errorMessage = error.message || 'An error occurred during signup.';
      }
      
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sign in with email and password
  const signInUser = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if email is verified
      if (!user.emailVerified) {
        await signOut(auth);
        return {
          success: false,
          error: 'Please verify your email before signing in. Check your inbox for a verification link.',
          needsVerification: true
        };
      }
      
      return {
        success: true,
        user: user
      };
    } catch (error) {
      console.error("❌ Firebase signin error:", error);
      let errorMessage = error.message;
      
      // Handle specific Firebase error codes
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid credentials. Please check your email and password.';
          break;
        default:
          errorMessage = error.message || 'An error occurred during sign in.';
      }
      
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Resend email verification
  const resendVerification = useCallback(async (user) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await sendEmailVerification(user, actionCodeSettings);
      return {
        success: true,
        message: 'Verification email sent! Please check your inbox.'
      };
    } catch (error) {
      setError(error.message);
      return {
        success: false,
        error: error.message
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sign out
  const signOutUser = useCallback(async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, []);

  return {
    createUser,
    signInUser,
    resendVerification,
    signOutUser,
    isLoading,
    error,
    setError
  };
};
