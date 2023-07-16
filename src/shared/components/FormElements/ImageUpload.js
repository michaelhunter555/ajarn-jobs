import React, { useContext, useEffect, useRef, useState } from "react";

import { Box, Button, styled } from "@mui/material";

import { AuthContext } from "../../context/auth-context";

const StyledImageUpload = styled(Box)({
  width: "13rem",
  height: "13rem",
  border: "1px solid #ccc",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  marginBottom: "1rem",
  flexDirection: "column",
  position: "relative",
  "& img": {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    position: "absolute",
  },
});

const ImageUpload = (props) => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const [file, setFile] = useState();
  const [filePreviewUrl, setFilePreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  const authHasImage = user?.image !== "" && user?.image.includes("uploads\\");

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setFilePreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file, authHasImage, auth.user?.image]);

  const userChoseImageHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setFile(null);
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const chooseImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <Box sx={props.sx}>
      <input
        ref={filePickerRef}
        type="file"
        id={props.id}
        accept=".jpg,.png,.jpeg"
        onChange={userChoseImageHandler}
        style={{ display: "none" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledImageUpload>
            {filePreviewUrl && <img src={filePreviewUrl} alt="preview" />}
            {!filePreviewUrl && auth.isLoggedIn && authHasImage && (
              <img
                src={`${process.env.REACT_APP_IMAGE}${auth.user?.image}`}
                alt="preview"
              />
            )}
            {!filePreviewUrl && <p>{props.text || "Please add an image"}</p>}
          </StyledImageUpload>
        </Box>
        <Button variant="outlined" type="button" onClick={chooseImageHandler}>
          Pick Image
        </Button>
      </Box>
      {!isValid && props.errorText}
    </Box>
  );
};

export default ImageUpload;
