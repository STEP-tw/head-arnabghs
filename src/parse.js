const getCountAndFilenames = function(userArgs, userInput) {
  userInput.count = userArgs[0].slice(2);
  userInput.fileNames = userArgs.slice(1);
  if (userArgs[0].length == 2) {
    userInput.count = userArgs[1];
    userInput.fileNames = userArgs.slice(2);
  }
  return userInput;
};

const handleOnlyNumberCase = function(userArgs, userInput) {
  userInput.count = userArgs[0].slice(1);
  userInput.fileNames = userArgs.slice(1);
  return userInput;
};

const isOnlyNumber = function(userArgs) {
  return !isNaN(userArgs[0].charAt(1));
};

const isOptionByte = function(userArgs) {
  return userArgs[0].startsWith("-c");
};

const isOptionLine = function(userArgs) {
  return userArgs[0].startsWith("-n");
};
const isOptionProvided = function(userArgs) {
  return isOptionByte(userArgs) || isOptionLine(userArgs);
};

const onlyDoubleDashArg = function(userArgs) {
  return userArgs[0] == "--";
};

const readUserInput = function(userArgs) {
  const validOptionsList = { c: "byte", n: "line" };
  let userInput = { fileNames: userArgs, count: 10, option: "line" };
  if (isOnlyNumber(userArgs)) return handleOnlyNumberCase(userArgs, userInput);
  if (isOptionProvided(userArgs)) {
    userInput = getCountAndFilenames(userArgs, userInput);
    userInput.option = validOptionsList[userArgs[0][1]];
  }
  if (onlyDoubleDashArg(userArgs)) userInput.fileNames = userArgs.slice(1);
  return userInput;
};

module.exports = {
  getCountAndFilenames,
  handleOnlyNumberCase,
  isOnlyNumber,
  isOptionByte,
  isOptionLine,
  isOptionProvided,
  readUserInput
};
