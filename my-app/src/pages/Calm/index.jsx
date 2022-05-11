import React from "react";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import CallIcon from "@mui/icons-material/Call";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { IconButton, Dialog } from "@mui/material";

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
    backgroundColor: "rgb(6, 205, 214)",
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
});

function Calm() {
  const classes = useStyles();
  const [photoOpen, setPhotoOpen] = React.useState(false);
  const [youTubeOpen, setYouTubeOpen] = React.useState(false);
  localStorage.setItem("image", "photos/chill.jpeg");

  const handlePhotoClose = () => {
    setPhotoOpen(false);
  };
  const handleYouTubeClose = () => {
    setYouTubeOpen(false);
  };
  return (
    <div className={classes.pageContainer}>
      <Box sx={{ "& button": { m: 1 } }}>
        <div className={classes.callContainer}>
          <a href={`tel:${localStorage.getItem("phoneNumber")}`}>
            <IconButton className={classes.buttonContainer}>
              <CallIcon />
            </IconButton>
          </a>
        </div>
        <div className={classes.callContainer}>
          <IconButton
            onClick={() => setYouTubeOpen(true)}
            className={classes.buttonContainer}
          >
            <PlayCircleFilledWhiteIcon />
          </IconButton>
        </div>
        <div className={classes.callContainer}>
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
          src={`https://www.youtube.com/embed/${localStorage.getItem(
            "videoId"
          )}?autoplay=1&mute=1&enablejsapi=1`}
          allow="autoplay"
          title="video"
        ></iframe>
      </Dialog>
    </div>
  );
}

export default Calm;
