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

const hasOption = function(userArgs) {
  return userArgs[0].startsWith("-");
};

const isOptionValid = function(userArgs) {
  return userArgs[0][1] == "n" || userArgs[0][1] == "c";
};

const onlyDoubleDashArg = function(userArgs) {
  return userArgs[0] == "--";
};

const readUserInput = function(userArgs) {
  const validOptions = { c: "byte", n: "line" };
  let userInput = { fileNames: userArgs, count: 10, option: "line" };
  if (isOnlyNumber(userArgs)) return handleOnlyNumberCase(userArgs, userInput);
  if (onlyDoubleDashArg(userArgs)) {
    userInput.fileNames = userArgs.slice(1);
    return userInput;
  }
  if (hasOption(userArgs)) {
    userInput = getCountAndFilenames(userArgs, userInput);
    userInput.option = userArgs[0][1];
    if (isOptionValid(userArgs))
      userInput.option = validOptions[userArgs[0][1]];
  }
  return userInput;
};

module.exports = {
  getCountAndFilenames,
  handleOnlyNumberCase,
  isOnlyNumber,
  readUserInput
};
