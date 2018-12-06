const head = function(argv,fs){
  let fileNames = argv.slice(2);

  let trimmedLines = [];
  for (file of fileNames){
  if(!fs.existsSync(file)) 
    return 'head: '+file+': No such file or directory';
  let content = fs.readFileSync(file,'utf-8');
  let lines = content.split('\n');
    trimmedLines = lines.slice(0,10);
  }
  return trimmedLines.join('\n');
}

module.exports = { head };

