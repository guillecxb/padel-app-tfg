import PropTypes from "prop-types";

import { Trans } from "react-i18next";

import { Typography, Box } from "@mui/material";

// eslint-disable-next-line boundaries/element-types
import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import CustomSvg from "./CustomSvg";

export const CustomTrans = ({ children, ...rest }) => {
  return (
    <Typography {...rest}>
      <Trans
        components={{
          bold: <b />,
          you: <Typography color="text.primary" component="span" />,
          b: <strong />,
          sb: <Typography color="black" component="span" display="inline" variant="body1" />,
          sbs: (
            <Typography color="text.secondary" component="span" display="inline" variant="body1" />
          ),
          h4: <Typography color="text.primary" component="span" display="inline" variant="h4" />,
          h3: <Typography color="text.primary" display="inline" variant="h3" />,
          h5: <Typography color="text.primary" variant="h5" />,
          li: <Typography color="text.secondary" component="li" mb={2} variant="list-item" />,
          i: <MuisticaIcon color="icon">information-user</MuisticaIcon>,
          flex_svg: <CustomSvg display="inline-block" verticalAlign="text-top" />,
          flex: <Box display="flex" />,
          br: <br />,
        }}
      >
        {children}
      </Trans>
    </Typography>
  );
};

CustomTrans.propTypes = {
  children: PropTypes.any,
};
