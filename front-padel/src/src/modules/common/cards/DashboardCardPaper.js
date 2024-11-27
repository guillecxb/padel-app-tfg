import PropTypes from "prop-types";

import { Box, Paper } from "@mui/material";

import { PaperButton, usePaperButton } from "components/molecules/paper-button";

const DashboardCardPaper = ({ children, onClick, "data-testid": dataTestid }) => {
  const { color, paperButtonProps } = usePaperButton({ isDisabled: false });

  const clickablePaper = Boolean(onClick);

  return (
    <>
      {clickablePaper ? (
        <PaperButton
          alignItems="center"
          component={Box}
          data-testid={dataTestid}
          display="flex"
          gap={2}
          onClick={onClick}
          p={2}
          type="paper-button"
          {...paperButtonProps}
        >
          <Box alignItems="center" display="flex" gap={2} justifyContent="flex-start">
            {children({ color })}
          </Box>
        </PaperButton>
      ) : (
        <Paper
          alignItems="center"
          component={Box}
          data-testid={dataTestid}
          display="flex"
          gap={2}
          p={2}
        >
          {children({})}
        </Paper>
      )}
    </>
  );
};

DashboardCardPaper.propTypes = {
  children: PropTypes.func,
  onClick: PropTypes.func,
  "data-testid": PropTypes.string,
};

export default DashboardCardPaper;
