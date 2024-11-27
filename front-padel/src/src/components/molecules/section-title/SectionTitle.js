import PropTypes from "prop-types";

import { Divider, Typography } from "@mui/material";

const SectionTitle = ({
  variant = "h1",
  color = "text.primary",
  "data-testid": dataTestid = "section-title",
  title,
  withDividerLine,
}) => {
  return (
    <>
      {withDividerLine ? (
        <>
          {typeof title === "object" ? (
            title
          ) : (
            <Typography color={color} data-testid={`${dataTestid}-name`} mb={2} variant={variant}>
              {title}
            </Typography>
          )}
          <Divider color="gradient" sx={{ mb: 6 }} />
        </>
      ) : (
        <>
          {typeof title === "object" ? (
            title
          ) : (
            <Typography color={color} data-testid={`${dataTestid}-name`} mb={6} variant={variant}>
              {title}
            </Typography>
          )}
        </>
      )}
    </>
  );
};

SectionTitle.propTypes = {
  "data-testid": PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  withDividerLine: PropTypes.bool,
};

export default SectionTitle;
