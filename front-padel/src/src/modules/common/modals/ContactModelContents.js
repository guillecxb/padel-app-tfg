import PropTypes from "prop-types";

import { Box, DialogContent, Grid, Link, Stack, Typography } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useModalsTranslation } from "translations";

const ContactModalContents = ({ ob }) => {
  const ct = useModalsTranslation();

  return (
    <DialogContent data-testid="contact-modal-content" dividers>
      <dl>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box display="flex" gap={1}>
              <MuisticaIcon color="icon" variant="filled">
                email
              </MuisticaIcon>
              <Typography color="text.primary" component={"dt"} variant="body2">
                {ct("contact-us.by-email")}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Link color="text.primary" data-testid="contact-us-email" href={`mailto:${ob.email}`}>
              <Typography color="gradient" component={"dd"} variant="body2">
                {ob.email}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" gap={1}>
              <MuisticaIcon color="icon" variant="filled">
                call-landline
              </MuisticaIcon>
              <Typography color="text.primary" component={"dt"} variant="body2">
                {ct("contact-us.by-phone")}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="column">
              <Link
                color="text.primary"
                data-testid="contact-us-phone"
                href={`tel:${ob.telephone}`}
                mb={0.5}
              >
                <Typography component={"dd"} variant="body2">
                  {ob.telephone}
                </Typography>
              </Link>
              <Typography variant="body2">{ct("contact-us.availability")}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </dl>
    </DialogContent>
  );
};

ContactModalContents.propTypes = {
  ob: PropTypes.shape({ email: PropTypes.string, telephone: PropTypes.string }),
};

export default ContactModalContents;
