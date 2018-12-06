const head = function(argv,fs){
  let fileNames = readInput(argv).fileNames;
  let trimmedLines = [];
  let delimeter = [];
  for (fileName of fileNames){
    if(!fs.existsSync(fileName)) 
      return 'head: '+fileName+': No such file or directory';
    let content = fs.readFileSync(fileName,'utf-8');
    let heading = "==> "+fileName+" <=="
    let lines = getHeadByCount(content,10);
    if (fileNames.length > 1) lines.unshift(heading);
    trimmedLines = trimmedLines.concat(delimeter,lines);
    delimeter = [''];
  }
  return trimmedLines.join('\n');
}

const readInput = function(argv){
  let fileNames = argv.slice(2);
  return { fileNames : fileNames };
}

const getHeadByCount = function(content,numberOfLines){
  return content.split('\n').slice(0,numberOfLines);
}

module.exports = { head,readInput, getHeadByCount };

