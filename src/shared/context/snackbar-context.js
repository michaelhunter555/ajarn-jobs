// SnackbarContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert, Avatar, Button, Box, Typography } from "@mui/material";
// type SnackbarOptions = {
//   message: string;
//   severity?: AlertColor;
// };

// type SnackbarContextType = {
//   showSnackbar: (options: SnackbarOptions) => void;
// };

const SnackbarContext = createContext(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [path, setPath] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const showSnackbar = ({ message, severity = "info", path, image, name }) => {
    setMessage(message);
    setSeverity(severity);
    setPath(path || "");
    setImage(image || "");
    setName(name || "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleView = () => {
    handleClose();
    if (path) {
      window.location.href = path;
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {/* Global Snackbar */}
      <Snackbar
  open={open}
  autoHideDuration={4000}
  onClose={handleClose}
  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
>
  <Alert
    onClose={handleClose}
    severity={severity}
    icon={false}
    sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1.5, borderRadius: 5 }}
    action={
      path ? (
        <Button size="small" color="inherit" onClick={handleView}>
          View
        </Button>
      ) : (
        <Button size="small" color="inherit" onClick={handleClose}>
          Close
        </Button>
      )
    }
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {image ? <Avatar src={image} alt={name} sx={{ width: 40, height: 40 }} /> : null}
      <Box>
        {name ? <Typography variant="caption" sx={{ display: "block", opacity: 0.9 }}>{name}</Typography> : null}
        <Typography variant="body2">{message}</Typography>
      </Box>
    </Box>
  </Alert>
</Snackbar>
    </SnackbarContext.Provider>
  );
};