import { cPalette, oPalette } from "../palettes";

export const MuiAutocomplete = (palette) => ({
  styleOverrides: {},
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        "& .MuiAutocomplete-endAdornment": {
          ".MuiButtonBase-root": {
            color: palette.text.primary,
          },
        },
      },
      listbox: {
        ".MuiAutocomplete-option": {
          "&.Mui-focused": {
            backgroundColor: palette.hover.main,
          },
          '&.Mui-focused[aria-selected="true"]': {
            backgroundColor: palette.hover.main,
          },
        },
      },
    },
    variants: [],
  },
});

export const cMuiAutocomplete = MuiAutocomplete(cPalette);
export const oMuiAutocomplete = MuiAutocomplete(oPalette);
