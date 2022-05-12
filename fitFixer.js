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
      "_ga=GA1.2.1956531804.1652281081; _gid=GA1.2.250455932.1652281081; GARMIN-SSO=1; GarminNoCache=true; GARMIN-SSO-GUID=7500D7E9C04F4AF91FDBF3AB3E4F96FE66DC0378; GARMIN-SSO-CUST-GUID=d3295015-7e91-4f57-8857-f9f26b0009df; __cflb=02DiuJLbVZHipNWxN8yYRX3u8XkAfEE59qijhToZtyaz8; G_ENABLED_IDPS=google; notice_behavior=none; _hjSessionUser_1939392=eyJpZCI6Ijk3NmEwOGNmLTc1NWUtNTlhNi05YWNkLWVjODVjZTVmZGM0YSIsImNyZWF0ZWQiOjE2NTIyODEwODExOTIsImV4aXN0aW5nIjp0cnVlfQ==; notice_behavior=none; GarminUserPrefs=en-US; SESSIONID=ZGUwOTg1MzktMzNlNS00NDZjLTkyY2YtZjI4NWM0MDdlYjk5; JWT_FGP=41a2e5c3-932d-468b-a2e0-0c919f048f3e; CONSENTMGR=consent:true%7Cts:1652342007198; utag_main=v_id:0180b3a07a9c000b4ee991c6c65905073003c06b007e8$_sn:10$_ss:0$_st:1652343807201$ses_id:1652341832053%3Bexp-session$_pn:5%3Bexp-session; ADRUM_BTa=R:0|g:c7a405d5-3663-46dc-9564-c3e1f7f4083f|n:garmin_869629ee-d273-481d-b5a4-f4b0a8c4d5a3; SameSite=None; ADRUM_BT1=R:0|i:562400|e:169",
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
    const neededFile = files.filter((filename) =>
      filename.includes("WELLNESS")
    );
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
    const { records } = fitDecoder.parseRecords(jsonRaw);
    const heartsRates = records
      .filter(({ data }) => data["heart_rate"] !== undefined)
      .map(({ data }) => data.heart_rate);
    fs.rmSync(publicPath, { recursive: true, force: true });
    fs.rmSync("data.zip");
    return heartsRates;
  } catch (err) {
    return;
  }
  fs.rmSync(publicPath, { recursive: true, force: true });
  fs.rmSync("data.zip");
};
