import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { Dialog, Skeleton } from "@mui/material";

import { getMe } from "domain/accounts/slices/authSlice";

import LoadingError from "modules/common/loading-error/LoadingError";

import DialogTitle from "components/molecules/dialog-title/DialogTitle";

import { useModalsTranslation } from "translations";

import ContactModalContents from "./ContactModelContents";

export const ContactModal = ({ onClose }) => {
  const { obId } = useSelector(getMe);
  const handleClose = () => {
    onClose();
  };
  const ct = useModalsTranslation();

  const ob = 1
  const isObLoading = false
  const isObError = false

  return (
    <Dialog fullWidth maxWidth="sm" onClose={handleClose} open={true}>
      <DialogTitle description={ct("contact-us.description")} onClose={handleClose}>
        {ct("contact-us.more-info")}
      </DialogTitle>
      <LoadingError
        Skeleton={Skeleton}
        data-testid="contact-modal"
        error={isObError}
        isLoading={isObLoading}
        skeletonProps={{ width: 675, height: 150 }}
      >
        <ContactModalContents ob={ob} />
      </LoadingError>
    </Dialog>
  );
};

ContactModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
