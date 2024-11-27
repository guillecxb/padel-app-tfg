import { styled } from "@mui/material";

const SimpleLineStyled = styled("div")((props) => ({
  width: props.width,
  height: 1,
  color: "blue",
  borderTop: `1px ${props.dashed ? "dashed" : "solid"} ${props.backgroundColor}`,

  position: "relative",
  "&:before": {
    left: 0,
    content: '""',
    position: "absolute",
    top: -5,
    height: 10,
    width: 10,
    backgroundColor: props.backgroundColor,
    borderRadius: "50%",
    display: "inline-block",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    top: -5,
    right: 0,
    height: 10,
    width: 10,
    backgroundColor: props.backgroundColor,
    borderRadius: "50%",
    display: "inline-block",
  },
}));

export default SimpleLineStyled;
