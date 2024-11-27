import { cPalette, oPalette } from "../palettes";

export const MuiDialog = (palette) => ({
  MuiDialog: {
    styleOverrides: {
      root: {
        ".MuiDialog-paperWidthXs": {},
        ".MuiDialog-paperWidthSm": {
          maxWidth: 680,
        },
        ".MuiDialog-paperWidthLg": {},
      },
    },

    variants: [],
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        marginLeft: 40,
        marginRight: 40,
        paddingLeft: 0,
      },
      dividers: {
        border: "1px solid",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
        borderImageSlice: 1,
        borderColor: "transparent",
        borderImageSource: palette.gradient.main,
      },
    },
  },
});

export const cMuiDialog = MuiDialog(cPalette);
export const oMuiDialog = MuiDialog(oPalette);
