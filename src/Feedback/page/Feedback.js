import React, { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import BugReportIcon from "@mui/icons-material/BugReport";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import FlagIcon from "@mui/icons-material/Flag";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Alert, Grid, Stack, Typography } from "@mui/material";

import Footer, {
  Content,
  PageContainer,
} from "../../shared/components/UIElements/Footer";
import { AuthContext } from "../../shared/context/auth-context";
import { useThemeToggle } from "../../shared/context/theme-context";
import { useFeedback } from "../../shared/hooks/feedback-hook";
import { useForm } from "../../shared/hooks/form-hook";
import FeedbackCards from "../components/FeedbackCards";
import FeedbackForm from "../components/FeedbackForm";
import PreExplanationText from "../components/PreExplanationText";

const reasons = [
  {
    reason: "General Question",
    component: "question",
    subText: "What's on your mind?",
    icon: <HelpOutlineIcon />,
    query: "",
  },
  {
    reason: "Report a Bug",
    subText: "site flaws",
    component: "bug",
    icon: <BugReportIcon />,
    query: "bug",
  },
  {
    reason: "Site Suggestion",
    subText: "site improvements",
    component: "suggestion",
    icon: <EmojiObjectsIcon />,
    query: "suggestion",
  },
  {
    reason: "Report a Violation",
    subText: "Term Violations",
    component: "violation",
    icon: <FlagIcon />,
    query: "violation",
  },
];

const Feedback = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryValue = queryParams.get("reason");
  const { isDarkMode } = useThemeToggle();
  const [feedbackIndex, setFeedbackIndex] = useState(0);
  const { postFeedback, isPostLoading, error, clearError } = useFeedback();
  const [formState, inputHandler, setFormData] = useForm(
    {
      feedbackReason: {
        value: reasons[feedbackIndex].reason,
        isValid: true,
      },
      feedbackText: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    if (formState?.isValid) {
      setFormData(
        {
          feedbackReason: {
            value: formState?.inputs?.feedbackReason?.value,
            isValid: true,
          },
          feedbackText: {
            value: formState?.inputs?.feedbackText?.value,
            isValid: true,
          },
        },
        true
      );
    }
  }, [
    formState?.isValid,
    setFormData,
    formState?.inputs?.feedbackReason?.value,
    formState?.inputs?.feedbackText?.value,
  ]);

  //used for display
  const handleFeedbackIndex = (i) => {
    setFeedbackIndex(i);
  };

  const handleSubmitFeedback = async (feedback) => {
    //await submitFeedback(feedback)
  };

  return (
    <PageContainer>
      <Content sx={{ alignItems: "center", marginBottom: "2rem" }}>
        <Grid
          container
          direction="column"
          spacing={4}
          sx={{ width: { xs: "100%", md: "50%" } }}
        >
          <Grid item xs={12} md={6}>
            <FeedbackCards
              reasons={reasons}
              isDarkMode={isDarkMode}
              onCardClick={(i) => handleFeedbackIndex(i)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PreExplanationText component={reasons[feedbackIndex].component} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1} sx={{ marginBottom: "2rem" }}>
              <Typography variant="subtitle2" color="text.secondary">
                userId:{" "}
                {auth?.user?._id
                  ?.split("")
                  .map((num, i) => (i > 5 ? "*" : num))}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Name: {auth?.user?.name ?? auth?.user?.creator?.company}
              </Typography>
            </Stack>
            {!auth?.isLoggedIn && (
              <Alert severity="info">
                You Must be Logged in to send feedback
              </Alert>
            )}
            <FeedbackForm
              formState={formState}
              inputHandler={inputHandler}
              auth={auth}
              onSubmitFeedback={(feedback) => handleSubmitFeedback(feedback)}
            />
          </Grid>
        </Grid>
      </Content>
      <Footer />
    </PageContainer>
  );
};

export default Feedback;
