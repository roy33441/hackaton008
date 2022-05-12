// const http = require("http");
const path = require("path");
const { resolveFit } = require("./fitFixer");

const port = process.env.PORT || 3000;

const express = require("express");
const app = express();

const publicPath = path.join(__dirname, "build");

app.use(express.static(publicPath));

app.use("/api/garmin", async (req, res) => {
  res.send(await resolveFit());
});

app.use("/api/mail", (req, res) => {
  var nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");

  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "hac.hashlama@gmail.com",
        pass: "alintheloser123456",
      },
    })
  );

  var mailOptions = {
    from: "hac.hashlama@gmail.com",
    to: "aviv.pavlovsky@gmail.com",
    subject: "נירוונה",
    text: "היי, יש שינוי מדדים בקרב ילדתך שים לב",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello World");
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at ${port}/`);
});
