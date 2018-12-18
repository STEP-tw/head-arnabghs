const getCountAndFilenames = function(argv, userInput) {
  userInput.count = argv[2].slice(2);
  userInput.fileNames = argv.slice(3);
  if (argv[2].length == 2) {
    userInput.count = argv[3];
    userInput.fileNames = argv.slice(4);
  }
  return userInput;
};

const readUserInput = function(argv) {
  let userInput = { fileNames: argv.slice(2), count: 10, option: "line" };
  if (argv[2].startsWith("-c")) {
    userInput = getCountAndFilenames(argv, userInput);
    userInput.option = "byte";
    return userInput;
  }
  if (argv[2].startsWith("-")) {
    userInput = getCountAndFilenames(argv, userInput);
    if (!isNaN(argv[2].charAt(1))) {
      userInput.count = argv[2].slice(1);
      userInput.fileNames = argv.slice(3);
    }
  }
  return userInput;
};

module.exports = {
  readUserInput
};