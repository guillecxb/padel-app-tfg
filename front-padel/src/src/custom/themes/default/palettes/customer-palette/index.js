import { alpha, colors } from "@mui/material";

export const palette = {
  primary: {
    dark: "#0066FF",
    main: "#0356C9",
    light: "#F2F4FF",
    contrastText: colors.common.white,
  },
  secondary: {
    dark: "#59C2C9",
    main: "#3E888D",
    light: "#EEF9FA",
    contrastText: colors.common.black,
  },
  background: {
    default: "#FEFBFF",
    paper: "#FEFEFF",
    primary: "#F2F4FF",
    secondaryContainer: "#FFFBFE",
    alternative: "#F2F4FF",
    overlay: alpha("#58617A", 0.8),
    loadingBar: "#80B3FF",
    menu: "linear-gradient(99.09deg, rgba(0, 102, 255, 0.1) 0%, rgba(254, 254, 255, 0.1) 50%, rgba(89, 194, 201, 0.1) 100%)",
  },
  text: {
    primary: "#031A34",
    secondary: "#6E7894",
    primaryInverse: "#F2F4FF",
    secondaryInverse: "#E5F0FF",
    highlighted: "linear-gradient(to right, #0066FF, #59C2C9)", // gradiant.main
  },
  borders: {
    border: "#D1D5E4",
    borderHigh: "#6E7894",
    borderLow: "#F2F4FF",
    borderSelected: "#0066FF",
    divider: "#D1D5E4",
    dividerLight: "#D1D5E4",
  },
  hover: {
    main: "#E5F0FF",
    inverse: "#E5F0FF",
  },
};
