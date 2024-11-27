import { PropTypes } from "prop-types";
import { useMemo, Suspense, useCallback, useContext } from "react";

import { useFormikContext } from "formik";

import { Button, Grid, Typography } from "@mui/material";

import { WizardStepper } from "components/molecules/wizard-stepper";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import WizardButton from "./WizardButton";
import WizardContext from "./context";

const Wizard = ({
  stepFields,
  wizardSteps,
  translate,
  children,
  skipTouched = [],
  "data-testid": dataTestId,
  onCancel,
  onNextStep,
}) => {
  const { submitForm } = useFormikContext();
  const { step, setStep } = useContext(WizardContext);

  const CurrentStepComponent = useMemo(() => children[step], [children, step]);

  const skipTouchedValue = useMemo(() => {
    return skipTouched[step] ?? undefined;
  }, [step, skipTouched]);

  const onBack = useCallback(() => {
    setStep((screen) => screen - 1);
  }, [setStep]);

  const onNext = useCallback(() => {
    onNextStep ? onNextStep() : setStep((screen) => screen + 1);
  }, [setStep, onNextStep]);

  const nextButton = useMemo(
    () =>
      children.length - 1 > step ? (
        <WizardButton
          data-testid="next"
          endIcon={<MuisticaIcon color="text.primaryInverse">arrow-line-right</MuisticaIcon>}
          onClick={onNext}
          skipTouched={skipTouchedValue}
          stepFields={stepFields[step]}
        >
          {translate.next}
        </WizardButton>
      ) : (
        <WizardButton
          data-testid="submit"
          endIcon={<></>}
          onClick={submitForm}
          stepFields={stepFields[step]}
        >
          {translate.submit}
        </WizardButton>
      ),
    [
      children.length,
      onNext,
      skipTouchedValue,
      step,
      stepFields,
      submitForm,
      translate.next,
      translate.submit,
    ]
  );

  const backButton = useMemo(() => {
    return step === 0 ? (
      <Button
        color="primary"
        data-testid="cancel"
        onClick={onCancel}
        size="large"
        variant="outlined"
      >
        <Typography color="gradient" variant="subtitle">
          {translate.cancel}
        </Typography>
      </Button>
    ) : (
      <Button
        color="primary"
        data-testid="back"
        onClick={onBack}
        size="large"
        startIcon={<MuisticaIcon color="icon">arrow-line-left</MuisticaIcon>}
        variant="outlined"
      >
        <Typography color="gradient" variant="subtitle">
          {translate.back}
        </Typography>
      </Button>
    );
  }, [onBack, onCancel, step, translate.back, translate.cancel]);

  return (
    <Grid container data-testid={dataTestId}>
      <Grid item xs={12}>
        <WizardStepper activeStep={step} dataTestid="wizard-stepper" steps={wizardSteps} />
      </Grid>
      <Grid item pb={5} xs={12}>
        <Suspense fallback>{CurrentStepComponent}</Suspense>
      </Grid>
      <Grid item position="sticky" xs={12}>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>{backButton}</Grid>
          <Grid item>{nextButton}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Wizard.propTypes = {
  "data-testid": PropTypes.string,
  wizardSteps: PropTypes.arrayOf(PropTypes.string).isRequired,
  stepFields: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  children: PropTypes.any.isRequired,
  skipTouched: PropTypes.arrayOf(PropTypes.bool),
  translate: PropTypes.shape({
    submit: PropTypes.string,
    next: PropTypes.string,
    back: PropTypes.string,
    cancel: PropTypes.string,
  }),
  onCancel: PropTypes.func,
  onNextStep: PropTypes.func,
};

export default Wizard;
