// import fetch from "node-fetch";
// import { Headers } from "node-fetch";
const fetch = require("node-fetch");
// Require the module
const fitDecoder = require("fit-decoder");
const decoder = require("fit-file-parser").default;
const extract = require("extract-zip");
const fs = require("fs");
const path = require("path");

fs.mkdirSync("joel", { recursive: true });

const publicPath = path.join(__dirname, "joel");

// fit2json expects binary represetnation in FIT format as ArrayBuffer
// You can get it by reading a file in Node:

exports.resolveFit = async () => {
  const heade = new fetch.Headers({
    cookie:
      "__cflb=02DiuJLbVZHipNWxN8xjNziif9XwiLsQdTv1aKfSTN3Wc; GarminUserPrefs=en-US; notice_behavior=none; _ga=GA1.2.859703256.1652307369; _gid=GA1.2.1309048462.1652307369; __cfruid=f10ab6f42efbec5fd43a5ccf1aef89f8a7df12fe-1652307417; GARMIN-SSO=1; GarminNoCache=true; GARMIN-SSO-GUID=7500D7E9C04F4AF91FDBF3AB3E4F96FE66DC0378; GARMIN-SSO-CUST-GUID=d3295015-7e91-4f57-8857-f9f26b0009df; SESSIONID=YzBiN2FjOTktYTZhYi00NzI2LWJjMDktMzk2OTE1ZTgyZmJj; JWT_FGP=73ecba29-bcbd-4c1b-9406-6eafc8853cbb; CONSENTMGR=consent:true%7Cts:1652307512684; utag_main=v_id:0180b5319982007c7edfc137b74805073007d06b007e8$_sn:1$_ss:0$_st:1652309312688$ses_id:1652307368327%3Bexp-session$_pn:5%3Bexp-session; ADRUM_BTa=R:0|g:d34d29b5-ad0e-4029-8fba-00e2bbd2d519|n:garmin_869629ee-d273-481d-b5a4-f4b0a8c4d5a3; SameSite=None; ADRUM_BT1=R:0|i:259016|e:84; ADRUM_BTs=R:0|s:p",
  });
  const res = await fetch(
    "https://connect.garmin.com/modern/proxy/download-service/files/wellness/2022-05-12",
    { method: "GET", headers: heade }
  );
  const fileStream = fs.createWriteStream("data.zip");
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
  try {
    await extract("data.zip", { dir: publicPath });
    console.log("Extraction complete");
    const files = fs.readdirSync(publicPath);
    const neededFile = files
      .reverse()
      .filter((filename) => filename.includes("WELLNESS"));
    let found = false;
    let index = 1;
    let jsonRaw;
    while (!found) {
      try {
        let file = await fs.promises.readFile(
          path.join(publicPath, neededFile[index])
        );
        let buffer = file.buffer;
        jsonRaw = fitDecoder.fit2json(buffer);
        found = true;
      } catch (e) {
        found = false;
        index += 1;
      }
    }
    console.log(neededFile[index]);

    const { records } = fitDecoder.parseRecords(jsonRaw);
    const heartsRates = records
      .filter(({ data }) => data["heart_rate"] !== undefined)
      .map(({ data }) => data.heart_rate);
    console.log(heartsRates);
    console.log(heartsRates.length);
    fs.rmSync(publicPath, { recursive: true, force: true });
    fs.rmSync("data.zip");
    return heartsRates;
  } catch (err) {
    console.log(err);
    return;
  }
  fs.rmSync(publicPath, { recursive: true, force: true });
  fs.rmSync("data.zip");
};
