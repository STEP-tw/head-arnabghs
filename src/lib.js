const readUserInput = function (argv) {
  const userInput = {
    fileNames: argv.slice(2),
    count: 10,
    type: 'line'
  };
  if (argv[2].startsWith('-c')) {
    userInput.count = (argv[2].length == 2) ? argv[3] : argv[2].slice(2);
    userInput.fileNames = (argv[2].length == 2) ? argv.slice(4) : argv.slice(3);
    userInput.type = 'byte';
    return userInput;
  }
  if (argv[2].startsWith('-')) {
    userInput.count = (argv[2].length == 2) ? argv[3] : argv[2].slice(2);
    userInput.fileNames = (argv[2].length == 2) ? argv.slice(4) : argv.slice(3);
    if (!isNaN(argv[2].charAt(1))) {
      userInput.count = argv[2].slice(1);
      userInput.fileNames = argv.slice(3);
    }
  }
  return userInput;
}

const head = function (argv, fs) {
  let {
    fileNames,
    count,
    type
  } = readUserInput(argv);
  if (isNaN(count)) return validateIllegalCountForHead(count, type);
  count = +count;
  if (count < 1) return validateIllegalCountForHead(count, type);
  let getHeadLines = function (path) {
    if (!fs.existsSync(path))
      return 'head: ' + path + ': No such file or directory';
    let content = fs.readFileSync(path, 'utf-8');
    let get = (type == 'byte') ? getFirstNChars : getFirstNLines;
    return get(content, count);
  }
  let getHeadLinesWithTitle = function (path) {
    if (!fs.existsSync(path)) return getHeadLines(path);
    return ["==> " + path + " <==", getHeadLines(path)].join('\n');
  }
  if (fileNames.length == 1) return getHeadLines(fileNames[0]);
  return fileNames.map(getHeadLinesWithTitle).join('\n');
}

const validateIllegalCountForHead = function (count, type) {
  return 'head: illegal ' + type + ' count -- ' + count;
}

const getFirstNLines = function (content, numberOfLines) {
  return content.split('\n').slice(0, numberOfLines).join('\n');
}

const getFirstNChars = function (content, numberOfChars) {
  return content.split('').slice(0, numberOfChars).join('');
}

const tail = function (argv, fs) {
  let {
    fileNames,
    count,
    type
  } = readUserInput(argv);
  if (isNaN(count)) return 'tail: illegal offset -- ' + count;
  count = Math.abs(+count);
  if (count == 0) return '';
  let getTailLines = function (path) {
    if (!fs.existsSync(path))
      return 'tail: ' + path + ': No such file or directory';
    let content = fs.readFileSync(path, 'utf-8');
    let get = (type == 'byte') ? getLastNChars : getLastNLines;
    return get(content, count);
  }
  let getTailLinesWithTitle = function (path) {
    if (!fs.existsSync(path)) return getTailLines(path);
    return ["==> " + path + " <==", getTailLines(path)].join('\n');
  }
  if (fileNames.length == 1) return getTailLines(fileNames[0]);
  return fileNames.map(getTailLinesWithTitle).join('\n');
}

const getLastNLines = function (content, numberOfLines) {
  let lines = content.trim().split('\n');
  return lines.slice(-numberOfLines).join('\n');
}

const getLastNChars = function (content, numberOfChars) {
  let chars = content.split('');
  return chars.slice(-numberOfChars).join('');
}

module.exports = {
  head,
  getFirstNLines,
  readUserInput,
  getFirstNChars,
  validateIllegalCountForHead,
  tail,
  getLastNLines,
  getLastNChars
};