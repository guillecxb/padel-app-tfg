import PropTypes from "prop-types";

import { Box, Divider, IconButton, Skeleton, Typography } from "@mui/material";

import { useSiteQuery } from "domain/accounts/apiSlices/usersApiSlice";

import { isWarning } from "modules/enumerations";
import LoadingError from "modules/common/loading-error/LoadingError";
import { localeDate } from "modules/common/helpers";

import { PaperButton, usePaperButton } from "components/molecules/paper-button";

import { TypographyEllipsis } from "components/atoms/typography/TypographyEllipsis";
import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

export const AlertCard = ({ alert, handleDismiss }) => {
  const { title, site_id, triggered_on, severity, sim_group_name } = alert;
  const { color, paperButtonProps } = usePaperButton({ isDisabled: false });

  const { data: site, isLoading: isSiteLoading } = useSiteQuery({ id: site_id });

  return (
    <PaperButton data-testid="alert-card" {...paperButtonProps} type="paper-button">
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Box alignItems="center" display="flex" gap={2}>
          {isWarning(severity) ? (
            <MuisticaIcon color="warning" fontSize="medium" variant="filled">
              warning
            </MuisticaIcon>
          ) : (
            <MuisticaIcon color="error" fontSize="medium" variant="filled">
              alert
            </MuisticaIcon>
          )}
          <Box>
            <Typography color={color} variant="h5">
              {title}
            </Typography>
            <Box display="flex" gap={1}>
              <TypographyEllipsis maxLines={1} variant="body3">
                {sim_group_name}
              </TypographyEllipsis>
              <Divider color="gradient" />
              <LoadingError
                Skeleton={Skeleton}
                data-testid="site"
                isLoading={isSiteLoading}
                skeletonProps={{ width: 80 }}
              >
                <TypographyEllipsis data-testid="site" maxLines={1} variant="body3">
                  {site?.name || "-"}
                </TypographyEllipsis>
              </LoadingError>
              <Divider color="gradient" />
              <TypographyEllipsis maxLines={1} variant="body3">
                {localeDate(triggered_on)}
              </TypographyEllipsis>
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={() => handleDismiss(alert.fingerprint)} variant="contrast">
            <MuisticaIcon color="text.primary" fontSize="medium">
              trash-can
            </MuisticaIcon>
          </IconButton>
        </Box>
      </Box>
    </PaperButton>
  );
};

AlertCard.propTypes = {
  handleDismiss: PropTypes.func.isRequired,
  showCustomer: PropTypes.bool,
  alert: PropTypes.any,
};
