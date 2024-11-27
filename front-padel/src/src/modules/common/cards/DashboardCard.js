import PropTypes from "prop-types";

import { Box, Typography, Skeleton } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import LoadingError from "../loading-error/LoadingError";

import DashboardCardPaper from "./DashboardCardPaper";

const DashboardCard = ({
  "data-testid": dataTestid,
  icon,
  title,
  count = "-",
  isLoading,
  onClick,
}) => {
  return (
    <LoadingError Skeleton={Skeleton} isLoading={isLoading} skeletonProps={{ height: "84px" }}>
      <DashboardCardPaper data-testid={dataTestid} onClick={onClick}>
        {({ color }) => (
          <>
            <MuisticaIcon color="icon" variant="filled">
              {icon}
            </MuisticaIcon>
            <Box>
              <Typography color={color} data-testid="card-title">
                {title}
              </Typography>
              <Typography color="text.secondary" data-testid="card-info" variant="body3">
                {count}
              </Typography>
            </Box>
          </>
        )}
      </DashboardCardPaper>
    </LoadingError>
  );
};

DashboardCard.propTypes = {
  "data-testid": PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default DashboardCard;
