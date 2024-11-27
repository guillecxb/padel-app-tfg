import PropTypes from "prop-types";

import SVG from "react-inlinesvg";

import { useTheme, styled } from "@mui/material";

// Cargar todos los SVG desde el directorio "./icons"
const misticaSvgContext = require.context("./icons", true, /\.svg$/);
export const misticaSvgs = misticaSvgContext
  .keys()
  .map((path) => ({ path, file: misticaSvgContext(path) }));

const SVGComponent = styled(SVG)`
  width: ${({ fontSize }) => `${fontSize}px`};
  height: ${({ fontSize }) => `${fontSize}px`};
  & path {
    fill: ${({ color }) => color};
  }
`;

const MuisticaIcon = ({
  variant = "regular",
  fontSize = "medium",
  color = "text",
  children,
  "data-testid": dataTestid,
}) => {
  const { palette } = useTheme();

  const fontSizes = {
    small: 14,
    medium: 24,
    mediumLarge: 32,
    large: 40,
    extralarge: 64,
  };

  const [baseColor, subColor = "main"] = color.split(".");

  // Buscar el SVG correspondiente al icono
  const iconSrc = misticaSvgs.filter(
    ({ path }) => path === `./${variant}/${children}-${variant}.svg`
  )[0]?.file;

  return (
    <SVGComponent
      color={palette[baseColor][subColor]}
      data-testid={dataTestid}
      fontSize={fontSizes[fontSize]}
      height={24}
      src={iconSrc}
      viewBox="0 0 24 24"
      width={24}
    />
  );
};

MuisticaIcon.propTypes = {
  variant: PropTypes.oneOf(["light", "regular", "filled"]),
  fontSize: PropTypes.oneOf(["small", "medium", "large", "mediumLarge", "extralarge"]),
  color: PropTypes.string,
  "data-testid": PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default MuisticaIcon;
