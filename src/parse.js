const getCountAndFilenames = function(argv, userInput) {
  userInput.count = argv[2].slice(2);
  userInput.fileNames = argv.slice(3);
  if (argv[2].length == 2) {
    userInput.count = argv[3];
    userInput.fileNames = argv.slice(4);
  }
  return userInput;
};

const handleOnlyNumberCase = function(argv, userInput) {
  userInput.count = argv[2].slice(1);
  userInput.fileNames = argv.slice(3);
  return userInput;
};
const isOnlyNumber = function(argv) {
  return !isNaN(argv[2].charAt(1));
};

const readUserInput = function(argv) {
  let userInput = { fileNames: argv.slice(2), count: 10, option: "line" };
  if (isOnlyNumber(argv)) return handleOnlyNumberCase(argv, userInput);
  if (argv[2].startsWith("-c")) {
    userInput = getCountAndFilenames(argv, userInput);
    userInput.option = "byte";
  }
  if (argv[2].startsWith("-n")) {
    userInput = getCountAndFilenames(argv, userInput);
  }
  return userInput;
};

module.exports = {
  readUserInput
};
