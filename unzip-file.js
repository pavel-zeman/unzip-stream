const unzipper = require("unzipper");

(async () => {
  const directory = await unzipper.Open.file("invalid.zip")
  for (const file of directory.files) {
    let size = 0;
    const stream = file.stream();
    stream.on("data", (chunk) => size += chunk.length);
    await new Promise((resolve) => stream.on("finish", resolve));
    console.log(`File: ${file.path}, size: ${size} bytes`);
  }
  console.log("Finished processing all entries");
})();
