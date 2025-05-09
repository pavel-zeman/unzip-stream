const fs = require("fs");
const unzip = require("unzip-stream");

fs.createReadStream("invalid.zip")
  .pipe(unzip.Parse())
  .on("entry", async (entry) => {
    let size = 0;
    entry.on("data", (chunk) => size += chunk.length);
    entry.on("end", () => console.log(`File: ${entry.path}, size: ${size} bytes`));
  })
  .on("finish", () => console.log("Finished processing all entries"))
  .on("error", (err) => console.error("Error during processing:", err));
