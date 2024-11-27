import { useMemo } from "react";
import PropTypes from "prop-types";

import { Box, Paper, Divider, Typography, useTheme } from "@mui/material";

const LayoutBlock = ({
  "data-testid": dataTestid,
  bottomDivider,
  topDivider,
  children,
  px = 3,
  py = 2,
  title,
  subtitle,
  subtitleVariant = "body2",
  subtitleColor = "textSecondary",
  variant = "primary",
  actions,
}) => {
  const theme = useTheme();

  const showHeader = useMemo(() => {
    return !!title || !!actions;
  }, [title, actions]);

  return (
    <>
      {topDivider && <Divider variant={variant} />}
      <Paper data-testid={dataTestid} variant={variant}>
        <Box px={px} py={py}>
          {showHeader && (
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom={theme.spacing(3)}
              marginTop={theme.spacing(1)}
            >
              {!!title && (
                <div>
                  <Typography variant="h3">{title}</Typography>
                  {!!subtitle && (
                    <Box marginTop={theme.spacing(1)}>
                      <Typography color={subtitleColor} variant={subtitleVariant}>
                        {subtitle}
                      </Typography>
                    </Box>
                  )}
                </div>
              )}
              {!!actions && <div>{actions}</div>}
            </Box>
          )}
          {children}
        </Box>
      </Paper>
      {bottomDivider && <Divider variant={variant} />}
    </>
  );
};

LayoutBlock.propTypes = {
  "data-testid": PropTypes.string,
  topDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subtitle: PropTypes.string,
  subtitleVariant: PropTypes.string,
  subtitleColor: PropTypes.string,
  px: PropTypes.number,
  py: PropTypes.number,
  variant: PropTypes.string,
  actions: PropTypes.node,
};

export default LayoutBlock;
