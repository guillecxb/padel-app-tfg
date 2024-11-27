import { cPalette, oPalette } from "../palettes";

export const MuiDivider = (palette) => ({
  MuiDivider: {
    styleOverrides: {
      root: {},
    },

    variants: [
      {
        props: { orientation: "vertical", color: "gradient" },
        style: {
          border: "1px solid",
          borderImageSlice: 1,
          borderColor: "transparent",
          borderImageSource: palette.gradientVertical.main,
        },
      },
      {
        props: { orientation: "horizontal", color: "gradient" },
        style: {
          border: "1px solid",
          borderImageSlice: 1,
          borderColor: "transparent",
          borderImageSource: palette.gradient.main,
        },
      },
    ],
  },
});

export const cMuiDivider = MuiDivider(cPalette);
export const oMuiDivider = MuiDivider(oPalette);
