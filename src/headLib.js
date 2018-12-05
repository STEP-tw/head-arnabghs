const head = function(argv,readFile){
  let fileName = argv[2];
  let content = readFile(fileName,'utf-8');
  let lines = content.split('\n');
  return lines.slice(0,10).join('\n');
}

module.exports = { head };

