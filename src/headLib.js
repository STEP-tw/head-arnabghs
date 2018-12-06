const head = function(argv,fs){
  let fileNames = argv.slice(2);
  let length = 10;
  if (argv[2][0] == '-') {
    length = +argv[2].slice(2);
    fileNames = argv.slice(3);
  }
  let finalOutput = [];
  let delimeter = [];
  for (fileName of fileNames){
    if(!fs.existsSync(fileName)) 
      return 'head: '+fileName+': No such file or directory';
    let content = fs.readFileSync(fileName,'utf-8');
    let heading = "==> "+fileName+" <=="
    let lines = getHeadByCount(content,length);
    if (fileNames.length > 1) lines.unshift(heading);
    finalOutput = finalOutput.concat(delimeter,lines);
    delimeter = [''];
  }
  return finalOutput.join('\n');
}

const getHeadByCount = function(content,numberOfLines){
  return content.split('\n').slice(0,numberOfLines);
}

module.exports = { head, getHeadByCount };
