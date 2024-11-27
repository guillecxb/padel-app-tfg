import { cPalette, oPalette } from "../palettes";
import { typography } from "../typography";

export const MuiTextField = (palette) => ({
  styleOverrides: {},
  MuiTextField: {
    defaultProps: {
      variant: "filled",
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        "& .MuiFormLabel-root": {
          ...typography.caption1,
          ...(ownerState.adornment && {
            left: "25px",
          }),
        },
        "& .MuiFormLabel-root.Mui-disabled": {
          opacity: 0.5,
          color: palette.text.primary,
        },
        "& .MuiFilledInput-root": {
          ...(ownerState.adornment && {
            paddingLeft: "25px",
          }),
          background: palette.background.secondaryContainer,
          border: `1px solid ${palette.borders.border}`,
          borderRadius: "5px",
          minHeight: !ownerState.multiline ? "60px" : "auto",
          maxHeight: !ownerState.multiline ? "60px" : "auto",
          "&.Mui-focused": {
            "&:before": {
              borderBottom: "none!important",
              borderBottomColor: "",
            },
            "&:after": {
              borderBottom: "none!important",
              borderBottomColor: "",
            },
            background: palette.background.secondaryContainer,
          },
          "&:hover": {
            "&:before": {
              borderBottom: "none!important",
              borderBottomColor: "",
            },
            "&:after": {
              borderBottom: "none!important",
              borderBottomColor: "",
            },
            background: palette.background.secondaryContainer,
          },

          "&:before": {
            borderBottom: "none!important",
            borderBottomColor: "",
          },
          "&:after": {
            borderBottom: "none!important",
            borderBottomColor: "",
          },
        },
        "& .MuiFilledInput-root.Mui-disabled": {
          opacity: 0.5,
        },
        "& .MuiFilledInput-root.Mui-disabled input": {
          color: palette.text.primary,
          WebkitTextFillColor: palette.text.primary,
        },
        "& .MuiFilledInput-root input": {
          color: `${palette.text.primary} !important`,
          WebkitTextFillColor: palette.text.primary,
          WebkitBackgroundClip: "text",
        },
      }),
    },
    variants: [
      {
        props: { size: "large" },
        style: {
          root: {
            width: 496,
            backgroundColor: "blue",
          },
        },
      },
    ],
  },
});

export const cMuiTextField = MuiTextField(cPalette);
export const oMuiTextField = MuiTextField(oPalette);
