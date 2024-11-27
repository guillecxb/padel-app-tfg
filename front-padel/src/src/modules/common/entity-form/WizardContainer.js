import { useState } from "react";
import PropTypes from "prop-types";

import WizardContext from "./context/WizardContext";

const WizardContainer = ({ children }) => {
  const [step, setStep] = useState(0);
  const [countSelected, setCountSelected] = useState(0);

  return (
    <WizardContext.Provider value={{ step, setStep, countSelected, setCountSelected }}>
      {children}
    </WizardContext.Provider>
  );
};

WizardContainer.propTypes = {
  children: PropTypes.node,
};

export default WizardContainer;
