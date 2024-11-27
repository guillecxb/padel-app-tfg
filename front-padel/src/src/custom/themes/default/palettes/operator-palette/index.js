import { colors, alpha } from "@mui/material";

export const palette = {
  primary: {
    dark: "#58617A",
    main: "#0066FF",
    light: "#191919",
    contrastText: colors.common.white,
  },
  secondary: {
    dark: "#59C2C9",
    main: "#3E888D",
    light: "#252525",
    contrastText: colors.common.black,
  },
  background: {
    default: "#191919",
    primary: "#FFFFFF1A",
    paper: "#2D3039",
    secondaryContainer: "#343640",
    alternative: "#23262F",
    overlay: alpha("#242424", 0.8),
    loadingBar: "#80B3FF",
    menu: "linear-gradient(111.34deg, rgba(0, 102, 255, 0.3) 0%, rgba(25, 25, 25, 0.3) 52.6%, rgba(89, 194, 201, 0.3) 100%), #191919",
  },
  text: {
    primary: "#F2F4FF",
    secondary: "#D1D5E4",
    primaryInverse: "#F2F4FF",
    secondaryInverse: "#D1D5E4",
    highlighted: "linear-gradient(to right, #0066FF, #59C2C9 50%)", // gradient.light
  },
  avatar: {
    main: "linear-gradient(99.09deg, rgba(0, 102, 255, 0.5) 0%, rgba(89, 194, 201, 0.5) 100%), #FFFFFF",
  },
  borders: {
    border: "#242424",
    borderHigh: "#6E7894",
    borderLow: "#F2F4FF",
    borderSelected: "#0066FF",
    divider: "#D1D5E4",
    dividerLight: "rgba(209, 213, 228, 0.5)",
  },
  hover: {
    main: "#5E616C",
    inverse: "#D1D5E4",
  },
  action: {
    disabled: "#3E4049",
    focus: "rgba(3, 26, 52, 0.16)",
    selected: "rgba(0, 102, 255, 0.16)",
  },
  network: {
    badgeBorder: "#191919",
    site: {
      from: "#8cb2ff",
      to: "#b0e0e4",
      icon: "#0066FF",
    },
    nodeLabel: {
      background: "rgb(66, 69, 77)",
      color: "#F2F4FF",
    },
    iconGradient: {
      from: "#0066FF",
      to: "#59C2C9",
    },
  },
};
