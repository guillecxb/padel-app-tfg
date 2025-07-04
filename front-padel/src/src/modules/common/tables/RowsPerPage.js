import PropTypes from "prop-types";

import { Box, Typography, useTheme, styled } from "@mui/material";

import { useCustomerDashboardTranslation } from "translations";

const Select = styled("select")`
  color: ${({ palette }) => palette.text.primary};
  border: none;
  background-color: ${({ palette }) => palette.background.secondaryContainer};
  border-radius: 2px;
  width: 36px;
  height: 28px;
`;

const RowsPerPage = ({ rowsPerPageOptions = [], onChange }) => {
  const { palette } = useTheme();
  const t = useCustomerDashboardTranslation();

  const handleChange = (e) => onChange(parseInt(e.target.value));

  return (
    <Box alignItems="center" display="flex" gap={1}>
      <Typography color="text.primary" variant="caption">
        {t("rowsPerPage")}
      </Typography>
      <Select onChange={handleChange} palette={palette}>
        {rowsPerPageOptions.map((value, i) => (
          <option key={`row-per-page-${i}`} value={value}>
            {value}
          </option>
        ))}
      </Select>
    </Box>
  );
};

RowsPerPage.propTypes = {
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
};

export default RowsPerPage;
