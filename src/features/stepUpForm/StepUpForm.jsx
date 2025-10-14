
import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Paper,
} from "@mui/material";

const steps = ["Basic Details", "Form Details", "Final Submission"];

const StepUpForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = () => {
    alert("🎉 Form submitted successfully!");
    console.log(formData);
    setActiveStep(0); // Reset form after submission
    setFormData({ name: "", email: "", address: "" });
  };

  return (
    <Box sx={{ width: "100%", mt: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper
        elevation={3}
        sx={{ p: 4, mt: 4, maxWidth: 500, mx: "auto", textAlign: "center" }}
      >
        {activeStep === 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Step 1: Basic Details
            </Typography>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleNext}>
              Submit & Continue
            </Button>
          </>
        )}

        {activeStep === 1 && (
          <>
            <Typography variant="h6" gutterBottom>
              Step 2: Form Details
            </Typography>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button onClick={handleBack}>Back</Button>
              <Button variant="contained" onClick={handleNext}>
                Continue
              </Button>
            </Box>
          </>
        )}

        {activeStep === 2 && (
          <>
            <Typography variant="h6" gutterBottom>
              Step 3: Review & Submit
            </Typography>
            <Typography>Name: {formData.name}</Typography>
            <Typography>Email: {formData.email}</Typography>
            <Typography>Address: {formData.address}</Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button onClick={handleBack}>Back</Button>
              <Button variant="contained" color="success" onClick={handleFinalSubmit}>
                Final Submit
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default StepUpForm;