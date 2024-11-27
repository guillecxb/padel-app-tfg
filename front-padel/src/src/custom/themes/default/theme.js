import { createTheme } from "@mui/material";

import { cComponents, oComponents } from "./components";
import { cPalette, oPalette } from "./palettes";
import { oCustomStyles, cCustomStyles } from "./custom-styles";
import { typography } from "./typography";
import { cShadows, oShadows } from "./shadows";

export const theme = (role) => {
  const operatorTheme = createTheme({
    customStyles: oCustomStyles,
    palette: oPalette,
    components: oComponents,
    shadows: oShadows,
    typography,
  });

  const customerTheme = createTheme({
    customStyles: cCustomStyles,
    palette: cPalette,
    components: cComponents,
    shadows: cShadows,
    typography,
  });

  return role === "customer" ? customerTheme : operatorTheme;
};
