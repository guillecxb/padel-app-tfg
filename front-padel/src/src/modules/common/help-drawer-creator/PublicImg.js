import PropTypes from "prop-types";

export const PublicImg = ({ image, style }) => {
  return (
    <img
      alt=""
      src={process.env.PUBLIC_URL + image}
      style={{ paddingBottom: "16px ", ...style }}
    />
  );
};

PublicImg.propTypes = {
  image: PropTypes.string,
  style: PropTypes.object,
};
