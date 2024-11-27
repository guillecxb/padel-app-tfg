import { PropTypes } from "prop-types";

import { DialogContent, Box, Stack } from "@mui/material";

import AlertContents from "./AlertContents";

const AlertModal = ({ icon, iconProps, title, description, pre, action, actionText }) => {
  return (
    <Stack alignItems={"center"} direction="row" justifyContent="center">
      <Box sx={{ width: 680, height: "100%", marginTop: "10%" }}>
        <DialogContent>
          <AlertContents
            action={action}
            actionText={actionText}
            description={description}
            icon={icon}
            iconProps={iconProps}
            pre={pre}
            title={title}
          />
        </DialogContent>
      </Box>
    </Stack>
  );
};

export default AlertModal;

AlertModal.propTypes = {
  isOpen: PropTypes.bool,
  icon: PropTypes.string,
  iconProps: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string,
  pre: PropTypes.string,
  action: PropTypes.func,
  actionText: PropTypes.string,
};
