const assert = require('assert');
const { head } = require('../src/headlib.js');

const generateLines = n => {
  const lines = [];
  for(let i=1;i<=n;i++)
    lines.push(i);
  return lines.join("\n");
}
describe('head', ()=>{
  describe('node head.js fifteenLines.txt',()=>{
    it('should give first 10 lines',()=>{
      const argv = "node head.js textFiles/fifteenLines.txt".split(' ');
      const readFile = require('fs').readFileSync;
      const tenLines = generateLines(10);
      assert.deepEqual(head(argv,readFile), tenLines);
    });
  });
});
