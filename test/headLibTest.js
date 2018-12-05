const assert = require('assert');
const { head } = require('../src/headlib.js');

const generateLines = n => {
  const lines = [];
  for(let i=1;i<=n;i++)
    lines.push(i);
  return lines.join("\n");
}
const dummyFiles = {
  "fifteenLines.txt": generateLines(15),
  "tenLines.txt": generateLines(10),
  "fiveLines.txt": generateLines(5)
};
const dummyReadFile = function(path,encoding){
  if(encoding!='utf-8') return;
  const content = dummyFiles[path];
  if(content == undefined) throw ('no such file ' + path);
  return content;
}
describe('head', ()=>{
  describe('node head.js fifteenLines.txt',()=>{
    it('should give first 10 lines',()=>{
      const argv = "node head.js fifteenLines.txt".split(' ');
      const tenLines = generateLines(10);
      assert.deepEqual(head(argv,dummyReadFile), tenLines);
    });
  });
  describe('node head.js tenLines.txt',()=>{
    it('should give first 10 lines',()=>{
      const argv = "node head.js tenLines.txt".split(' ');
      const tenLines = generateLines(10);
      assert.deepEqual(head(argv,dummyReadFile), tenLines);
    });
  });
  describe('node head.js fiveLines.txt',()=>{
    it('should give all 5 lines',()=>{
      const argv = "node head.js fiveLines.txt".split(' ');
      const fiveLines = generateLines(5);
      assert.deepEqual(head(argv,dummyReadFile), fiveLines);
    });
  });
});
