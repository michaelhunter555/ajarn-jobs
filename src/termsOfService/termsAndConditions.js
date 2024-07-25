import React from "react";

import { Box, Paper, Typography } from "@mui/material";

const termsAndConditions = [
  {
    title: "1. Introduction",
    content:
      "Welcome to Ajarn Jobs. By accessing or using our website, you agree to be bound by these Terms and Conditions ('Terms'). If you do not agree with these Terms, please do not use our website.",
  },
  {
    title: "2. Definitions",
    content: `"Teacher" refers to any individual or entity subscribing to access job listings and apply for jobs on Ajarn Jobs. "Employer" refers to any individual or entity paying to sponsor job listings on Ajarn Jobs. "We," "us," and "our" refer to Ajarn Jobs. "Services" refer to all features, functionalities, and content provided by Ajarn Jobs.`,
  },
  {
    title: "3. Eligibility",
    content:
      "By using our Services, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.",
  },
  {
    title: "4. User Accounts",
    content:
      "Teachers must create an account, add a resume item and cover letter to apply for job listings. Employers must create an account and purcahse credits in order to browse teachers. Both Teachers and Employers agree to provide accurate and complete information during the registration process. Users are responsible for maintaining the confidentiality of their account credentials.",
  },
  {
    title: "5. Credits Purchase",
    content:
      "Employers may create job listings for a fee purchased in credits. Job listings are live for a period of 20 days. Purchasing credits and terms will be outlined on our website. Credit purchases are non-refundable unless otherwise specified.",
  },
  {
    title: "6. Sponsored Job Listings",
    content:
      "Employers can use credits to feature job listings for a period of 20 days. Featured job listings will be prominently displayed throughout our website. Payments for featured job listings are non-refundable.",
  },
  {
    title: "7. Use of Services",
    content:
      "Teachers and Employers agree to use the Services only for lawful purposes. Teachers and Employers must not post or transmit any content that is illegal, harmful, or infringes on any third-party rights. We reserve the right to remove any content that violates these Terms. Furthermore, users who choose to post content claim 100% responsibility for the post regarding it's uniquness and freeness of infringing upon these terms.",
  },
  {
    title: "8. Intellectual Property",
    content:
      "All content, trademarks, and intellectual property on Ajarn Jobs are owned by Ajarn Jobs. Teachers and Employers may not use any content from Ajarn Jobs without prior written permission.",
  },
  {
    title: "9. Limitation of Liability",
    content:
      "Ajarn Jobs is not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our Services. We do not guarantee the accuracy, completeness, or timeliness of job listings.",
  },
  {
    title: "10. Indemnification",
    content:
      "Teachers and Employers agree to indemnify and hold Ajarn Jobs harmless from any claims, damages, or expenses arising from their use of the Services or violation of these Terms.",
  },
  {
    title: "11. Termination",
    content:
      "We reserve the right to terminate or suspend access to our Services at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users. Teachers and Employers can terminate their accounts at any time by contacting us.",
  },
  {
    title: "12. Changes to Terms",
    content:
      "We may update these Terms from time to time. Teachers and Employers will be notified of any significant changes. Continued use of our Services after changes to the Terms constitutes acceptance of the new Terms.",
  },
  {
    title: "13. Governing Law",
    content:
      "These Terms are governed by and construed in accordance with the laws of the United States of America and Thailand, without regard to its conflict of law principles.",
  },
  {
    title: "14. Contact Information",
    content:
      "For any questions or concerns regarding these Terms, please contact us at support@ajarnjobs.com.",
  },
];

const TermsAndConditions = () => (
  <Box
    component={Paper}
    sx={{ padding: "2rem", borderRadius: 10, marginBottom: 5 }}
  >
    <Typography variant="h2" color="text.secondary">
      Terms and Conditions
    </Typography>
    {termsAndConditions.map((section, index) => (
      <Box key={index} mb={3}>
        <Typography variant="h6" gutterBottom>
          {section.title}
        </Typography>
        <Typography variant="body1">{section.content}</Typography>
      </Box>
    ))}
  </Box>
);

export default TermsAndConditions;
