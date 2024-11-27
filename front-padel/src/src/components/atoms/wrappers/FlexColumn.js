import PropTypes from "prop-types";

import { Box, styled } from "@mui/material";

export const FlexColumn = styled(Box)`
  display: grid;
  width: 100%;
  grid-template-columns: ${({ columns = 1, customColumns }) =>
    customColumns ? customColumns : `repeat(${columns}, 1fr)`};
  grid-gap: ${({ gap }) => `calc(${gap}*8px) calc(${gap}*8px)`};
`;

FlexColumn.propTypes = {
  columns: PropTypes.number,
  customColumns: PropTypes.string,
  gapX: PropTypes.number,
  gapY: PropTypes.number,
};
