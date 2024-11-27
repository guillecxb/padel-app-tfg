import { styled } from "@mui/material";

const SimpleLineAngled = styled("div")((props) => ({
  width: props.width,
  height: 1,
  color: "blue",
  paddingTop: 30,
  borderBottom: `1px ${props.dashed ? "dashed" : "solid"} ${props.backgroundColor}`,
  borderLeft: `1px ${props.dashed ? "dashed" : "solid"} ${props.backgroundColor}`,
  marginLeft: 3,
  borderRadius: 5,

  position: "relative",
  "&:before": {
    left: -5,
    content: '""',
    position: "absolute",
    top: -3,
    height: 10,
    width: 10,
    backgroundColor: props.backgroundColor,
    borderRadius: "50%",
    display: "inline-block",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    top: 25,
    right: 0,
    height: 10,
    width: 10,
    backgroundColor: props.backgroundColor,
    borderRadius: "50%",
    display: "inline-block",
  },
}));

export default SimpleLineAngled;
