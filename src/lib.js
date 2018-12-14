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

const formatContent = function (command, fs, fileNames, type, count) {
  let getContent = function (path) {
    if (!fs.existsSync(path))
      return command + ': ' + path + ': No such file or directory';
    let content = fs.readFileSync(path, 'utf-8');
    let getChar = (command == 'tail') ? getLastNChars : getFirstNChars;
    let getLine = (command == 'tail') ? getLastNLines : getFirstNLines;
    let get = (type == 'byte') ? getChar : getLine;
    return get(content, count);
  }
  let getContentWithTitle = function (path) {
    if (!fs.existsSync(path)) return getContent(path);
    return ["==> " + path + " <==", getContent(path)].join('\n');
  }
  if (fileNames.length == 1) return getContent(fileNames[0]);
  return fileNames.map(getContentWithTitle).join('\n');
}

const formatContentForHead = formatContent.bind(null, 'head')
const formatContentForTail = formatContent.bind(null, 'tail')

const head = function (argv, fs) {
  let {
    fileNames,
    count,
    type
  } = readUserInput(argv);
  if (isNaN(count)) return validateIllegalCountForHead(count, type);
  count = +count;
  if (count < 1) return validateIllegalCountForHead(count, type);
  return formatContentForHead(fs, fileNames, type, count);
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
  return formatContentForTail(fs, fileNames, type, count);
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