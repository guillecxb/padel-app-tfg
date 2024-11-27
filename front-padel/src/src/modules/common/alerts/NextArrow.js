import PropTypes from "prop-types";

import { IconButton, styled } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const CustomNextArrow = styled("div")`
  position: absolute;
  top: 50%;
  display: block;
  padding: 0;
  transform: translate(0, -50%);
  cursor: pointer;
  right: -8px;
`;

export const NextArrow = ({ onClick }) => (
  <CustomNextArrow>
    <IconButton data-testid="next" onClick={onClick} variant="contrast">
      <MuisticaIcon color="text.primary">chevron-right</MuisticaIcon>
    </IconButton>
  </CustomNextArrow>
);

NextArrow.propTypes = {
  onClick: PropTypes.func,
};
