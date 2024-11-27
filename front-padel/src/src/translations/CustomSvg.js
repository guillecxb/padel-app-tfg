import PropTypes from "prop-types";

const CustomSvg = ({ children, display = "inline", verticalAlign = "text-bottom" }) => {
  return (
    <img
      alt={children[0]}
      src={`${process.env.PUBLIC_URL}/help_images/en/${children[0]}.svg`}
      style={{
        display: display,
        position: "relative",
        verticalAlign: verticalAlign,
        paddingRight: "8px",
      }}
    />
  );
};

CustomSvg.propTypes = {
  children: PropTypes.any,
  display: PropTypes.string,
  verticalAlign: PropTypes.string,
};

export default CustomSvg;
