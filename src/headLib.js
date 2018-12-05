const head = function(argv,fs){
  let fileName = argv[2];
  if(!fs.existsSync(fileName)) 
    return 'head: '+fileName+': No such file or directory';
  let content = fs.readFileSync(fileName,'utf-8');
  let lines = content.split('\n');
  return lines.slice(0,10).join('\n');
}

module.exports = { head };

