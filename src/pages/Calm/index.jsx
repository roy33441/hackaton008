import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import CallIcon from "@mui/icons-material/Call";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton, Dialog } from "@mui/material";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  pageContainer: {
    backgroundColor: "rgb(246, 244, 239)",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  callContainer: {
    borderRadius: "35%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 40,
  },
  buttonContainer: {
    height: "20vh",
    width: "20vh",
    "& svg": {
      fontSize: 100,
    },
  },
  homeButton: {
    position: "fixed !important",
    top: "10px",
  },
});

function Calm() {
  let classes = useStyles();
  const [photoOpen, setPhotoOpen] = React.useState(false);
  const [youTubeOpen, setYouTubeOpen] = React.useState(false);
  localStorage.setItem("image", "photos/chill.jpeg");

  const getVideoId = () => {
    const urlSearchParams = new URLSearchParams(
      localStorage.getItem("videoId")
    );
    const params = Object.fromEntries(urlSearchParams.entries());
    return params[Object.keys(params)[0]];
  };

  const handlePhotoClose = () => {
    setPhotoOpen(false);
  };
  const handleYouTubeClose = () => {
    setYouTubeOpen(false);
  };
  return (
    <div className={classes.pageContainer}>
      <IconButton className={classes.homeButton}>
        <Link to="/">
          <HomeIcon fontSize="large" style={{ color: "#484343" }} />
        </Link>
      </IconButton>

      <Box sx={{ "& button": { m: 1 } }}>
        <div
          className={classes.callContainer}
          style={{
            backgroundColor:
              localStorage.getItem("color") || "rgb(6, 205, 214)",
          }}
        >
          <a href={`tel:${localStorage.getItem("phoneNumber")}`}>
            <IconButton className={classes.buttonContainer}>
              <CallIcon />
            </IconButton>
          </a>
        </div>

        <div
          className={classes.callContainer}
          style={{
            backgroundColor:
              localStorage.getItem("color") || "rgb(6, 205, 214)",
          }}
        >
          <IconButton
            onClick={() => setYouTubeOpen(true)}
            className={classes.buttonContainer}
          >
            <PlayCircleFilledWhiteIcon />
          </IconButton>
        </div>
        <div
          className={classes.callContainer}
          style={{
            backgroundColor:
              localStorage.getItem("color") || "rgb(6, 205, 214)",
          }}
        >
          <IconButton
            onClick={() => setPhotoOpen(true)}
            className={classes.buttonContainer}
          >
            <InsertPhotoIcon />
          </IconButton>
        </div>
      </Box>
      <Dialog
        open={photoOpen}
        onClose={handlePhotoClose}
        aria-labelledby="photo-dialog-title"
        aria-describedby="photo-dialog-description"
      >
        <img src={localStorage.getItem("image")} alt="calm" />
      </Dialog>
      <Dialog
        open={youTubeOpen}
        onClose={handleYouTubeClose}
        aria-labelledby="youTube-dialog-title"
        aria-describedby="youTube-dialog-description"
      >
        <iframe
          id="ytplayer"
          type="text/html"
          width="300"
          height="230"
          src={`https://www.youtube.com/embed/${getVideoId()}?autoplay=1&mute=1&enablejsapi=1`}
          allow="autoplay"
          title="video"
        ></iframe>
      </Dialog>
    </div>
  );
}

export default Calm;
