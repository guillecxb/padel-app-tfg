import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";

import { Badge, Button, IconButton, Stack, Typography } from "@mui/material";

import { ImageManager } from "components/molecules/image-manager";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useOperatorCustomerTranslation } from "translations";

import DropContainer from "./DropContainer";

const CustomerAvatarManager = forwardRef(({}, ref) => {
  const inputRef = useRef(null);
  const t = useOperatorCustomerTranslation();

  const [file, setFile] = useState();
  const [isDragEnter, setDragEnter] = useState(false);

  const handleFileSelector = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const fileObject = event.target.files && event.target.files[0];
    if (!fileObject) {
      return;
    }

    setFile(fileObject);
    event.target.value = null;
  };

  const handleFileRemove = () => setFile(null);

  const imagePreview = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);

  const hasImage = useMemo(() => Boolean(imagePreview), [imagePreview]);

  const handleDragEnter = (ev) => {
    ev.preventDefault();
    setDragEnter(true);
  };
  const handleDragLeave = (ev) => {
    ev.preventDefault();
    setDragEnter(false);
  };

  const parseDroppedFiles = (files, asFile = false) => {
    const parsedFiles = files.filter((item) => item.type.startsWith("image/"));

    if (parsedFiles.length) {
      const fileObject = asFile ? parsedFiles[0].getAsFile() : parsedFiles[0];
      setFile(fileObject);
    }
  };

  const dropHandler = (ev) => {
    ev.preventDefault();
    setDragEnter(false);

    if (!ev.dataTransfer.items) {
      parseDroppedFiles([...ev.dataTransfer.items], true);
    } else {
      parseDroppedFiles([...ev.dataTransfer.files]);
    }
  };

  const dragOverHandler = (ev) => {
    ev.preventDefault();
  };

  useImperativeHandle(
    ref,
    () => ({
      file,
    }),
    [file]
  );

  return (
    <Stack alignItems="center" spacing={1.5} sx={{ position: "relative" }}>
      <DropContainer
        isOver={isDragEnter}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
      />
      <Badge
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          hasImage ? (
            <IconButton onClick={handleFileRemove} size="small">
              <MuisticaIcon color="text.primary" variant="filled">
                trash-can
              </MuisticaIcon>
            </IconButton>
          ) : undefined
        }
        overlap="circular"
      >
        <ImageManager defaultSrc={"user-account"} src={imagePreview} />
        <input
          accept="image/*"
          onChange={handleFileChange}
          ref={inputRef}
          style={{ display: "none" }}
          type="file"
        />
      </Badge>
      <Button
        color="primary"
        endIcon={
          <MuisticaIcon color="icon.main" variant="filled">
            cloud-upload
          </MuisticaIcon>
        }
        onClick={handleFileSelector}
        variant="outlined"
      >
        <Typography color="gradient" variant="caption2">
          {t("upload")}
        </Typography>
      </Button>
    </Stack>
  );
});

CustomerAvatarManager.displayName = "CustomerAvatarManager";
export default CustomerAvatarManager;
