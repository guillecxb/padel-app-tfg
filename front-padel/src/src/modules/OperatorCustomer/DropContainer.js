import { styled, alpha } from "@mui/material";

const DropContainer = styled("div")(({ theme, isOver }) => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: isOver ? alpha(theme.palette.primary.main, 0.4) : "transparent",
    zIndex: isOver ? 100 : "auto",
    border: `3px dashed ${isOver ? theme.palette.primary.main : "transparent"}`,
    borderRadius: 20,
  };
});

export default DropContainer;
