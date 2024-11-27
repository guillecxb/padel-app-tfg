import PropTypes from "prop-types";

import { IconButton, styled } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const CustomPrevArrow = styled("div")`
  position: absolute;
  top: 50%;
  display: block;
  padding: 0;
  transform: translate(0, -50%);
  cursor: pointer;
  left: 0px;
`;

export const PrevArrow = ({ onClick }) => (
  <CustomPrevArrow>
    <IconButton data-testid="prev" onClick={onClick} variant="contrast">
      <MuisticaIcon color="text.primary">chevron-left</MuisticaIcon>
    </IconButton>
  </CustomPrevArrow>
);

PrevArrow.propTypes = {
  onClick: PropTypes.func,
};
