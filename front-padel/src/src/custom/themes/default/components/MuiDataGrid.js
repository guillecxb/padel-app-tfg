import { cPalette, oPalette } from "../palettes";

const MuiDataGrid = (palette) => ({
  MuiTable: {
    styleOverrides: {
      root: {
        borderRadius: "16px",
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        "&:not(:last-of-type)": {
          borderBottom: `1px solid ${palette.borders.border}`,
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: "16px 0 16px 24px",
        border: "none",
      },

      head: {
        borderBottom: `1px solid ${palette.borders.border}`,
        backgroundColor: `${palette.background.secondaryContainer} !important`,
        borderRadius: "0px !important",
        "&:first-of-type": {
          borderRadius: "16px 0 0 0 !important",
        },
        "&:last-of-type": {
          borderRadius: "0 16px 0 0 !important",
        },
        "& button": {
          fontFamily: "Sans Medium",
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },
  },
});

export const cMuiDataGrid = MuiDataGrid(cPalette);
export const oMuiDataGrid = MuiDataGrid(oPalette);
