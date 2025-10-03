import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { TextField,  Box, Chip, Typography, Stack, CircularProgress } from "@mui/material";
import { useForm } from "../../hooks/form-hook";
import { AuthContext } from "../../context/auth-context";
import SendIcon from '@mui/icons-material/Send';
import { useHttpClient } from "../../hooks/http-hook";

const fieldColors = {
        '& .MuiInputBase-input': { color: 'white' }, // enabled
        '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: 'white' }, // disabled
        // optional: label/placeholder
        '& .MuiInputLabel-root': { color: 'white' },
        '& .MuiInputLabel-root.Mui-disabled': { color: 'white' },
        '& .MuiInputBase-input::placeholder': { color: 'white', opacity: 1 },
};

const Contact = () => {
    const auth = useContext(AuthContext);
    const [formState, inputHandler, setFormData] = useForm(
        {
            name: {
                value: auth?.user?.name,
                isValid: true,
            },
            userId: {
                value: auth?.user?.id,
                isValid: true,
            },
            email: {
                value: auth?.user?.email,
                isValid: true,
            },
            message: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    const [messageSent, setMessageSent] = useState(false);
    const { sendRequest } = useHttpClient();

    const sendSupportEmail = async () => {
        try {
            const response = await sendRequest(
                `${process.env.REACT_APP_USERS}/support-email`,
                "POST",
                JSON.stringify({ 
                    message: formState.inputs.message.value,
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    userId: formState.inputs.userId.value
                }),
                {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token,
                }
            );

            if(response.ok) {
                setFormData({
                    name: {
                        value: auth?.user?.name,
                        isValid: true,
                    },
                    userId: {
                        value: auth?.user?.id,
                        isValid: true,
                    },
                    email: {
                        value: auth?.user?.email,
                        isValid: true,
                    },
                    message: {
                        value: "",
                        isValid: false,
                    },
                },
                false)
                setMessageSent(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const supportEmail = useMutation({
        mutationKey: ["support-email"],
        mutationFn: async () => {
            return await sendSupportEmail();
        },
    });

    const sendMessage = () => {
        const { message } = formState.inputs;
        if(formState.isValid && message.value.length >= 10) {
            supportEmail.mutate();
        }
    }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">{messageSent ? "Message Sent - Thank You! We will get back to you as soon as possible." : "Contact"}</Typography>
   {!messageSent && <>  
   <TextField
      sx={fieldColors}
      disabled
      id="name"
        label="Name"
        value={formState.inputs.name.value}
      
      />

      <TextField
      sx={fieldColors}
      fullWidth
        disabled
        id="email"
        label="Email"
        value={formState.inputs.email.value}
       
      />
     
      <TextField
      fullWidth
      sx={fieldColors}
      multiline
      rows={5}
        id="message"
        label="Message"
        value={formState.inputs.message.value}
        onChange={(event) => inputHandler("message", event.target.value, event.target.value.trim().length > 10)}
        //error={!formState.inputs.message.isValid}
      />
      <Stack direction="row" justifyContent="flex-end">

       <Chip
       color="primary"
       onDelete={() => console.log("send message")}
       onClick={sendMessage}
       deleteIcon={supportEmail.isPending ? <CircularProgress size={20} /> : <SendIcon />}    
       disabled={!formState.inputs.message.isValid || supportEmail.isPending}
        component="button"
        clickable
        label="Send Message"
      />
      </Stack>
      </>}
    </Box>
  );
};

export default Contact;