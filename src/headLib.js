const readUserInput = function(argv){
  const userInput = { fileNames: argv.slice(2), count: 10, type: 'line' };
  if (argv[2].startsWith('-c')){
    userInput.count = (argv[2].length == 2) ? +argv[3] : +argv[2].slice(2);
    userInput.fileNames = (argv[2].length == 2) ? argv.slice(4) : argv.slice(3);
    userInput.type = 'byte';
    return userInput;
  }
  if (argv[2].startsWith('-')) {
    userInput.count = (argv[2].length == 2) ? +argv[3] : +argv[2].slice(2);
    userInput.fileNames = (argv[2].length == 2) ? argv.slice(4) : argv.slice(3);
    if(!isNaN(argv[2].charAt(1))) {
      userInput.count = +argv[2].slice(1);
      userInput.fileNames = argv.slice(3);
    }
  }
  return userInput;
}

const head = function(argv,fs){
  const {fileNames,count,type } = readUserInput(argv);
  if (count === 0) return validateIllegalCount(count,type);
  let getHeadLines = function(path){
    if(!fs.existsSync(path)) 
      return 'head: '+path+': No such file or directory'; 
    let content = fs.readFileSync(path,'utf-8');
    let get = (type == 'byte') ? getFirstNChars : getFirstNLines;
    return get(content,count);
  }
  let getHeadLinesWithTitle = function(path){
    return ["==> "+path+" <==",getHeadLines(path)].join('\n');
  }
  if(fileNames.length == 1) return getHeadLines(fileNames[0]);
  return fileNames.map(getHeadLinesWithTitle).join('\n');
}

const validateIllegalCount = function(count, type){
  return 'head: illegal '+ type +' count -- '+count ;
}

const getFirstNLines = function(content,numberOfLines){
  return content.split('\n').slice(0,numberOfLines).join('\n');
}

const getFirstNChars = function(content, numberOfChars){
  return content.split('').slice(0,numberOfChars).join('');
}

module.exports = { 
  head,
  getFirstNLines,
  readUserInput,
  getFirstNChars,
  validateIllegalCount };
