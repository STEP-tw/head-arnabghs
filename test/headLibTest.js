const assert = require('assert');
const { head, readInput, getHeadByCount } = require('../src/headlib.js');

const generateLines = n => {
  const lines = [];
  for(let i=1;i<=n;i++)
    lines.push(i);
  return lines.join("\n");
}
const dummyFiles = {
  "fifteenLines.txt": generateLines(15),
  "tenLines.txt": generateLines(10),
  "fiveLines.txt": generateLines(5),
  "empty.txt" : generateLines(0)
};
const readFileSync = function(path,encoding){
  if(encoding!='utf-8') return;
  const content = dummyFiles[path];
  if(content == undefined) throw ('no such file ' + path);
  return content;
};
const existsSync = function(path){
  if(dummyFiles[path]==undefined) return false;
  return true;
}
const fs = {readFileSync,existsSync};

describe('head', ()=>{
  describe('node head.js fifteenLines.txt',()=>{
    it('should give first 10 lines',()=>{
      const argv = "node head.js fifteenLines.txt".split(' ');
      const tenLines = generateLines(10);
      assert.deepEqual(head(argv,fs), tenLines);
    });
  });
  describe('node head.js tenLines.txt',()=>{
    it('should give first 10 lines',()=>{
      const argv = "node head.js tenLines.txt".split(' ');
      const tenLines = generateLines(10);
      assert.deepEqual(head(argv,fs), tenLines);
    });
  });
  describe('node head.js fiveLines.txt',()=>{
    it('should give all 5 lines',()=>{
      const argv = "node head.js fiveLines.txt".split(' ');
      const fiveLines = generateLines(5);
      assert.deepEqual(head(argv,fs), fiveLines);
    });
  });
  describe('node head.js empty.txt',()=>{
    it('should give no lines',()=>{
      const argv = "node head.js empty.txt".split(' ');
      const empty = '';
      assert.deepEqual(head(argv,fs), empty);
    });
  });
  describe('node head.js bad.txt',()=>{
    it('should give error message',()=>{
      const argv = "node head.js bad.txt".split(' ');
      const bad = "head: bad.txt: No such file or directory";
      assert.deepEqual(head(argv,fs), bad);
    });
  });
  describe('node head.js fiveLines.txt fifteenLines.txt',()=>{
    it('should give heading with 5 and 10 lines',()=>{
      const argv = "node head.js fiveLines.txt fifteenLines.txt".split(' ');
      let fiveAndFifteenLines = "==> fiveLines.txt <==\n1\n2\n3\n4\n5\n\n";
      fiveAndFifteenLines += "==> fifteenLines.txt <==\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
      assert.deepEqual(head(argv,fs), fiveAndFifteenLines);
    });
  });
  describe('Test for readInput(argv)',()=>{
    it('for only files should return a object consisting all the files in array',()=>{
      const argv = "node head.js fiveLines.txt fifteenLines.txt ".split(' ');
      assert(readInput(argv),{fileNames : ["fiveLines.txt","fifteenLines.txt"]});
    });
  });
  describe('Test for getHeadByCount(content,numberofLines)',()=>{
    it('should return the given number of lines from starting of file',()=>{
      const fifteenLines = generateLines(15);
      const expectedOutput = generateLines(10);
      assert(getHeadByCount(fifteenLines,10),expectedOutput);
    });
  });
});

