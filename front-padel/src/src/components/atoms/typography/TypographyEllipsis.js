import PropTypes from "prop-types";

import { Typography } from "@mui/material";

export const TypographyEllipsis = ({ maxLines, children, ...rest }) => {
  return (
    <Typography
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: "vertical",
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};

TypographyEllipsis.propTypes = {
  maxLines: PropTypes.number,
  children: PropTypes.any,
};
