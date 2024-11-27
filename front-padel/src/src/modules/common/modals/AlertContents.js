import { PropTypes } from "prop-types";

import { Box, Button, Stack, Typography } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const AlertContents = ({ icon, iconProps, title, description, pre, action, actionText }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" margin="auto">
      <Stack spacing={3}>
        <MuisticaIcon fontSize="extralarge" {...iconProps}>
          {icon}
        </MuisticaIcon>
        {title && <Typography variant="h4">{title}</Typography>}
        {description && (
          <Typography color="text.secondary" variant="body2">
            {description}
          </Typography>
        )}
        {pre && (
          <Typography color="text.secondary" variant="caption">
            {pre}
          </Typography>
        )}
      </Stack>
      {action && (
        <Stack direction="row" justifyContent="flex-end" pt={4}>
          <Button onClick={action} size="large" variant="contained">
            {actionText}
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default AlertContents;

AlertContents.propTypes = {
  icon: PropTypes.string,
  iconProps: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string,
  pre: PropTypes.string,
  action: PropTypes.func,
  actionText: PropTypes.string,
};
