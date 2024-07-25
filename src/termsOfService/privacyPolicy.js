import React from "react";

import { Box, Paper, Typography } from "@mui/material";

const privacyPolicyContent = [
  {
    title: "1. Introduction",
    content: `Welcome to Ajarn Jobs, operated by AjarnJobs.com ("we", "us", or "our"). 
    We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. 
    This Privacy Policy outlines how we collect, use, and protect your information when you use our website and services.`,
  },
  {
    title: "2. Information We Collect",
    content: `
      Personal Information: When you create an account, apply for a job, or contact us, we keep a record of personal information such as your name, email address, and other relevant information.
      Usage Data: We collect information about your interactions with our website, such as IP address, browser type, pages visited, purchases (if any), and the time and date of your visit.
    `,
  },
  {
    title: "3. How We Use Your Information",
    content: `
      To Provide and Improve Our Services: We use this information to operate and maintain our website, process job applications, communicate with you, and improve our services.
      To Personalize Your Experience: We use your information to personalize your experience on our website and deliver content and job listings that may interest you.
      To Communicate with You: We use your information to send you updates, marketing communications, and other information that may be of interest to you.
      For Security and Fraud Prevention: We use your information to protect our website, detect and prevent fraud, and ensure the security of our services.
    `,
  },
  {
    title: "4. How We Share Your Information",
    content: `
      With Employers: When you apply for a job, your application details are shared with the relevant employer.
      For Legal Reasons: We may disclose your information if required to do so by law or in response to valid requests by public authorities.
      Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred to the acquiring entity.
    `,
  },
  {
    title: "5. Your Choices and Rights",
    content: `
      Access and Update Your Information: You can access and update your account information at any time by logging into your account.
      Opt-Out of Marketing Communications: You can opt-out of receiving marketing communications from us by following the unsubscribe instructions included in our emails or by contacting us directly.
    `,
  },
  {
    title: "6. Security",
    content: `
      We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. 
      However, no internet-based service can be 100% secure, so we cannot guarantee absolute security. When you log in
      a token associated with your successful login is created and stored in your browser. If your computer is not currently compromised, this makes it extremely difficult for
      anyone else to perform actions on your account without it being you who is currently logged in. This of course does not stop someone who has your password from creating a valid session.
      Passwords are also hashed and stored on our database, so only you know your real password. It is highly suggested that passwords be at least 8 characters to increase the difficulty of having their password compromised.
    `,
  },
  {
    title: "7. Children's Privacy",
    content: `
      Our services are not intended for individuals under the age of 18. 
      We do not knowingly collect personal information from children under 18. 
      If you become aware that a child has provided us with personal information, please contact us, and we will take steps to remove such information.
    `,
  },
  {
    title: "8. Changes to This Privacy Policy",
    content: `
      We may update this Privacy Policy from time to time. 
      We will notify you of any significant changes by posting the new Privacy Policy on our website and updating the effective date. 
      Your continued use of our services after the changes become effective constitutes your acceptance of the new Privacy Policy.
    `,
  },
  {
    title: "9. Contact Us",
    content: `
      If you have any questions or concerns about this Privacy Policy, please contact us at support@ajarnjobs.com.
    `,
  },
];

const PrivacyPolicy = () => (
  <Box sx={{ padding: 4, borderRadius: 10, marginBottom: 5 }} component={Paper}>
    <Typography variant="h4" gutterBottom>
      Privacy Policy
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      Effective Date: Aug 1st, 2024
    </Typography>
    {privacyPolicyContent.map((section, index) => (
      <Box key={index} mb={3}>
        <Typography variant="h6" gutterBottom>
          {section.title}
        </Typography>
        <Typography variant="body1">{section.content}</Typography>
      </Box>
    ))}
  </Box>
);

export default PrivacyPolicy;
