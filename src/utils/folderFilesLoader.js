const fs = require("fs");
const path = require("path");

const folderFilesLoader = (folderPath, excludes = []) => {
  return fs.readdirSync(folderPath).reduce((fileHash, file) => {
    const isARealFile = file.indexOf(".") !== 0 && file.slice(-3) === ".js";
    const fileName = file.slice(0, -3);
    if (!isARealFile || excludes.includes(fileName)) return fileHash;
    const required = require(path.join(folderPath, file));
    fileHash[fileName] = required;
    return fileHash;
  }, {});
};

module.exports = folderFilesLoader;
