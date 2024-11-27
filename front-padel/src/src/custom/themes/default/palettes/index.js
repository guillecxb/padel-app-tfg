import { palette as CPalette } from "./customer-palette/index";
import { palette as OPalette } from "./operator-palette";
import { defaultPalette } from "./default-palette";

export const oPalette = {
  ...defaultPalette,
  ...OPalette,
};

export const cPalette = {
  ...defaultPalette,
  ...CPalette,
};
