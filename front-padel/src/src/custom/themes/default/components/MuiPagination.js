import { cPalette, oPalette } from "../palettes";

export const MuiPagination = () => ({
  MuiPagination: {
    styleOverrides: {
      root: {},
      ul: {
        "& button": {
          fontSize: 14,
        },
      },
    },

    variants: [],
  },
});

export const cMuiPagination = MuiPagination(cPalette);
export const oMuiPagination = MuiPagination(oPalette);
