import { cPalette, oPalette } from "../palettes";
import { typography } from "../typography/index";

const MuiTypography = (palette) => ({
  MuiTypography: {
    styleOverrides: {
      root: {
        textDecoration: "none!important",
      },
    },
    variants: [
      {
        props: { color: "gradient" },
        style: {
          background: palette.gradient.main,
          backgroundClip: "text",
          textFillColor: "transparent",
        },
      },
      {
        props: { color: "highlighted" },
        style: {
          background: palette.text.highlighted,
          backgroundClip: "text",
          textFillColor: "transparent",
        },
      },
      {
        props: { variant: "label" },
        style: {
          alignItems: "center",
          borderRadius: 999,
          display: "inline-flex",
          fontSize: 12,
          justifyContent: "center",
          lineHeight: "1em",
          padding: "4px 12px 3px",
          whiteSpace: "nowrap",
          maxHeight: 24,
          ...typography.caption,
          fontWeight: 600,
        },
      },
      {
        props: { variant: "label", color: "lightWarning" },
        style: {
          backgroundColor: palette.warning.baby,
          color: palette.warning.dark,
        },
      },
      {
        props: { variant: "label", color: "lightError" },
        style: {
          backgroundColor: "pink",
          color: palette.error.dark,
        },
      },
      {
        props: { variant: "label", color: "lightSuccess" },
        style: {
          backgroundColor: palette.success.baby,
          color: palette.success.dark,
        },
      },
      {
        props: { variant: "label", color: "lightInfo" },
        style: {
          backgroundColor: palette.info.baby,
          color: palette.info.dark,
        },
      },
      {
        props: { variant: "label", color: "lightDisabled" },
        style: {
          backgroundColor: palette.action.disabled,
          color: palette.text.primary,
        },
      },
    ],
  },
});

export const cMuiTypography = MuiTypography(cPalette);
export const oMuiTypography = MuiTypography(oPalette);
