import React, { useState } from "react";
// import {
//   Button,
//   CircularProgress,
//   makeStyles,
//   TextField,
//   Typography,
// } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: "white",
//     direction: "rtl",
//   },
//   title: {
//     paddingTop: theme.spacing(4),
//     paddingRight: theme.spacing(2),
//     fontWeight: "bold",
//   },
//   mainText: {
//     paddingTop: theme.spacing(1),
//     textAlign: "center",
//     paddingRight: theme.spacing(3),
//     paddingLeft: theme.spacing(3),
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     paddingBottom: theme.spacing(2),
//     "& .MuiFormLabel-root": {
//       right: 0,
//       left: "inherit",
//       direction: "rtl",
//     },
//     "& .MuiFormControl-root": {
//       paddingBottom: theme.spacing(3),
//       maxWidth: "90%",
//     },
//     "& .MuiInputBase-inputMultiline": {
//       minHeight: theme.spacing(20),
//     },
//   },
//   sendButton: {
//     color: "white",
//     fontSize: "18px",
//     paddingRight: theme.spacing(3),
//     paddingLeft: theme.spacing(3),
//   },
//   alert: {
//     "& .MuiAlert-action": {
//       paddingLeft: 0,
//       paddingRight: theme.spacing(2),
//     },
//   },
//   email: {
//     direction: "ltr",
//   },
// }));

// function ContactPage() {
//   const classes = useStyles();
//   const [open, setOpen] = useState(false);
//   const [sendingMail, setSendingMail] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [userEmailError, setUserEmailError] = useState("");
//   const [userPhone, setUserPhone] = useState("");
//   const [userMessage, setUserMessage] = useState("");
//   const [userMessageError, setUserMessageError] = useState("");
//   const [userNameError, setUserNameError] = useState("");

//   const handleEmailChange = (e) => {
//     setUserEmailError("");
//     setUserEmail(e.target.value);
//   };
//   const handleNameChange = (e) => {
//     setUserNameError("");
//     setUserName(e.target.value);
//   };
//   const handlePhoneChange = (e) => setUserPhone(e.target.value);
//   const handleMessageChange = (e) => {
//     setUserMessageError("");
//     setUserMessage(e.target.value);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpen(false);
//   };

//   const sendMailMessage = () => {
//     return;
//   };

//   return (
//     <div className={classes.root}>
//       <Typography variant="h6" noWrap className={classes.title}>
//         צור קשר:
//       </Typography>
//       <div className={classes.form}>
//         <TextField
//           color="secondary"
//           label="שם מלא"
//           name="name"
//           autoComplete="name"
//           value={userName}
//           onChange={handleNameChange}
//           helperText={userNameError}
//           error={userNameError !== ""}
//           fullWidth
//           required
//         ></TextField>
//         <TextField
//           color="secondary"
//           label={"כתובת מייל"}
//           value={userEmail}
//           type="email"
//           name="email"
//           autoComplete="email"
//           onChange={handleEmailChange}
//           helperText={userEmailError}
//           error={userEmailError !== ""}
//           className={classes.email}
//           fullWidth
//           required
//         ></TextField>
//         <TextField
//           color="secondary"
//           label={"מספר טלפון"}
//           type="tel"
//           name="tel"
//           autoComplete="tel"
//           value={userPhone}
//           onChange={handlePhoneChange}
//           fullWidth
//         ></TextField>
//         <TextField
//           color="secondary"
//           label={"ההודעה שלך"}
//           value={userMessage}
//           onChange={handleMessageChange}
//           helperText={userMessageError}
//           error={userMessageError !== ""}
//           required
//           fullWidth
//           multiline
//         ></TextField>
//         <Button
//           variant="contained"
//           color="secondary"
//           className={classes.sendButton}
//           onClick={() => sendMailMessage()}
//         >
//           {sendingMail ? (
//             <CircularProgress
//               style={{ color: "white", width: "20px", height: "20px" }}
//             />
//           ) : (
//             "שלח"
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default ContactPage;
export default (
  <div>
    <button>click me</button>
  </div>
);
