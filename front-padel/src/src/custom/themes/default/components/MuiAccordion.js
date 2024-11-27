import { cPalette, oPalette } from "../palettes";

const MuiAccordion = (palette) => ({
  MuiAccordion: {
    styleOverrides: {
      root: {
        borderRadius: "16px 16px 16px 16px",
        "&:before": {
          display: "none",
        },
        "&:last-of-type": {
          borderRadius: "16px 16px 16px 16px",
        },
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {},
    },
    variants: [
      {
        props: { state: "closed" },
        style: {
          "&:hover": {
            backgroundColor: palette.hover.main,
          },
        },
      },
    ],
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: {
        backgroundColor: palette.background.secondaryContainer,
        borderTop: `1px solid ${palette.borders.border}`,
        borderBottomRightRadius: "16px",
        borderBottomLeftRadius: "16px",
      },
    },
    variants: [],
  },
});

export const cMuiAccordion = MuiAccordion(cPalette);
export const oMuiAccordion = MuiAccordion(oPalette);
