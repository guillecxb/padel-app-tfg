import { useCallback, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import { Avatar, styled, useTheme } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const Image = styled("img")`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  ${({ hasBorder }) => !!hasBorder && `padding: 8px;`}
  ${({ hasBorder }) => !!hasBorder && `border: 1px solid #e0e0e0;`}
  ${({ hasBorder }) => !!hasBorder && `box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);`}
  border-radius: 4px;
`;

export const ImageManager = ({
  "data-testid": dataTestId,
  width = 64,
  height = 64,
  src,
  defaultSrc,
}) => {
  const [imgError, setImgError] = useState(false);
  const onImageError = useCallback(() => setImgError(true), []);
  const theme = useTheme();

  const source = useMemo(() => {
    if (!src || src === "None" || imgError) {
      return (
        <MuisticaIcon color="primary.main" data-testid={dataTestId} variant="regular">
          {defaultSrc}
        </MuisticaIcon>
      );
    }

    const srcNoCache = src.startsWith("http") ? `${src}?${Math.floor(Date.now())}` : src;
    return (
      <Image
        data-testid={dataTestId}
        height={height}
        onError={onImageError}
        src={srcNoCache}
        width={width}
      />
    );
  }, [src, imgError, dataTestId, height, onImageError, width, defaultSrc]);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  return (
    <Avatar
      data-testid={dataTestId}
      sx={{ height, width, backgroundColor: theme.palette.background.primary }}
    >
      {source}
    </Avatar>
  );
};

ImageManager.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  hasBorder: PropTypes.bool,
  isRemote: PropTypes.bool,
  src: PropTypes.string,
  defaultSrc: PropTypes.string,
  "data-testid": PropTypes.string,
};
