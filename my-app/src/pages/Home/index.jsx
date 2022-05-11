import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import img from "./nirvanaLogo.png";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";

const useStyles = makeStyles({
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
    backgroundColor: "rgb(6, 205, 214)",
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
});

function Home() {
  const classes = useStyles();
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className={classes.container}>
      <IconButton className={classes.setting}>
        <Link to="/register">
          <SettingsIcon fontSize="large" style={{ color: "#484343" }} />
        </Link>
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
      <Box className={classes.outerBox}>
        <Box className={classes.innerBox}>
          <Button
            style={{
              color: "#484343",
              borderRadius: "50%",
              width: "93%",
              height: "93%",
              backgroundColor: "rgb(6, 205, 214)",
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
              ,שלום
            </Typography>
            <Typography style={{ fontWeight: "bold" }} variant="h4">
              ?מרגיש לחוץ
            </Typography>
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
