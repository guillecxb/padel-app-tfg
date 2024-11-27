// eslint-disable-next-line boundaries/element-types
import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { cPalette, oPalette } from "../palettes";

export const MuiAlert = (palette) => ({
  MuiAlert: {
    defaultProps: {
      iconMapping: {
        info: <MuisticaIcon color="info">information-user</MuisticaIcon>,
        success: <MuisticaIcon color="success">checked</MuisticaIcon>,
        warning: <MuisticaIcon color="warning">alert</MuisticaIcon>,
        error: <MuisticaIcon color="error">warning</MuisticaIcon>,
      },
    },
    styleOverrides: {
      root: {
        borderRadius: "8px",
        padding: "16px",

        color: "#6E7894",

        ".MuiTypography-root": {
          color: "#031A34",
        },
        ".MuiSvgIcon-root": {
          width: 24,
          height: 24,
        },
      },
    },
    variants: [
      {
        props: { severity: "error" },
        style: {
          background: palette.error.baby,
        },
      },
      {
        props: { severity: "info" },
        style: {
          background: palette.info.baby,
        },
      },
      {
        props: { severity: "warning" },
        style: {
          background: palette.warning.baby,
        },
      },
      {
        props: { severity: "success" },
        style: {
          background: palette.success.baby,
        },
      },
    ],
  },
});

export const cMuiAlert = MuiAlert(cPalette);
export const oMuiAlert = MuiAlert(oPalette);
