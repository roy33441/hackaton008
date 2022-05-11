import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  stepper: {
    ".MuiStepLabel-labelContainer span": {
      fontSize: "xx-large",
    },
  },
}));

const steps = ["Select campaign settings", "Create an ad group"];

export default function StepperReg({ activeStep, setActiveStep, finished }) {
  const classes = useStyles();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      finished();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  return (
    <Box sx={{ width: "80%", height: "20%" }}>
      {activeStep === steps.length ? (
        <div />
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <IconButton
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              size="large"
            >
              <ArrowForwardIcon sx={{ fontSize: "80px" }} />
            </IconButton>
            <Box sx={{ flex: "1 1 auto" }} />
            <IconButton onClick={handleNext} size="large">
              {activeStep === steps.length - 1 ? (
                <CheckCircleIcon sx={{ fontSize: "80px" }} />
              ) : (
                <ArrowBackIcon sx={{ fontSize: "80px" }} />
              )}
            </IconButton>
          </Box>
        </React.Fragment>
      )}
      <Stepper
        activeStep={activeStep}
        sx={{ fontSize: "30px" }}
        className={classes.stepper}
      >
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel iconContainerStyle={{ width: 36 }}></StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
