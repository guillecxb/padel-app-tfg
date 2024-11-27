import PropTypes from "prop-types";
import { useMemo } from "react";

import { Box, Divider, Skeleton, Typography } from "@mui/material";

import { DEPLOY_STATUS } from "modules/enumerations";
import StatusLabel from "modules/common/statuses/StatusLabel";
import LoadingError from "modules/common/loading-error/LoadingError";

import { PaperButton, usePaperButton } from "components/molecules/paper-button";
import { ImageManager } from "components/molecules/image-manager";

import { useOperatorDashboardTranslation } from "translations";

const ClubCard = ({ id, name, status, company_logo_url, user_count, reservation_count, onClick }) => {
  const t = useOperatorDashboardTranslation();
  const isDisabled = useMemo(() => status === DEPLOY_STATUS.DEPLOYING, [status]);

  const { color, paperButtonProps } = usePaperButton({ isDisabled });
  const isLoading = false;

  return (
    <PaperButton
      {...paperButtonProps}
      data-customerid={id}
      data-testid="customer-card"
      onClick={onClick}
    >
      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Box display="flex" gap={2}>
          <ImageManager defaultSrc={"user-account"} src={company_logo_url} />
          <Box alignItems="center" display="flex" gap={1}>
            <Typography color={color} data-testid="name">
              {name}
            </Typography>
            <StatusLabel status={"ACTIVE"} variant="label" />
          </Box>
        </Box>
        <Box display="flex" gap={2} height={24}>
          <Divider color="gradient" orientation="vertical" />
          {/*  Reservations number */}
          <LoadingError
            Skeleton={Skeleton}
            isLoading={isLoading}
            skeletonProps={{ width: 80 }}
          >
            <Typography data-testid="devices-count" variant="body3">
              {`${reservation_count || 0} reservations`}
            </Typography>
          </LoadingError>
        </Box>
      </Box>
    </PaperButton>
  );
};

ClubCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
  name: PropTypes.string,
  status: PropTypes.string,
  company_logo_url: PropTypes.string,
  user_count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  devicesCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ClubCard;
