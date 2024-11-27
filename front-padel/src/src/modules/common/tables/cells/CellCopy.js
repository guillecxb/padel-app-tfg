import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import { Box, Tooltip, Typography, IconButton } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";

import { useTablesTranslation } from "translations";

export function CellCopy({ "data-testid": dataTestid, value, variant }) {
  const t = useTablesTranslation();
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = useCallback(() => {
    value && setHovered(true);
  }, [value]);

  const handleMouseOut = useCallback(() => {
    setHovered(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      // Fallback method for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Fallback: Oops, unable to copy", err);
      }
      document.body.removeChild(textArea);
    }
    setCopied(true);
  }, [value]);

  useEffect(() => {
    const copiedTimeout = copied && setTimeout(() => setCopied(false), 1000);
    return () => copiedTimeout && clearTimeout(copiedTimeout);
  }, [copied]);

  return (
    <Box
      alignItems="center"
      display="flex"
      gap={1}
      onClick={handleCopy}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      sx={{ cursor: "pointer" }}
    >
      <Tooltip
        data-testid={`${dataTestid}-tooltip`}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        open={copied}
        placement="top"
        title={t("copied")}
      >
        <Typography
          component="div"
          data-testid={dataTestid}
          noWrap
          sx={{ lineHeight: 3 }}
          variant={variant}
          {...(hovered && { color: "primary" })}
        >
          {value || "-"}
        </Typography>
      </Tooltip>
      <IconButton size="small">
        <FileCopyIcon
          {...(hovered ? { color: "primary" } : { color: "transparent" })}
          data-testid={`${dataTestid}-copy`}
        />
      </IconButton>
    </Box>
  );
}

CellCopy.propTypes = {
  "data-testid": PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
  variant: PropTypes.string,
};
