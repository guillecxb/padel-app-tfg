import PropTypes from "prop-types";
import { useState, useMemo } from "react";

import Slider from "react-slick";
import { useSelector } from "react-redux";

import { useTheme, Box, Button, Typography, Stack, IconButton, styled } from "@mui/material";

import { getCustomerId } from "domain/accounts/slices/customerIdSlice";

import { WARNING, ERROR_BACK } from "modules/enumerations";
import LoadingError from "modules/common/loading-error/LoadingError";
import { AlertCard } from "modules/common/cards/AlertCard";
import ConfirmCancelModal from "modules/common/modals/ConfirmCancelModal";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useAlertsTranslation } from "translations";

import { AlertToggle } from "./AlertToggle";
import { PrevArrow } from "./PrevArrow";
import { NextArrow } from "./NextArrow";
import AlertsSkeleton from "./AlertsSkeleton";

const CardWrapper = styled("div")`
  width: 50%;
`;

const CustomSlider = styled(Slider)(({ theme }) => {
  return `.slick-list {
    width: calc(100vw - 248px);
    margin: 0 48px;
    box-sizing: initial;
    padding-bottom: 5px;
  }
  .slick-slide > div {
    padding: 0 10px;
  }
  .slick-dots {
    text-align: center;
    padding-right: 10px;
    li {
      margin: 0;
      font-size: 16px;
      button::before {
        color: ${theme.palette.primary.main} !important;
        font-size: 10px;
      }
    }
  }
`;
});

export const AlertsList = ({ showCustomer }) => {
  const [filter, setFilter] = useState("");
  const [fingerprint, setFingerprint] = useState("");
  const [silence] = [];
  const t = useAlertsTranslation();
  const { palette } = useTheme();

  const customerId = useSelector(getCustomerId);

  const alertsData = {
    count: 3,
    results: [
      {
        sim_id: 1,
        customer_id: 1,
        title: "Lost connection",
        summary: "The device was disconnected due to missing payment",
        severity: "WARNING",
        sim_group_name: "Phones",
        site_id: 1,
        triggered_on: "2021-09-28T15:48:18.758329",
        fingerprint: "fgp1",
      },
      {
        sim_id: 2,
        customer_id: 1,
        title: "Lost connection",
        summary: "The device was disconnected due to change in coverage",
        severity: "CRITICAL",
        sim_group_name: "Phones",
        site_id: 3,
        triggered_on: "2021-09-28T15:48:18.758329",
        fingerprint: "fgp2",
      },
      {
        sim_id: 3,
        customer_id: 3,
        title: "Lost connection",
        summary: "The device was disconnected due to change in coverage",
        severity: "CRITICAL",
        sim_group_name: "Phones",
        site_id: 3,
        triggered_on: "2021-09-28T15:48:18.758329",
        fingerprint: "fgp3",
      },
    ],
  };

  const alerts = alertsData.results;
  const isAlertsLoading = false;
  const alertsError = null;

  const selectedAlerts = useMemo(
    () =>
      alerts
        ? {
            [WARNING]: alerts.filter((alarm) => alarm.severity === WARNING),
            [ERROR_BACK]: alerts.filter((alarm) => alarm.severity === ERROR_BACK),
          }
        : { [WARNING]: [], [ERROR_BACK]: [] },
    [alerts]
  );

  const dismissAll = () => setFingerprint("all");
  const dismissOne = (fingerprint) => setFingerprint({ fingerprint });
  const handleCancel = () => setFingerprint("");
  const handleSilenceAll = () =>
    Promise.all(alerts.map(({ fingerprint }) => silence({ fingerprint }).unwrap()));
  const handleSilence = () => silence(fingerprint).unwrap();

  const cards = useMemo(
    () =>
      alerts
        ? (selectedAlerts[filter] || alerts).map((alert) => (
            <CardWrapper key={alert.fingerprint}>
              <AlertCard alert={alert} handleDismiss={dismissOne} showCustomer={showCustomer} />
            </CardWrapper>
          ))
        : [],
    [alerts, filter, selectedAlerts, showCustomer]
  );

  return (
    <Box>
      <Stack
        alignItems="center"
        data-testid="alerts-actions"
        direction="row"
        justifyContent="flex-end"
        marginBottom={2}
        paddingTop={4}
        spacing={2}
      >
        <Button
          color="secondary"
          data-testid="dismiss-all"
          disabled={!alerts?.length}
          endIcon={
            <MuisticaIcon color="icon" variant="filled">
              trash-can
            </MuisticaIcon>
          }
          onClick={dismissAll}
          size="large"
          style={{ marginLeft: "8px" }}
        >
          <Typography color="gradient">{t("dismiss-all")}</Typography>
        </Button>
      </Stack>
      <LoadingError
        Skeleton={AlertsSkeleton}
        data-testid="alerts-list"
        empty={!!!cards.length}
        error={alertsError}
        isLoading={isAlertsLoading}
        translationKey="alerts"
      >
        {cards.length > 2 ? (
          <CustomSlider
            dots={true}
            dotsClass={"slick-dots"}
            infinite={true}
            nextArrow={<NextArrow />}
            palette={palette}
            prevArrow={<PrevArrow />}
            slidesToScroll={2}
            slidesToShow={2}
            speed={500}
          >
            {cards}
          </CustomSlider>
        ) : (
          <Stack alignItems="center" direction="row" spacing={3}>
            <div>
              <IconButton data-testid="next" disabled variant="contrast">
                <MuisticaIcon color="action.disabled">chevron-left</MuisticaIcon>
              </IconButton>
            </div>
            {cards}{" "}
            <div>
              <IconButton data-testid="next" disabled variant="contrast">
                <MuisticaIcon color="action.disabled">chevron-right</MuisticaIcon>
              </IconButton>
            </div>
          </Stack>
        )}
      </LoadingError>
      <ConfirmCancelModal
        handleCancel={handleCancel}
        handleConfirm={fingerprint === "all" ? handleSilenceAll : handleSilence}
        isOpen={!!fingerprint}
        translationKey={fingerprint === "all" ? "dismissAll" : "dismiss"}
      />
    </Box>
  );
};

AlertsList.propTypes = {
  showCustomer: PropTypes.bool,
  alertsError: PropTypes.any,
  isAlertsLoading: PropTypes.bool,
};
