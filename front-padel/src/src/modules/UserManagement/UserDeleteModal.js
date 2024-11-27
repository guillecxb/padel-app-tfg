import { PropTypes } from "prop-types";
import { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Modal, Paper, Button, Box, Typography, Stack } from "@mui/material";

import { getMe, logOut } from "domain/accounts/slices/authSlice";
import { useDeleteUserByIdMutation } from "domain/accounts/apiSlices/usersApiSlice";

import EntityForm from "modules/common/entity-form";
import { ROUTES } from "modules/app/router";

import { useUsersCreateEditTranslation } from "translations";

const UserDeleteModal = ({ isOpen, userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: currentUserId } = useSelector(getMe);
  const t = useUsersCreateEditTranslation();

  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    !!isOpen && setOpen(true);
  }, [isOpen, userId]);

  const [deleteUserById] = useDeleteUserByIdMutation();

  const isOwner = currentUserId === userId;
  const messageKey = isOwner ? "messageOwner" : "message";

  const handleDelete = useCallback(async () => {
    await deleteUserById({ userId }).unwrap();

    if (isOwner) {
      dispatch(logOut());
      navigate(ROUTES.login);
      return;
    }

    setOpen(false);
  }, [deleteUserById, dispatch, isOwner, navigate, userId]);

  const handleDismiss = () => setOpen(false);

  return (
    <Modal open={open}>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        sx={{ width: "100vw", height: "100vh" }}
      >
        <EntityForm
          data-testid="user-delete-form"
          entity={{}}
          errorOn="snackbar"
          onSubmit={handleDelete}
          snackbarOptions={{ action: true }}
          snackbarTranslationParams={{ userId }}
          successOn="snackbar"
          translationKey="deleteUser"
          validateOnChange={false}
        >
          <Paper sx={{ p: 4 }}>
            <Typography mb={2} variant="h4">
              {t("customer.deleteModal.title")}
            </Typography>
            <Typography mb={2}>{t(`customer.deleteModal.${messageKey}`, { userId })}</Typography>
            <Typography color="text.secondary" variant="body2">
              {t("customer.deleteModal.warning")}
            </Typography>

            <Box>
              <EntityForm.DataBlock>
                {({ submitForm }) => (
                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="flex-end"
                    mt={3}
                    spacing={2}
                  >
                    <Button onClick={handleDismiss} variant="contained">
                      {t("customer.deleteModal.cancel")}
                    </Button>
                    <Button color="error" onClick={submitForm} variant="contained">
                      {t("customer.deleteModal.delete")}
                    </Button>
                  </Stack>
                )}
              </EntityForm.DataBlock>
            </Box>
          </Paper>
        </EntityForm>
      </Box>
    </Modal>
  );
};

UserDeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  userId: PropTypes.number,
  onDismiss: PropTypes.func,
};

export default UserDeleteModal;
