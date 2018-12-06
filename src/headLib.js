const readUserInput = function(argv){
  const userInput = {
    fileNames: argv.slice(2),
    linesCount: 10
  };
  if (argv[2].startsWith('-')) {
    userInput.linesCount = +argv[2].slice(2);
    userInput.fileNames = argv.slice(3);
  }
  return userInput;
}
const head = function(argv,fs){
  const {fileNames,linesCount} = readUserInput(argv);
  let getHeadLines = function(path){
    if(!fs.existsSync(path)) 
      return 'head: '+path+': No such file or directory'; 
    let content = fs.readFileSync(path,'utf-8');
    return getFirstNLines(content,linesCount);
  }
  let getHeadLinesWithTitle = function(path){
    return ["==> "+path+" <==",getHeadLines(path)].join('\n');
  }
  if(fileNames.length == 1) return getHeadLines(fileNames[0]);
  return fileNames.map(getHeadLinesWithTitle).join('\n');
}

const getFirstNLines = function(content,numberOfLines){
  return content.split('\n').slice(0,numberOfLines).join('\n');
}

module.exports = { head, getFirstNLines, readUserInput};
