const assert = require('assert');
const { 
  head,
  getFirstNLines,
  readUserInput,
  getFirstNChars,
  validateIllegalCountForHead,
  tail,
  getLastNLines,
  getLastNChars
} = require('../src/lib.js');

const generateLines = n => {
  const lines = [];
  for(let i=1;i<=n;i++)
    lines.push(i);
  return lines.join("\n");
}

const generateLinesfromEnd = (x,y) => {
  return generateLines(x).split('\n').slice(-y).join('\n');
}

const dummyFiles = {
  "fifteenLines.txt": generateLines(15),
  "tenLines.txt": generateLines(10),
  "fiveLines.txt": generateLines(5),
  "empty.txt" : generateLines(0),
  "fifteenLinesWithTrailingNewLineChar.txt": generateLines(15)+"\n"
};
const readFileSync = function(path,encoding){
  if(encoding!='utf-8') return;
  const content = dummyFiles[path];
  if(content == undefined) throw ('no such file ' + path);
  return content;
};
const existsSync = function(path){
  return dummyFiles[path] != undefined;
}
const dummyfs = {readFileSync,existsSync};

describe('head', ()=>{
  describe('node head.js fifteenLines.txt',()=>{
    it('should give first 10 lines',()=>{
      const argv = "node head.js fifteenLines.txt".split(' ');
      const tenLines = generateLines(10);
      assert.deepEqual(head(argv,dummyfs), tenLines);
    });
  });
  describe('node head.js tenLines.txt',()=>{
    it('should give first 10 lines',()=>{
      const argv = "node head.js tenLines.txt".split(' ');
      const tenLines = generateLines(10);
      assert.deepEqual(head(argv,dummyfs), tenLines);
    });
  });
  describe('node head.js fiveLines.txt',()=>{
    it('should give all 5 lines',()=>{
      const argv = "node head.js fiveLines.txt".split(' ');
      const fiveLines = generateLines(5);
      assert.deepEqual(head(argv,dummyfs), fiveLines);
    });
  });
  describe('node head.js empty.txt',()=>{
    it('should give no lines',()=>{
      const argv = "node head.js empty.txt".split(' ');
      const empty = '';
      assert.deepEqual(head(argv,dummyfs), empty);
    });
  });
  describe('node head.js bad.txt',()=>{
    it('should give error message',()=>{
      const argv = "node head.js bad.txt".split(' ');
      const bad = "head: bad.txt: No such file or directory";
      assert.deepEqual(head(argv,dummyfs), bad);
    });
  });
  describe('node head.js fiveLines.txt fifteenLines.txt',()=>{
    it('should give heading with 5 and 10 lines',()=>{
      const argv = "node head.js fiveLines.txt fifteenLines.txt".split(' ');

      let fiveAndFifteenLines = "==> fiveLines.txt <==\n"
      fiveAndFifteenLines += generateLines(5) + "\n";
      fiveAndFifteenLines += "==> fifteenLines.txt <==\n"
      fiveAndFifteenLines += generateLines(10);

      assert.deepEqual(head(argv,dummyfs), fiveAndFifteenLines);
    });
  });
  describe('node ./head.js -n5 tenLines.txt',()=>{
    it('should return first 5 lines',()=> {
      const argv = "node head.js -n5 tenLines.txt".split(' ');
      let expectedOutput = generateLines(5);
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node ./head.js -n5 fiveLines.txt tenLines.txt',()=>{
    it('should return first 5 lines of  both files with heading',()=> {
      const argv = "node head.js -n5 fiveLines.txt tenLines.txt".split(' ');
      let expectedOutput = "==> fiveLines.txt <==\n"+generateLines(5)+'\n';
      expectedOutput += "==> tenLines.txt <==\n"+generateLines(5);
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node ./head.js -n 5 fiveLines.txt',()=>{
    it('should return first 5 lines',()=> {
      const argv = "node head.js -n 5 fiveLines.txt".split(' ');
      let expectedOutput = generateLines(5);
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node ./head.js -n 5 fiveLines.txt tenLines.txt',()=>{
    it('should return first 5 lines of  both files with heading',()=> {
      const argv = "node head.js -n 5 fiveLines.txt tenLines.txt".split(' ');
      let expectedOutput = "==> fiveLines.txt <==\n"+generateLines(5)+'\n';
      expectedOutput += "==> tenLines.txt <==\n"+generateLines(5);
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node ./head.js -5 fiveLines.txt',()=>{
    it('should return first 5 lines',()=> {
      const argv = "node head.js -5 fiveLines.txt".split(' ');
      let expectedOutput = generateLines(5);
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node head.js -5 fiveLines.txt tenLines.txt',()=>{
    it('should return first 5 lines of  both files with heading',()=> {
      const argv = "node head.js -5 fiveLines.txt tenLines.txt".split(' ');
      let expectedOutput = "==> fiveLines.txt <==\n"+generateLines(5)+'\n';
      expectedOutput += "==> tenLines.txt <==\n"+generateLines(5);
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node head.js -c10 fifteenLines.txt',()=>{
    it('should return first 10 chars',()=> {
      const argv = "node head.js -c10 fifteenLines.txt".split(' ');
      let expectedOutput = generateLines(5)+'\n';
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node head.js -c5 fiveLines.txt tenLines.txt',()=>{
    it('should return first 5 chars of both files with heading',()=> {
      const argv = "node head.js -c5 fiveLines.txt tenLines.txt".split(' ');
      let expectedOutput = "==> fiveLines.txt <==\n"+generateLines(3)+'\n';
      expectedOutput += "==> tenLines.txt <==\n"+generateLines(3);
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node head.js -c 10 fifteenLines.txt',()=>{
    it('should return first 10 chars',()=> {
      const argv = "node head.js -c 10 fifteenLines.txt".split(' ');
      let expectedOutput = generateLines(5)+'\n';
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node head.js -c 5 fiveLines.txt tenLines.txt',()=>{
    it('should return first 5 chars of both files with heading',()=> {
      const argv = "node head.js -c 5 fiveLines.txt tenLines.txt".split(' ');
      let expectedOutput = "==> fiveLines.txt <==\n"+generateLines(3)+'\n';
      expectedOutput += "==> tenLines.txt <==\n"+generateLines(3);
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node head.js -0 fiveLines.txt',()=>{
    it('should return error messege, head: illegal line count -- 0',()=>{
      const argv = 'node head.js -0 fiveLines.txt'.split(' ');
      let expectedOutput = 'head: illegal line count -- 0';
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node head.js -n 0 fiveLines.txt',()=>{
    it('should return error messege, head: illegal line count -- 0',()=>{
      const argv = 'node head.js -n 0 fiveLines.txt'.split(' ');
      let expectedOutput = 'head: illegal line count -- 0';
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node head.js -c 0 fiveLines.txt',()=>{
    it('should return error messege, head: illegal line count -- 0',()=>{
      const argv = 'node head.js -c 0 fiveLines.txt'.split(' ');
      let expectedOutput = 'head: illegal byte count -- 0';
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node head.js fiveLines.txt badfile.txt',()=>{
    it('should return the present file with heading and error for missing file at the end',()=>{
      const argv = 'node head.js fiveLines.txt badfile.txt'.split(' ');
      let expectedOutput = '==> fiveLines.txt <==\n';
      expectedOutput += generateLines(5)+'\n';
      expectedOutput += "head: badfile.txt: No such file or directory";
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node head.js fiveLines.txt badfile.txt tenLines.txt',()=>{
    it('should return the present files with heading and error for missing file in respective places',()=>{
      const argv = 'node head.js fiveLines.txt badfile.txt tenLines.txt'.split(' ');
      let expectedOutput = '==> fiveLines.txt <==\n';
      expectedOutput += generateLines(5)+'\n';
      expectedOutput += "head: badfile.txt: No such file or directory\n";
      expectedOutput += '==> tenLines.txt <==\n';
      expectedOutput += generateLines(10);

      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node head.js -n r fiveLines.txt',()=>{
    it('should return error messege, head: illegal line count -- r',()=>{
      const argv = 'node head.js -n r fiveLines.txt'.split(' ');
      let expectedOutput = 'head: illegal line count -- r';
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node head.js -n -5 fiveLines.txt',()=>{
    it('should return error messege, head: illegal line count -- -5',()=>{
      const argv = 'node head.js -n -5 fiveLines.txt'.split(' ');
      let expectedOutput = 'head: illegal line count -- -5';
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
    });
  });
  describe('node head.js -n 5x fiveLines.txt',()=>{
    it('should return error messege, head: illegal line count -- 5x',()=>{
      const argv = 'node head.js -n 5x fiveLines.txt'.split(' ');
      let expectedOutput = 'head: illegal line count -- 5x';
      assert.deepEqual(head(argv,dummyfs), expectedOutput);
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

describe('validateIllegalCountForHead',()=>{
  it('should return head: illegal line count -- 0',()=>{
    const argv = 'node head.js -n 0 fiveLines.txt';
    const expectedOutput = "head: illegal line count -- 0";
    assert.deepEqual(validateIllegalCountForHead(0,'line'),expectedOutput);
  });
  it('should return head: illegal byte count -- 0',()=>{
    const argv = 'node head.js -c 0 fiveLines.txt';
    const expectedOutput = "head: illegal byte count -- 0";
    assert.deepEqual(validateIllegalCountForHead(0,'byte'),expectedOutput);
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
    it('should have charcterCount= 10 & fileNames=[one.txt] & type: byte',()=>{
      let user = readUserInput('node head -c10 one.txt'.split(' '));
      assert.deepEqual(user,{ fileNames:['one.txt'], count: 10, type:'byte'});
    });
  });
  describe('node head.js -c5 one.txt two.txt',()=>{
    it('should have count= 5 & fileNames=[one.txt, two.txt] & type: byte',()=>{
      let user = readUserInput('node head -c5 one.txt two.txt'.split(' '));
      assert.deepEqual(user,{count:5,fileNames:['one.txt', 'two.txt'], type:'byte'});
    });
  });
  describe('node head.js -c 10 one.txt ',()=>{
    it('should have charcterCount= 10 & fileNames=[one.txt] & type: byte',()=>{
      let user = readUserInput('node head -c 10 one.txt'.split(' '));
      assert.deepEqual(user,{ fileNames:['one.txt'], count: 10, type:'byte'});
    });
  });
  describe('node head.js -c 5 one.txt two.txt',()=>{
    it('should have count= 5 & fileNames=[one.txt, two.txt] & type: byte',()=>{
      let user = readUserInput('node head -c 5 one.txt two.txt'.split(' '));
      assert.deepEqual(user,{count:5,fileNames:['one.txt', 'two.txt'], type:'byte'});
    });
  });
});

describe('getLastNLines',()=>{
  it('should return the given number of lines from ending of file in correct order',()=>{
    const fifteenLines = generateLines(15);
    const expectedOutput = generateLinesfromEnd(15,10);
    assert.deepEqual(getLastNLines(fifteenLines,10),expectedOutput);
  });
});

describe('getLastNChars',()=>{
  it('should return the given number of chars from ending of file',()=>{
    const fifteenLines = generateLines(10);
    const expectedOutput = generateLinesfromEnd(10,5);
    assert.deepEqual(getLastNChars(fifteenLines,10),expectedOutput);
  });
});


describe('tail', ()=>{
  describe('node tail.js fifteenLines.txt',()=>{
    it('should give last 10 lines',()=>{
      const argv = "node tail.js fifteenLines.txt".split(' ');
      const lastTenLines = generateLinesfromEnd(15,10);
      assert.deepEqual(tail(argv,dummyfs), lastTenLines);
    });
  });
  describe('node tail.js fifteenLinesWithTrailingNewLineChar.txt',()=>{
    it('should give last 10 lines excluding newLineChar',()=>{
      const argv = "node tail.js fifteenLinesWithTrailingNewLineChar.txt".split(' ');
      const lastTenLines = generateLinesfromEnd(15,10);
      assert.deepEqual(tail(argv,dummyfs), lastTenLines);
    });
  });
  describe('node tail.js bad.txt',()=>{
    it('should give error message',()=>{
      const argv = "node tail.js bad.txt".split(' ');
      const bad = "tail: bad.txt: No such file or directory";
      assert.deepEqual(tail(argv,dummyfs), bad);
    });
  });
  describe('node tail.js fiveLines.txt',()=>{
    it('should give all 5 lines',()=>{
      const argv = "node tail.js fiveLines.txt".split(' ');
      const fiveLines = generateLines(5);
      assert.deepEqual(tail(argv,dummyfs), fiveLines);
    });
  });
  describe('node tail.js empty.txt',()=>{
    it('should give no lines',()=>{
      const argv = "node tail.js empty.txt".split(' ');
      const empty = '';
      assert.deepEqual(tail(argv,dummyfs), empty);
    });
  });
  describe('node tail.js fiveLines.txt fifteenLines.txt',()=>{
    it('should give heading with 5 and 10 lines',()=>{
      const argv = "node tail.js fiveLines.txt fifteenLines.txt".split(' ');

      let fiveAndFifteenLines = "==> fiveLines.txt <==\n"
      fiveAndFifteenLines += generateLinesfromEnd(5) + "\n";
      fiveAndFifteenLines += "==> fifteenLines.txt <==\n"
      fiveAndFifteenLines += generateLinesfromEnd(15,10);

      assert.deepEqual(tail(argv,dummyfs), fiveAndFifteenLines);
    });
  })
  describe('node tail.js fiveLines.txt missingFile.txt',()=>{
    it('should give all 5 lines and error message for missing file',()=>{
      const argv = "node tail.js fiveLines.txt missingFile.txt".split(' ');
      let fiveLinesAndMissingFile = "==> fiveLines.txt <==\n"
      fiveLinesAndMissingFile += generateLinesfromEnd(5,5)+'\n';
      fiveLinesAndMissingFile += "tail: missingFile.txt: No such file or directory";
      assert.deepEqual(tail(argv,dummyfs), fiveLinesAndMissingFile);
    });
  })
  describe('node tail.js -n5 tenLines.txt',()=>{
    it('should return last 5 lines',()=> {
      const argv = "node tail.js -n5 tenLines.txt".split(' ');
      let expectedOutput = generateLinesfromEnd(10,5);
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  });
  describe('node tail.js -n5 fiveLines.txt tenLines.txt',()=>{
    it('should return first 5 lines of  both files with heading',()=> {
      const argv = "node tail.js -n5 fiveLines.txt tenLines.txt".split(' ');
      let expectedOutput = "==> fiveLines.txt <==\n"+generateLinesfromEnd(5,5)+'\n';
      expectedOutput += "==> tenLines.txt <==\n"+generateLinesfromEnd(10,5);
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  })
  describe('node ./tail.js -n 5 fiveLines.txt',()=>{
    it('should return last 5 lines',()=> {
      const argv = "node tail.js -n 5 fiveLines.txt".split(' ');
      let expectedOutput = generateLinesfromEnd(5,5);
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  });
  describe('node ./tail.js -n 5 fiveLines.txt tenLines.txt',()=>{
    it('should return last 5 lines of both files with heading',()=> {
      const argv = "node tail.js -n5 fiveLines.txt tenLines.txt".split(' ');
      let expectedOutput = "==> fiveLines.txt <==\n"+generateLinesfromEnd(5,5)+'\n';
      expectedOutput += "==> tenLines.txt <==\n"+generateLinesfromEnd(10,5);
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  });
  describe('node ./tail.js -5 fiveLines.txt',()=>{
    it('should return last 5 lines',()=> {
      const argv = "node tail.js -5 fiveLines.txt".split(' ');
      let expectedOutput = generateLinesfromEnd(5,5);
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  })
  describe('node tail.js -5 fiveLines.txt tenLines.txt',()=>{
    it('should return last 5 lines of  both files with heading',()=> {
      const argv = "node tail.js -5 fiveLines.txt tenLines.txt".split(' ');
      let expectedOutput = "==> fiveLines.txt <==\n"+generateLinesfromEnd(5,5)+'\n';
      expectedOutput += "==> tenLines.txt <==\n"+generateLinesfromEnd(10,5);
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  });
  describe('node tail.js -c12 fifteenLines.txt',()=>{
    it('should return last 12 chars',()=> {
      const argv = "node tail.js -c12 fifteenLines.txt".split(' ');
      let expectedOutput = '\n'+generateLinesfromEnd(15,4);
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  })
  describe('node tail.js -c5 fiveLines.txt tenLines.txt',()=>{
    it('should return last 5 chars of both files with heading',()=> {
      const argv = "node tail.js -c5 fiveLines.txt tenLines.txt".split(' ');
      let expectedOutput = "==> fiveLines.txt <==\n"+generateLinesfromEnd(5,3)+'\n';
      expectedOutput += "==> tenLines.txt <==\n\n"+generateLinesfromEnd(10,2);
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  });
  describe('node tail.js -c 12 fifteenLines.txt',()=>{
    it('should return last 12 chars',()=> {
      const argv = "node tail.js -c 12 fifteenLines.txt".split(' ');
      let expectedOutput = '\n'+generateLinesfromEnd(15,4);
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  });
  describe('node tail.js -c 5 fiveLines.txt tenLines.txt',()=>{
    it('should return last 5 chars of both files with heading',()=> {
      const argv = "node tail.js -c 5 fiveLines.txt tenLines.txt".split(' ');
      let expectedOutput = "==> fiveLines.txt <==\n"+generateLinesfromEnd(5,3)+'\n';
      expectedOutput += "==> tenLines.txt <==\n\n"+generateLinesfromEnd(10,2);
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  });
  describe('node tail.js -n 0 fiveLines.txt',()=>{
    it('should not return anything at all',()=>{
      const argv = "node tail.js -n 0 fiveLines.txt".split(' ');
      assert.deepEqual(tail(argv,dummyfs),'');
    });
  });
  describe('node tail.js -c 0 fiveLines.txt',()=>{
    it('should not return anything at all',()=>{
      const argv = "node tail.js -c 0 fiveLines.txt".split(' ');
      assert.deepEqual(tail(argv,dummyfs),'');
    });
  });
  describe('node tail.js -n r fiveLines.txt',()=>{
    it('should return error messege, tail: illegal offset -- r',()=>{
      const argv = 'node tail.js -n r fiveLines.txt'.split(' ');
      let expectedOutput = 'tail: illegal offset -- r';
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  })
  describe('node tail.js -c r fiveLines.txt',()=>{
    it('should return error messege, tail: illegal offset -- r',()=>{
      const argv = 'node tail.js -c r fiveLines.txt'.split(' ');
      let expectedOutput = 'tail: illegal offset -- r';
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  })
  describe('node tail.js -c -5x fiveLines.txt',()=>{
    it('should return error messege, tail: illegal offset -- -5x',()=>{
      const argv = 'node tail.js -c -5x fiveLines.txt'.split(' ');
      let expectedOutput = 'tail: illegal offset -- -5x';
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  });
  describe('node ./tail.js -n -5 fiveLines.txt',()=>{
    it('should return last 5 lines',()=> {
      const argv = "node tail.js -n -5 fiveLines.txt".split(' ');
      let expectedOutput = generateLinesfromEnd(5,5);
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  });
  describe('node tail.js -c -12 fifteenLines.txt',()=>{
    it('should return last 12 chars',()=> {
      const argv = "node tail.js -c -12 fifteenLines.txt".split(' ');
      let expectedOutput = '\n'+generateLinesfromEnd(15,4);
      assert.deepEqual(tail(argv,dummyfs), expectedOutput);
    });
  })
});