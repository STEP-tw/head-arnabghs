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

const isOptionByte = function(argv) {
  return argv[2].startsWith("-c");
};

const isOptionLine = function(argv) {
  return argv[2].startsWith("-n");
};
const isOptionProvided = function(argv) {
  return isOptionByte(argv) || isOptionLine(argv);
};

const readUserInput = function(argv) {
  const validOptionsList = { c: "byte", n: "line" };
  let userInput = {
    command: argv[1].slice(0, 4),
    fileNames: argv.slice(2),
    count: 10,
    option: "line"
  };
  if (isOnlyNumber(argv)) return handleOnlyNumberCase(argv, userInput);
  if (isOptionProvided(argv)) {
    userInput = getCountAndFilenames(argv, userInput);
    userInput.option = validOptionsList[argv[2][1]];
  }
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
