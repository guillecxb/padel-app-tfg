import { Box, Button, Dialog, DialogContent, Stack, Typography, useTheme } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const WizardConfirm = () => {
  const theme = useTheme();
  return (
    <Dialog fullWidth maxWidth="sm" open={true}>
      <DialogContent
        sx={{
          padding: theme.spacing(5),
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
        }}
      >
        <Box display="flex" flexDirection="column" justifyContent="center" margin="auto">
          <Stack spacing={3}>
            <MuisticaIcon fontSize="extralarge">information-user</MuisticaIcon>
            <Typography variant="h4">You haven’t made any selection</Typography>
            <Typography color="text.secondary" variant="body2">
              If you don’t select any device group now you can add them later.
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" pt={4}>
            <Button onClick={() => {}} size="large" variant="contained">
              Next
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default WizardConfirm;
