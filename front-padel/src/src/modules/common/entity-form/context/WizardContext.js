import { createContext } from "react";

const defaultValue = {
  step: 0,
  setStep: () => {},
  countSelected: 0,
  setCountSelected: () => {},
};

const WizardContext = createContext(defaultValue);
export default WizardContext;
