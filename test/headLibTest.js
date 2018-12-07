const assert = require('assert');
const { head, getFirstNLines, readUserInput, getFirstNChars } = require('../src/headLib.js');

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

      let fiveAndFifteenLines = "==> fiveLines.txt <==\n"
      fiveAndFifteenLines += generateLines(5) + "\n";
      fiveAndFifteenLines += "==> fifteenLines.txt <==\n"
      fiveAndFifteenLines += generateLines(10);

      assert.deepEqual(head(argv,fs), fiveAndFifteenLines);
    });
  });
  describe('node ./head.js -n5 tenLines.txt',()=>{
    it('should return first 5 lines',()=> {
      const argv = "node head.js -n5 tenLines.txt".split(' ');
      let expectedOutput = generateLines(5);
      assert.deepEqual(head(argv,fs), expectedOutput);
    });
  });
  describe('node ./head.js -n5 fiveLines.txt tenLines.txt',()=>{
    it('should return first 5 lines of  both files with heading',()=> {
      const argv = "node head.js -n5 fiveLines.txt tenLines.txt".split(' ');
      let expectedOutput = "==> fiveLines.txt <==\n"+generateLines(5)+'\n';
      expectedOutput += "==> tenLines.txt <==\n"+generateLines(5);
      assert.deepEqual(head(argv,fs), expectedOutput);
    });
  });
  describe('node ./head.js -n 5 fiveLines.txt',()=>{
    it('should return first 5 lines',()=> {
      const argv = "node head.js -n 5 fiveLines.txt".split(' ');
      let expectedOutput = generateLines(5);
      assert.deepEqual(head(argv,fs), expectedOutput);
    });
  });
  describe('node ./head.js -n 5 fiveLines.txt tenLines.txt',()=>{
    it('should return first 5 lines of  both files with heading',()=> {
      const argv = "node head.js -n 5 fiveLines.txt tenLines.txt".split(' ');
      let expectedOutput = "==> fiveLines.txt <==\n"+generateLines(5)+'\n';
      expectedOutput += "==> tenLines.txt <==\n"+generateLines(5);
      assert.deepEqual(head(argv,fs), expectedOutput);
    });
  });
  describe('node ./head.js -5 fiveLines.txt',()=>{
    it('should return first 5 lines',()=> {
      const argv = "node head.js -5 fiveLines.txt".split(' ');
      let expectedOutput = generateLines(5);
      assert.deepEqual(head(argv,fs), expectedOutput);
    });
  });
  describe('node head.js -5 fiveLines.txt tenLines.txt',()=>{
    it('should return first 5 lines of  both files with heading',()=> {
      const argv = "node head.js -5 fiveLines.txt tenLines.txt".split(' ');
      let expectedOutput = "==> fiveLines.txt <==\n"+generateLines(5)+'\n';
      expectedOutput += "==> tenLines.txt <==\n"+generateLines(5);
      assert.deepEqual(head(argv,fs), expectedOutput);
    });
  });
  describe('node head.js -c10 fifteenLines.txt',()=>{
    it('should return first 10 chars',()=> {
      const argv = "node head.js -c10 fifteenLines.txt".split(' ');
      let expectedOutput = generateLines(5)+'\n';
      assert.deepEqual(head(argv,fs), expectedOutput);
    });
  });
});

describe('getFirstNLines',()=>{
  it('should return the given number of lines from starting of file',()=>{
    const fifteenLines = generateLines(15);
    const expectedOutput = generateLines(10);
    assert.deepEqual(getFirstNLines(fifteenLines,10),expectedOutput);
  });
});

describe('getFirstNChars',()=>{
  it('should return the given number of chars from starting of file',()=>{
    const fifteenLines = generateLines(15);
    const expectedOutput = generateLines(5)+'\n';
    assert.deepEqual(getFirstNChars(fifteenLines,10),expectedOutput);
  });
});

describe('readUserInput',()=>{
  describe('node head one.txt',()=>{
    it('should have count=10 & fileNames=[one.txt] & type: line',()=>{
      let user = readUserInput('node head one.txt'.split(' '));
      assert.deepEqual(user,{count:10,fileNames:['one.txt'], type: 'line'});
    })
  })
  describe('node head.js one.txt two.txt',()=>{
    it('should have count= 10 & fileNames=[one.txt, two.txt] & type: line',()=>{
      let user = readUserInput('node head one.txt two.txt'.split(' '));
      assert.deepEqual(user,{count:10,fileNames:['one.txt', 'two.txt'], type: 'line'});
    });
  });
  describe('node head.js -n5 one.txt ',()=>{
    it('should have count= 5 & fileNames=[one.txt] & type: line',()=>{
      let user = readUserInput('node head -n5 one.txt'.split(' '));
      assert.deepEqual(user,{count:5,fileNames:['one.txt'], type: 'line'});
    });
  });
  describe('node head.js -n5 one.txt two.txt',()=>{
    it('should have count= 5 & fileNames=[one.txt, two.txt] & type: line',()=>{
      let user = readUserInput('node head -n5 one.txt two.txt'.split(' '));
      assert.deepEqual(user,{count:5,fileNames:['one.txt', 'two.txt'], type: 'line'});
    });
  });
  describe('node head.js -n 5 one.txt ',()=>{
    it('should have count= 5 & fileNames=[one.txt] & type: line',()=>{
      let user = readUserInput('node head -n 5 one.txt'.split(' '));
      assert.deepEqual(user,{count:5,fileNames:['one.txt'], type: 'line'});
    });
  });
  describe('node head.js -n 5 one.txt two.txt',()=>{
    it('should have count= 5 & fileNames=[one.txt, two.txt] & type: line',()=>{
      let user = readUserInput('node head -n 5 one.txt two.txt'.split(' '));
      assert.deepEqual(user,{count:5,fileNames:['one.txt', 'two.txt'], type: 'line'});
    });
  });
  describe('node head.js -5 one.txt ',()=>{
    it('should have count= 5 & fileNames=[one.txt] & type: line',()=>{
      let user = readUserInput('node head -5 one.txt'.split(' '));
      assert.deepEqual(user,{count:5,fileNames:['one.txt'], type: 'line'});
    });
  });
  describe('node head.js -5 one.txt two.txt',()=>{
    it('should have count= 5 & fileNames=[one.txt, two.txt] & type: line',()=>{
      let user = readUserInput('node head -5 one.txt two.txt'.split(' '));
      assert.deepEqual(user,{count:5,fileNames:['one.txt', 'two.txt'], type:'line'});
    });
  });
  describe('node head.js -c10 one.txt ',()=>{
    it('should have charcterCount= 10 & fileNames=[one.txt] & type: char',()=>{
      let user = readUserInput('node head -c10 one.txt'.split(' '));
      assert.deepEqual(user,{ fileNames:['one.txt'], count: 10, type:'char'});
    });
  });
});
