import React, { useEffect, useRef, useState } from "react";

import { Box, Button, CardMedia } from "@mui/material";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [filePreviewUrl, setFilePreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setFilePreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const userChoseImageHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const chooseImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <Box>
      <input
        ref={filePickerRef}
        type="file"
        id={props.id}
        accept=".jpg,.png,.jpeg"
        onChange={userChoseImageHandler}
      />
      <Box>
        <Box sx={{ center: props.center }}>
          {filePreviewUrl && (
            <CardMedia src={filePreviewUrl} alt="image-preview" />
          )}
          {!filePreviewUrl && <p>Please add an image</p>}
        </Box>
        <Button type="button" onClick={chooseImageHandler}>
          Pick Image
        </Button>
      </Box>
      {!isValid && props.errorText}
    </Box>
  );
};

export default ImageUpload;
