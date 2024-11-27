import { cPalette, oPalette } from "../palettes";

export const MuiAvatar = (palette) => ({
  MuiAvatar: {
    defaultProps: {},
    styleOverrides: {},
    variants: [
      {
        props: { color: "gradient" },
        style: {
          background: palette.avatar.main,
        },
      },
      {
        props: { color: "light" },
        style: {
          background: palette.background.overlay,
        },
      },
    ],
  },
});

export const cMuiAvatar = MuiAvatar(cPalette);
export const oMuiAvatar = MuiAvatar(oPalette);
