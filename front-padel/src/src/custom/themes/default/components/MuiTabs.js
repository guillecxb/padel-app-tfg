import { cPalette, oPalette } from "../palettes";

export const MuiTabs = (palette) => ({
  MuiTabs: {
    styleOverrides: {
      root: {
        ".MuiTabs-indicator": {
          height: "2px",
          backgroundColor: palette.gradient.main,
        },
      },
    },
  },
});

export const cMuiTabs = MuiTabs(cPalette);
export const oMuiTabs = MuiTabs(oPalette);
