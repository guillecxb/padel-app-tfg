import { cPalette, oPalette } from "../palettes";

const MuiButton = (palette) => ({
  MuiIconButton: {
    styleOverrides: {
      root: {},
    },
    variants: [
      {
        props: { variant: "contrast" },
        style: {
          border: `1px solid ${palette.borders.border}`,
          background: palette.background.default,
        },
      },
    ],
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "35px",
        textTransform: "none",
        ".MuiSvgIcon-root": {
          width: 24,
          height: 24,
        },
      },
    },
    variants: [
      {
        props: { variant: "contained", color: "primary" },
        style: {
          color: "white!important",
          background: palette.gradient.main,

          "&:disabled": {
            opacity: 0.5,
          },
        },
      },
      {
        props: { variant: "outlined", color: "primary", behaviour: "menu" },
        style: {
          paddingTop: "10px",
          paddingBottom: "10px",
        },
      },
      {
        props: { size: "large" },
        style: {
          height: "48px",
          minWidth: 137,
        },
      },
      {
        props: { variant: "outlined", color: "primary" },
        style: {
          border: "none",
          outline: "none",
          position: "relative",
          background: palette.gradient.main,
          zIndex: 1,

          "&::before": {
            content: "''",
            position: "absolute",
            top: "2px",
            right: "2px",
            bottom: "2px",
            left: "2px",
            backgroundColor: palette.background.paper,
            borderRadius: "33px",
            zIndex: -1,
          },

          "&:hover": {
            boxShadow: 0,
            transform: "none",
            border: "none",
          },

          "&:hover:before": {
            backgroundColor: palette.hover.main,
            top: "2px",
            right: "2px",
            bottom: "2px",
            left: "2px",
          },

          "&:disabled": {
            opacity: 0.5,
            background: palette.action.disabled,
          },
        },
      },
      {
        props: { variant: "outlined", color: "secondary" },
        style: {
          border: "none",
          outline: "none",
          position: "relative",
          background: palette.gradient.main,
          zIndex: 1,

          "&::before": {
            content: "''",
            position: "absolute",
            top: "2px",
            right: "2px",
            bottom: "2px",
            left: "2px",
            backgroundColor: palette.background.paper,
            borderRadius: "33px",
            zIndex: -1,
          },

          "&:hover": {
            boxShadow: 0,
            transform: "none",
            border: "none",
          },

          "&:hover:before": {
            backgroundColor: palette.hover.inverse,
            top: "2px",
            right: "2px",
            bottom: "2px",
            left: "2px",
          },

          "&:disabled": {
            opacity: 0.5,
            background: palette.action.disabled,
          },
        },
      },
      {
        props: { variant: "outlined", color: "secondary", mode: "open" },
        style: {
          "&:hover:before": {
            backgroundColor: palette.hover.inverse,
          },
          "&::before": {
            backgroundColor: palette.hover.inverse,
          },
        },
      },
    ],
  },
});

export const cMuiButton = MuiButton(cPalette);
export const oMuiButton = MuiButton(oPalette);
