import { colors, alpha } from "@mui/material";

export const defaultPalette = {
  success: {
    dark: "#388e3c",
    main: "#4caf50",
    light: "#81c784",
    lighter: "#C8E6C9",
    baby: "#e8f5e9",
    contrastText: colors.common.white,
  },
  info: {
    dark: "#0288d1",
    main: "#03a9f4",
    light: "#4fc3f7",
    lighter: "#b3e5fc",
    baby: "#e1f5fe",
    contrastText: colors.common.white,
  },
  warning: {
    dark: "#ffa000",
    main: "#ffc107",
    light: "#ffd54f",
    lighter: "#ffecb3",
    baby: "#fff8e1",
    contrastText: colors.common.white,
  },
  error: {
    dark: "#d32f2f",
    main: "#f44336",
    light: "#e57373",
    lighter: "#ffcdd2",
    baby: "#ffebee",
    contrastText: colors.common.white,
  },
  purple: {
    dark: "#512da8",
    main: "#673ab7",
    light: "#9575cd",
    lighter: "#d1c4e9",
    baby: "#ede7f6",
    contrastText: colors.common.white,
  },
  gradient: {
    main: "linear-gradient(to right, #0066FF, #59C2C9)",
    light: "linear-gradient(to right, #0066FF, #59C2C9 50%)",
  },
  gradientVertical: {
    main: "linear-gradient(to top, #0066FF, #59C2C9)",
    light: "linear-gradient(to top, #0066FF, #59C2C9 50%)",
  },
  action: {
    disabled: alpha("#031A34", 0.24),
    focus: "rgba(3, 26, 52, 0.16)",
    selected: "rgba(0, 102, 255, 0.16)",
  },
  common: {
    white: colors.common.white,
    black: colors.common.black,
  },
  transparent: {
    main: "transparent",
  },
  avatar: {
    main: "linear-gradient(99.09deg, rgba(0, 102, 255, 0.1) 0%, rgba(89, 194, 201, 0.1) 100%), #FFFFFF",
  },
  icon: {
    main: "url(#gradient-main)",
    dark: "url(#gradient-dark)",
    light: "#F2F4FF",
  },
  urlGradients: {
    main: [
      { color: "#0066FF", percentage: "0%" },
      { color: "#59C2C9", percentage: "100%" },
    ],
    dark: [
      { color: "#0066FF", percentage: "0%" },
      { color: "#00BCD4", percentage: "100%" },
    ],
  },
  network: {
    site: {
      from: "#e8efff",
      to: "#eff9f9",
      icon: "#0066FF",
    },
    nodeLabel: {
      background: "#F2F4FF",
      color: "#031A34",
    },
    iconGradient: {
      from: "#0066FF",
      to: "#59C2C9",
    },
  },
};
