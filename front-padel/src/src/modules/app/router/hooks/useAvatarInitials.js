import { useMemo } from "react";
import PropTypes from "prop-types";

const useAvatarInitials = ({ name }) => {
  const nameInitials = useMemo(
    () =>
      name
        .split(" ")
        .map((chunk) => chunk.slice(0, 1).toUpperCase())
        .join("")
        .slice(0, 2),
    [name]
  );
  return nameInitials;
};

useAvatarInitials.propTypes = {
  name: PropTypes.string,
};

export default useAvatarInitials;
