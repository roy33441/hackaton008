import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import img from "./nirvanaLogo.png";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import { api } from "../../api.js";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    width: "100%",
    height: "100vh",
    textAlign: "center",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  outerBox: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    borderRadius: "50%",
    width: "75%",
    height: "35%",
    backgroundColor: (props) => props.color,
  },
  innerBox: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    borderRadius: "50%",
    width: "90%",
    height: "90%",
    backgroundColor: "rgb(246, 244, 239)",
  },
  logo: {
    position: "fixed",
    top: "0px",
    left: "0px",
  },
  setting: {
    position: "fixed !important",
    top: "10px",
    right: "10px",
  },
  dofek: {
    position: "fixed",
    bottom: "10px",
  },
});

function Home() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [dofek, setDofek] = useState("מחשב דופק");

  let intervalHandle;

  useEffect(() => {
    const fetchData = async () => {
      const response = await (await api.get("/api/garmin")).data;
      setDofek(response[0]);
      let index = 1;
      intervalHandle = setInterval(() => {
        if (response[index] >= 110) {
          api.get("/api/mail");
        }
        setDofek(response[index]);
        index = (index + 1) % (response.length - 1);
      }, 2000);
    };

    // call the function
    fetchData();
  }, []);

  const handleClick = () => {
    clearInterval(intervalHandle);
    navigate("/calm");
  };

  const handleSettings = () => {
    clearInterval(intervalHandle);
    navigate("/register");
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h3" className={classes.dofek}>
          {dofek}
        </Typography>
        <IconButton className={classes.setting} onClick={handleSettings}>
          <SettingsIcon fontSize="large" style={{ color: "#484343" }} />
        </IconButton>
        <Box
          className={classes.logo}
          component="img"
          sx={{
            height: 100,
            width: 110,
          }}
          alt="nirvana"
          src={img}
        />
        <Box
          className={classes.outerBox}
          style={{
            backgroundColor:
              localStorage.getItem("color") || "rgb(6, 205, 214)",
          }}
        >
          <Box className={classes.innerBox}>
            <Button
              style={{
                color: "#484343",
                borderRadius: "50%",
                width: "93%",
                height: "93%",
                backgroundColor:
                  localStorage.getItem("color") || "rgb(6, 205, 214)",
                display: "block",
              }}
              variant="outlined"
              className={classes.button}
              onClick={() => handleClick()}
            >
              <Typography
                style={{ fontWeight: "bold" }}
                color="#757070"
                variant="h5"
              >
                {localStorage["name"]} שלום,
              </Typography>
              <Typography style={{ fontWeight: "bold" }} variant="h4">
                מרגיש לחוץ?
              </Typography>
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Home;
