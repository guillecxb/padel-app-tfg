import PropTypes from "prop-types";

import { Box, Step, StepLabel, Stepper, Typography, StepConnector, useTheme } from "@mui/material";

import { StepIcon } from "./StepIcon";

export const WizardStepper = ({ activeStep, steps, stepsWithErrors = [] }) => {
  const { palette } = useTheme();
  return (
    <>
      <Box my={6}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={
            <StepConnector
              sx={{
                top: 15,
                "& .MuiStepConnector-lineHorizontal": {
                  borderColor: palette.primary.main,
                  borderWidth: 4,
                },
              }}
            />
          }
          sx={{ width: "90%", margin: "0 auto" }}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={StepIcon} error={stepsWithErrors.includes(index)}>
                <Typography variant="body3">{step}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
};

WizardStepper.propTypes = {
  activeStep: PropTypes.number,
  steps: PropTypes.array,
  stepsWithErrors: PropTypes.array,
};
