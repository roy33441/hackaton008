import React, { useState, useEffect } from "react";
import Stepper from "./components/stepper";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, FormControl, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    direction: "rtl",
    width: "100%",
    marginTop: "5vh",
    display: "flex",
    flexDirection: "column",
  },
  form: {
    marginTop: "3vh !important",
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "1vw",
    "& .MuiFormLabel-root": {
      right: "4vw",
      marginTop: "-2vh",
      left: "inherit",
      direction: "rtl",
      fontSize: "24px",
      fontFamily: "Assistant !important",
    },
    "& .MuiFormControl-root": {
      paddingBottom: "4vw",
      maxWidth: "80%",
      fontSize: "24px",
      fontFamily: "Assistant !important",
    },
    "& .MuiInputBase-inputMultiline": {
      minHeight: "20vh",
    },
  },
  age: {
    alignSelf: "start",
    marginRight: "10%",
    width: "50%",
    fontSize: "28px",
    fontFamily: "Assistant !important",
  },
  title: {
    marginRight: "10% !important",
    fontFamily: "Assistant !important",
  },
  colorPicker: {
    fontSize: 20,
    ".MuiInput-input": {
      fontSize: 20,
    },
    ".MuiSelect-select": {
      fontSize: 20,
      "& .icon": {
        left: 0,
        position: "relative",
      },
    },
    "& .MuiSelect-icon": {
      position: "relative !important",
    },
  },
  stepperContainer: {
    width: "100%",
    marginRight: "10%",
    position: "fixed",
    bottom: 30,
  },
}));

export default function Register() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [userMail, setUserMail] = useState("");
  const [emergency, setEmergency] = useState("");
  const [parentName, setParentName] = useState("");
  const [name, setName] = useState("");
  const [video, setVideo] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    localStorage.getItem("userMail") &&
      setUserMail(localStorage.getItem("userMail"));
    localStorage.getItem("phoneNumber") &&
      setEmergency(localStorage.getItem("phoneNumber"));
    localStorage.getItem("parentName") &&
      setParentName(localStorage.getItem("parentName"));
    localStorage.getItem("name") && setName(localStorage.getItem("name"));
    localStorage.getItem("videoId") &&
      setVideo(localStorage.getItem("videoId"));
    localStorage.getItem("color") && setColor(localStorage.getItem("color"));
  }, []);

  const colors = [
    { color: "#6d9ef1", label: "כחול" },
    { color: "#ff3636", label: "אדום" },
    { color: "#f0f859", label: "צהוב" },
    { color: "#77ec90", label: "ירוק" },
  ];
  const textFields = [
    {
      value: userMail,
      changeValue: setUserMail,
      label: "כתובת מייל",
      type: "email",
    },
    {
      value: name,
      changeValue: setName,
      label: "שם",
      type: "name",
    },
    {
      value: parentName,
      changeValue: setParentName,
      label: "שם הורה",
      type: "parentName",
    },
    {
      value: emergency,
      changeValue: setEmergency,
      label: "טלפון לחירום",
      type: "emergency",
    },
  ];

  const finished = () => {
    localStorage.setItem("phoneNumber", emergency);
    localStorage.setItem("videoId", video);
    localStorage.setItem("name", name);
    localStorage.setItem("color", color);
    localStorage.setItem("userMail", userMail);
    localStorage.setItem("parentName", parentName);
    navigate("/");
  };

  const handleChange = (e, change) => change(e.target.value);

  const stepperProps = {
    activeStep,
    setActiveStep,
    finished,
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        ברוכים הבאים,{" "}
      </Typography>
      <br />
      <Typography variant="h4" className={classes.title}>
        נשאר רק ממש טיפה למלא
      </Typography>
      {activeStep === 0 ? (
        <FormControl className={classes.form}>
          {textFields.map(({ value, changeValue, label, type }) => (
            <TextField
              key={type}
              variant="standard"
              color="primary"
              label={label}
              value={value || ""}
              type={type}
              name={type}
              autoComplete={type}
              onChange={(e) => handleChange(e, changeValue)}
              sx={{
                height: 70,
                "& input + fieldset": {
                  height: 70,
                },
              }}
              fullWidth
              required
            ></TextField>
          ))}
          <TextField
            variant="standard"
            id="outlined-select-currency"
            select
            label="צבע אהוב"
            value={color || ""}
            onChange={(e) => handleChange(e, setColor)}
            helperText="בחר בבקשה את הצבע האהוב שלך"
            className={classes.colorPicker}
          >
            {colors.map(({ color, label }) => (
              <MenuItem key={color} value={color} style={{ fontSize: 20 }}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      ) : (
        <div className={classes.root}>
          <FormControl className={classes.form}>
            <TextField
              key="link"
              variant="filled"
              color="primary"
              label="הכנס סרטון אהוב"
              value={video || ""}
              type="link"
              name="link"
              autoComplete="link"
              multiline
              onChange={(e) => handleChange(e, setVideo)}
              sx={{
                height: 70,
                "& input + fieldset": {
                  height: 70,
                },
              }}
              fullWidth
              required
            ></TextField>
          </FormControl>
        </div>
      )}
      <div className={classes.stepperContainer}>
        <Stepper {...stepperProps} />
      </div>
    </div>
  );
}
