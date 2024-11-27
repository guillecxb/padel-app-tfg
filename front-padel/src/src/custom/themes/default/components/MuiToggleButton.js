import { cPalette, oPalette } from "../palettes";

const MuiToggleButton = (palette) => ({
  MuiToggleButton: {
    styleOverrides: {
      root: {
        ".MuiSvgIcon-root": {
          width: 24,
          height: 24,
        },
      },
    },
    variants: [
      {
        props: { variant: "paper" },
        style: ({ ownerState }) => ({
          borderRadius: "35px",
          color: palette.text.primary,
          backgroundColor: palette.background.default,
          borderColor: palette.borders.border,
          "&&.Mui-selected": {
            border: "none",
            outline: "none",
            position: "relative",
            background: palette.gradient.main,
            zIndex: 1,

            "&::before": {
              content: "''",
              position: "absolute",
              top: "2px",
              right: "2px",
              bottom: "2px",
              left: "2px",
              backgroundColor: palette.primary.light,
              ...(ownerState.position === "first" && {
                borderTopLeftRadius: "33px",
                borderBottomLeftRadius: "33px",
              }),
              ...(ownerState.position === "last" && {
                borderTopRightRadius: "33px",
                borderBottomRightRadius: "33px",
              }),
              zIndex: -1,
            },

            "&:hover": {
              boxShadow: 0,
              transform: "none",
              border: "none",
            },

            "&:hover:before": {
              backgroundColor: palette.hover.main,
              top: "2px",
              right: "2px",
              bottom: "2px",
              left: "2px",
            },

            "&:disabled": {
              opacity: 0.5,
            },
          },
          "&&:not(.Mui-selected)": {
            border: "none",
            outline: "none",
            position: "relative",
            background: palette.borders.border,
            zIndex: 1,

            "&::before": {
              content: "''",
              position: "absolute",
              ...(ownerState.position === "first" && {
                top: "1px",
                right: "0px",
                bottom: "1px",
                left: "1px",
              }),
              ...(ownerState.position === "last" && {
                top: "1px",
                right: "1px",
                bottom: "1px",
                left: "1px",
              }),
              backgroundColor: palette.background.paper,
              ...(ownerState.position === "first" && {
                borderTopLeftRadius: "33px",
                borderBottomLeftRadius: "33px",
              }),
              ...(ownerState.position === "last" && {
                borderTopRightRadius: "33px",
                borderBottomRightRadius: "33px",
              }),
              zIndex: -1,
            },

            "&:hover": {
              boxShadow: 0,
              transform: "none",
              border: "none",
            },

            "&:hover:before": {
              backgroundColor: palette.hover.main,
              top: "2px",
              right: "2px",
              bottom: "2px",
              left: "2px",
            },

            "&:disabled": {
              opacity: 0.5,
            },
          },
        }),
      },
      {
        props: { variant: "viewSwitch" },
        style: {
          paddingTop: 6,
          paddingBottom: 6,
          borderRadius: "24px",
          color: palette.text.primary,
          textTransform: "none",
          borderColor: palette.borders.border,
          "&&:not(:first-of-type)": {
            borderRadius: "33px",
            borderColor: palette.borders.border,
          },
          "&&:not(:last-of-type)": {
            borderRadius: "33px",
          },
          "&&.Mui-selected": {
            border: "none",
            outline: "none",
            position: "relative",
            background: palette.gradient.main,
            zIndex: 1,

            "&::before": {
              content: "''",
              position: "absolute",
              top: "2px",
              right: "2px",
              bottom: "2px",
              left: "2px",
              color: palette.primary.gradient,
              backgroundColor: palette.primary.light,
              borderRadius: "33px",
              zIndex: -1,
            },

            "&:hover": {
              boxShadow: 0,
              transform: "none",
              border: "none",
            },

            "&:hover:before": {
              backgroundColor: palette.hover.main,
              top: "2px",
              right: "2px",
              bottom: "2px",
              left: "2px",
            },

            "&:disabled": {
              opacity: 0.5,
            },
          },
          "&&:not(.Mui-selected)": {
            outline: "none",
            position: "relative",
            zIndex: 1,

            "&::before": {
              content: "''",
              position: "absolute",
              backgroundColor: palette.background.paper,
              zIndex: -1,
            },

            "&:hover": {
              boxShadow: 0,
              transform: "none",
              border: "none",
            },

            "&:disabled": {
              opacity: 0.5,
            },
          },
        },
      },
    ],
  },
});

export const cMuiToggleButton = MuiToggleButton(cPalette);
export const oMuiToggleButton = MuiToggleButton(oPalette);
