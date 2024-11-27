import { cPalette, oPalette } from "../palettes";

export const MuiFormControlLabel = () => ({
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        ".MuiFormControlLabel-label": {
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "18px",
          lineHeight: "24px",
        },
      },
    },
    variants: [],
  },
});

export const cMuiFormControlLabel = MuiFormControlLabel(cPalette);
export const oMuiFormControlLabel = MuiFormControlLabel(oPalette);
