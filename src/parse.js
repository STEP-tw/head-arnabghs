const readUserInput = function(argv) {
  const userInput = {
    fileNames: argv.slice(2),
    count: 10,
    option: "line"
  };
  if (argv[2].startsWith("-c")) {
    userInput.count = argv[2].length == 2 ? argv[3] : argv[2].slice(2);
    userInput.fileNames = argv[2].length == 2 ? argv.slice(4) : argv.slice(3);
    userInput.option = "byte";
    return userInput;
  }
  if (argv[2].startsWith("-")) {
    userInput.count = argv[2].length == 2 ? argv[3] : argv[2].slice(2);
    userInput.fileNames = argv[2].length == 2 ? argv.slice(4) : argv.slice(3);
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
