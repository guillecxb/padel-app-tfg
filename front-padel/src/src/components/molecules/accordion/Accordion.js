import PropTypes from "prop-types";
import { useState, useCallback } from "react";

import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Stack,
} from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const Accordion = ({
  action,
  children,
  summaryContent,
  "data-testid": dataTestid,
  summaryDataTestId,
  expanded = false,
  detailsVariant,
  expandIcon,
  ...rest
}) => {
  const [expand, setExpand] = useState(expanded);
  const [mouseOver, setMouseOver] = useState(false);

  const handleChange = useCallback((_event, isExpanded) => setExpand(isExpanded), []);

  const handleMouseOver = () => setMouseOver(true);
  const handleMouseLeave = () => setMouseOver(false);

  return (
    <MuiAccordion data-testid={dataTestid} expanded={expand} onChange={handleChange} {...rest}>
      <AccordionSummary
        data-testid={summaryDataTestId}
        expandIcon={
          expandIcon ?? (
            <MuisticaIcon color={!expand && mouseOver ? "primary" : "text.primary"}>
              chevron-down
            </MuisticaIcon>
          )
        }
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        state={!expand ? "closed" : ""}
      >
        <Box pr={2} width={"100%"}>
          <Stack direction="row" justifyContent="flex-end">
            <Box flexGrow={1}>
              {typeof summaryContent === "function"
                ? summaryContent({ expand, mouseOver })
                : summaryContent}
            </Box>
            {action ? action : <></>}
          </Stack>
        </Box>
      </AccordionSummary>
      <AccordionDetails variant={detailsVariant}>{expand ? children : <></>}</AccordionDetails>
    </MuiAccordion>
  );
};

Accordion.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node,
  summaryContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  "data-testid": PropTypes.string,
  summaryDataTestId: PropTypes.string,
  expanded: PropTypes.bool,
  detailsVariant: PropTypes.string,
  expandIcon: PropTypes.node,
  expandIconToBaseline: PropTypes.bool,
  leftExpandIcon: PropTypes.bool,
  withDividerLine: PropTypes.bool,
};

export default Accordion;
