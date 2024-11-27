import { PropTypes } from "prop-types";

import { DialogContent, Dialog, useTheme } from "@mui/material";

import AlertContents from "./AlertContents";

const AlertModal = ({ isOpen, icon, iconProps, title, description, pre, action, actionText }) => {
  const theme = useTheme();
  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen}>
      <DialogContent
        sx={{
          padding: theme.spacing(5),
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
        }}
      >
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
    </Dialog>
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
