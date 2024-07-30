import React, { useContext, useState } from "react";

import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { AuthContext } from "../shared/context/auth-context";
import { useFeedback } from "../shared/hooks/feedback-hook";

const FeedbackBox = () => {
  const auth = useContext(AuthContext);
  const { postFeedback, isPostLoading } = useFeedback();
  const [success, setSuccess] = useState("");

  const handleFeedbackResponse = async (feedback) => {
    const feedbackPost = {
      user: auth?.user?._id,
      feedbackType: "Employer Guide",
      feedback: feedback,
    };
    if (auth?.user?._id && auth?.isLoggedIn) {
      const messge = await postFeedback(auth?.user?._id, feedbackPost);
      setSuccess(messge);
    }
  };

  return (
    <Paper sx={{ padding: 2, maxWidth: "50%", margin: "0 auto" }}>
      <Stack>
        <Stack>
          <Typography varint="h6" color="text.secondary">
            Was this information helpful?
          </Typography>
        </Stack>
        <Divider />
        {success && !isPostLoading ? (
          <Typography variant="subtitle2" color="text.secondary">
            {success}
          </Typography>
        ) : (
          ""
        )}
        {!isPostLoading && !success && (
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Button
              onClick={() => handleFeedbackResponse("bad")}
              startIcon={<ThumbDownIcon />}
              color="error"
            >
              NO
            </Button>
            <Button
              onClick={() => handleFeedbackResponse("good")}
              endIcon={<ThumbUpAltIcon />}
              color="success"
            >
              Yes
            </Button>
          </Stack>
        )}
        {isPostLoading && <CircularProgress />}
      </Stack>
    </Paper>
  );
};

export default FeedbackBox;
