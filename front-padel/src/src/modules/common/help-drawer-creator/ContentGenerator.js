import PropTypes from "prop-types";

import { Box, Grid, Stack, Typography } from "@mui/material";

import Accordion from "components/molecules/accordion/Accordion";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { CustomTrans } from "translations/CustomTrans";

import { PublicImg } from "./PublicImg";

export const ContentGenerator = ({ pageTitle, contents }) => {
  const handleElements = {
    text: ({ element }) => (
      <>
        {element.map((e, idx) => (
          <CustomTrans key={idx} pb={3}>
            {e}
          </CustomTrans>
        ))}
      </>
    ),
    list: ({ element }) => (
      <ul>
        {element.map((e, idx) => (
          <li key={idx}>
            <CustomTrans pb={1}>{e}</CustomTrans>
          </li>
        ))}
      </ul>
    ),
    img: ({ element, style }) => (
      <>
        {element.map((e, idx) => (
          <Box alignItems="center" display="flex" justifyContent="center" key={idx} width="100%">
            <PublicImg image={e} style={style} />
          </Box>
        ))}
      </>
    ),
    info: ({ element }) => (
      <Stack alignItems="top" direction="row" pb={3} spacing={1}>
        <Box>
          <MuisticaIcon color="info" variant="regular">
            information
          </MuisticaIcon>
        </Box>
        <Typography variant="body3">{element}</Typography>
      </Stack>
    ),
    grid: ({ content }) => (
      <Grid alignItems="center" container spacing={2}>
        {content.map((content, key) => (
          <Grid item key={key} xs={6}>
            {handleElements[content.type](content, content.type)}
          </Grid>
        ))}
      </Grid>
    ),
  };

  const generateContent = (content) => handleElements[content.type](content, content.type);

  const handleContents = {
    plain: (contentTitle, generatedContent) => (
      <>
        {!!contentTitle && (
          <Typography pb={3} variant="h3">
            {contentTitle}
          </Typography>
        )}
        {generatedContent}
      </>
    ),
    grid: (contentTitle, generatedContent) => (
      <>
        {!!contentTitle && (
          <Typography pb={3} variant="h3">
            {contentTitle}
          </Typography>
        )}
        <Grid alignItems="center" container spacing={2}>
          {generatedContent.map((content, key) => (
            <Grid item key={key} xs={6}>
              {content}
            </Grid>
          ))}
        </Grid>
      </>
    ),
    accordion: (contentTitle, generatedContent, expanded) => (
      <Accordion
        data-testid="drawer-container"
        disablePadding
        elevation={0}
        expanded={expanded}
        summaryContent={
          <Typography data-testid="accordion-title" variant="h3">
            {contentTitle}
          </Typography>
        }
      >
        {generatedContent}
      </Accordion>
    ),
  };

  return (
    <Box height="100vh">
      <Typography data-testid="content-title" pb={3} variant="h3">
        {pageTitle}
      </Typography>
      {contents?.map(({ contentTitle, content, type, expanded }, idx) => (
        <Box key={idx}>
          {handleContents[type](contentTitle, content.map(generateContent), expanded)}
        </Box>
      ))}
    </Box>
  );
};

ContentGenerator.propTypes = {
  pageTitle: PropTypes.string,
  id: PropTypes.string,
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["plain", "accordion", "grid"]),
      content: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.oneOf(["text", "img", "info", "list", "grid"]).isRequired,
          element: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
          content: PropTypes.array,
        })
      ),
    })
  ),
};
