import PropTypes from "prop-types";

import { Button, Stack, Typography } from "@mui/material";

const TitleAndAction = ({
  variant = "h1",
  color = "text.primary",
  "data-testid": dataTestid = "title",
  title,
  onClick,
  actionTitle,
}) => {
  return (
    <Stack alignItems="center" direction="row" justifyContent="space-between">
      <Typography color={color} data-testid={`${dataTestid}-name`} mb={6} variant={variant}>
        {title}
      </Typography>
      <Button onClick={onClick} size="large" variant="contained">
        <Typography data-testid={`${dataTestid}-button`} variant="subtitle">
          {actionTitle}
        </Typography>
      </Button>
    </Stack>
  );
};
TitleAndAction.propTypes = {
  "data-testid": PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.node,
  action: PropTypes.node,
  onClick: PropTypes.func,
  actionTitle: PropTypes.string,
};

export default TitleAndAction;
