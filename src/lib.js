const { readUserInput } = require("./parse.js");

const { handleErrorForHead, handelErrorForTail } = require("./error.js");

const getFirstNItems = function(delimeter, content, numberOfChars) {
  return content
    .split(delimeter)
    .slice(0, numberOfChars)
    .join(delimeter);
};

const getLastNItems = function(delimeter, content, numberOfLines) {
  if (numberOfLines == 0) return "";
  let lines = content.trim().split(delimeter);
  return lines.slice(-numberOfLines).join(delimeter);
};

const utilities = {
  head: {
    line: getFirstNItems.bind(null, "\n"),
    byte: getFirstNItems.bind(null, "")
  },
  tail: {
    line: getLastNItems.bind(null, "\n"),
    byte: getLastNItems.bind(null, "")
  }
};

const getContent = function(command, path, userInputs, fs) {
  if (!fs.existsSync(path))
    return command + ": " + path + ": No such file or directory";
  let content = fs.readFileSync(path, "utf-8");
  let { option, count } = userInputs;
  if (command == "tail") count = Math.abs(count);
  return utilities[command][option](content, count);
};

const getContentWithTitle = function(command, userInputs, fs, path) {
  if (!fs.existsSync(path)) return getContent(command, path, userInputs, fs);
  return [
    "==> " + path + " <==",
    getContent(command, path, userInputs, fs)
  ].join("\n");
};

const formatContent = function(command, fs, userInputs) {
  let { fileNames } = userInputs;
  if (fileNames.length == 1)
    return getContent(command, fileNames[0], userInputs, fs);
  const mapper = getContentWithTitle.bind(null, command, userInputs, fs);
  return fileNames.map(mapper).join("\n");
};

const formatContentForHead = formatContent.bind(null, "head");
const formatContentForTail = formatContent.bind(null, "tail");

const headAndTail = function(command, argv, fs) {
  const formatter = { head: formatContentForHead, tail: formatContentForTail };
  const errorHandler = { head: handleErrorForHead, tail: handelErrorForTail };
  let userInputs = readUserInput(argv);
  let { count, option } = userInputs;
  let { errorExist, errorMsg } = errorHandler[command](count, option);
  if (errorExist) return errorMsg;
  return formatter[command](fs, userInputs);
};

const head = function(argv, fs) {
  return headAndTail("head", argv, fs);
};
const tail = function(argv, fs) {
  return headAndTail("tail", argv, fs);
};

module.exports = {
  getFirstNItems,
  getLastNItems,
  getContent,
  getContentWithTitle,
  formatContent,
  head,
  tail
};
