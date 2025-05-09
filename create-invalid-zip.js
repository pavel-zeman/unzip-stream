const JSZip = require("jszip");
const fs = require("fs");

const zipItem = new JSZip();
for(let i = 0; i < 3; i++) {
  const content = Array.from({ length: 100 }, (_, j) => String.fromCharCode(j)).join("");
  zipItem.file(`dummy-${i}.txt`, content);
}

zipItem.generateAsync({ type: "nodebuffer", streamFiles: true })
  .then((content) => {
    const zip = new JSZip();
    for (let i = 0; i < 2; i++) {
      zip.file(`invalid-item-${i}.zip`, content);
    }
    zip.generateNodeStream({ type: "nodebuffer", streamFiles: true })
      .pipe(fs.createWriteStream("invalid.zip"));
  });
