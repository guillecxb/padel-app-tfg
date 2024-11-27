import { cPalette, oPalette } from "../palettes";

export const MuiPaper = (palette) => ({
  MuiPaper: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        borderRadius: "16px",
        ...(ownerState.disabled && {
          opacity: "0.5 !important",
        }),
      }),
    },

    variants: [
      {
        props: { variant: "menu" },
        style: {
          background: palette.background.menu,
          borderRadius: "0px",

          borderBottom: "1px solid",
          borderImageSlice: 1,
          borderColor: "transparent",
          borderImageSource: palette.gradient.main,
        },
      },
      {
        props: { type: "ip" },
        style: {
          background: palette.background.secondaryContainer,
        },
      },
      {
        props: { type: "paper-button" },
        style: {
          "&:hover": {
            background: palette.hover.main,
          },
        },
      },
      {
        props: { status: "error" },
        style: {
          border: `1px solid ${palette.error.dark}`,
        },
      },
    ],
  },
});

export const cMuiPaper = MuiPaper(cPalette);
export const oMuiPaper = MuiPaper(oPalette);
