const assert = require('assert');
const { head } = require('../src/headlib.js');

const generateLines = n => {
  const lines = [];
  for(let i=1;i<=n;i++)
    lines.push(i);
  return lines.join("\n");
}
const dummyReadFile = function(path,encoding){
  if(encoding!='utf-8') return;
  if(path=='fifteenLines.txt') return generateLines(15);
}
describe('head', ()=>{
  describe('node head.js fifteenLines.txt',()=>{
    it('should give first 10 lines',()=>{
      const argv = "node head.js fifteenLines.txt".split(' ');
      const tenLines = generateLines(10);
      assert.deepEqual(head(argv,dummyReadFile), tenLines);
    });
  });
});
