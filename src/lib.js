const { readUserInput } = require("./parse.js");

const { checkErrors } = require("./error.js");

const getFirstNLines = function(content, numberOfLines) {
  return content
    .split("\n")
    .slice(0, numberOfLines)
    .join("\n");
};

const getFirstNChars = function(content, numberOfChars) {
  return content
    .split("")
    .slice(0, numberOfChars)
    .join("");
};

const getLastNLines = function(content, numberOfLines) {
  let lines = content.trim().split("\n");
  return lines.slice(-numberOfLines).join("\n");
};

const getLastNChars = function(content, numberOfChars) {
  let chars = content.split("");
  return chars.slice(-numberOfChars).join("");
};

const formatContent = function(command, fs, fileNames, option, count) {
  let getContent = function(path) {
    if (!fs.existsSync(path))
      return command + ": " + path + ": No such file or directory";
    let content = fs.readFileSync(path, "utf-8");
    let getChar = command == "tail" ? getLastNChars : getFirstNChars;
    let getLine = command == "tail" ? getLastNLines : getFirstNLines;
    let get = option == "byte" ? getChar : getLine;
    return get(content, count);
  };
  let getContentWithTitle = function(path) {
    if (!fs.existsSync(path)) return getContent(path);
    return ["==> " + path + " <==", getContent(path)].join("\n");
  };
  if (fileNames.length == 1) return getContent(fileNames[0]);
  return fileNames.map(getContentWithTitle).join("\n");
};

const formatContentForHead = formatContent.bind(null, "head");
const formatContentForTail = formatContent.bind(null, "tail");

const head = function(argv, fs) {
  let { fileNames, count, option } = readUserInput(argv);
  let { errorExist, errorMsg } = checkErrors("head", count, option);
  if (errorExist) return errorMsg;
  return formatContentForHead(fs, fileNames, option, count);
};

const tail = function(argv, fs) {
  let { fileNames, count, option } = readUserInput(argv);
  let { errorExist, errorMsg } = checkErrors("tail", count, option);
  if (errorExist) return errorMsg;
  count = Math.abs(+count);
  return formatContentForTail(fs, fileNames, option, count);
};

module.exports = {
  head,
  getFirstNLines,
  getFirstNChars,
  tail,
  getLastNLines,
  getLastNChars
};
