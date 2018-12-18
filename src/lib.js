const { readUserInput } = require("./parse.js");

const { handleErrorForHead, handelErrorForTail } = require("./error.js");

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
  if (numberOfLines == 0) return "";
  let lines = content.trim().split("\n");
  return lines.slice(-numberOfLines).join("\n");
};

const getLastNChars = function(content, numberOfChars) {
  if (numberOfChars == 0) return "";
  let chars = content.split("");
  return chars.slice(-numberOfChars).join("");
};

const utilities = {
  head: { line: getFirstNLines, byte: getFirstNChars },
  tail: { line: getLastNLines, byte: getLastNChars }
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

const head = function(argv, fs) {
  let userInputs = readUserInput(argv);
  let { count, option } = userInputs;
  let { errorExist, errorMsg } = handleErrorForHead(count, option);
  if (errorExist) return errorMsg;
  return formatContentForHead(fs, userInputs);
};

const tail = function(argv, fs) {
  let userInputs = readUserInput(argv);
  let { count, option } = userInputs;
  let { errorExist, errorMsg } = handelErrorForTail(count, option);
  if (errorExist) return errorMsg;
  return formatContentForTail(fs, userInputs);
};

module.exports = {
  getFirstNLines,
  getFirstNChars,
  getLastNLines,
  getLastNChars,
  getContent,
  getContentWithTitle,
  formatContent,
  head,
  tail
};
