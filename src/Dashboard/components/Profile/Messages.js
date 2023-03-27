import React, { useState } from "react";

import {
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledMessageList = styled(List)(({ theme }) => ({
  maxHeight: "70vh",
  overflowY: "auto",
}));

const conversations = [
  { id: 1, name: "Robert", messages: ["Hello", "How are you?"] },
  {
    id: 2,
    name: "Tihtiphorn",
    messages: ["Hello, we would like to learn more, please contact us at ..."],
  },
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );

  const handleMessageClick = (index) => {
    setSelectedConversation(conversations[index]);
  };

  return (
    <Grid
      container
      sx={{
        margin: "1rem auto",
        border: "1px solid #e5e5e5",
        borderRadius: "6px",
      }}
    >
      <Grid item xs={4}>
        <StyledMessageList>
          {conversations.map((conversation, i) => (
            <div key={conversation.id}>
              <ListItemButton onClick={() => handleMessageClick(i)}>
                <ListItemText primary={conversation.name} />
              </ListItemButton>
              <Divider />
            </div>
          ))}
        </StyledMessageList>
      </Grid>
      <Grid item xs={8}>
        {selectedConversation && (
          <Card>
            <CardContent>
              <Typography variant="h6">{selectedConversation.name}</Typography>
              {selectedConversation.messages.map((message, i) => (
                <Typography key={i}>{message}</Typography>
              ))}
              <TextField variant="outlined" label="response" />
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
};

export default Messages;
