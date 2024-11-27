import PropTypes from "prop-types";

import { DialogTitle as MuiDialogTitle, Stack, Typography, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const DialogTitle = ({ children, description, onClose, ...rest }) => {
  return (
    <MuiDialogTitle sx={{ m: 0, pl: 5, pr: "20px", pb: 4, pt: 0 }} {...rest}>
      <Stack alignItems="flex-start" direction="row" justifyContent="space-between">
        <Box pt={"40px"}>
          <Typography mb={2} variant="h4">
            {children}
          </Typography>
        </Box>
        {onClose ? (
          <Box pt={1}>
            <IconButton
              aria-label="close"
              data-testid="close-modal"
              onClick={onClose}
              sx={{
                color: (theme) => theme.palette.text.primary,
              }}
            >
              <MuisticaIcon color="text.primary" variant="regular">
                close
              </MuisticaIcon>
            </IconButton>
          </Box>
        ) : null}
      </Stack>
      <Typography color="text.secondary" variant="body2">
        {description}
      </Typography>
    </MuiDialogTitle>
  );
};
DialogTitle.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  onClose: PropTypes.func,
};

export default DialogTitle;
