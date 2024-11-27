import { useTheme } from "@mui/material";

const UrlGradients = () => {
  const { palette } = useTheme();

  return Object.entries(palette.urlGradients).map(([name, colors], i) => (
    <svg
      aria-hidden="true"
      focusable="false"
      key={`gradient-${i}`}
      style={{ width: 0, height: 0, position: "absolute" }}
    >
      <linearGradient id={`gradient-${name}`} x2="1" y2="1">
        {colors.map(({ color, percentage }, i) => (
          <stop key={`gradient-value-${color}-${i}`} offset={percentage} stopColor={color} />
        ))}
      </linearGradient>
    </svg>
  ));
};

UrlGradients.propTypes = {};

export default UrlGradients;
