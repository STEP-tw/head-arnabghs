const assert = require("assert");
const {
  getFirstNItems,
  getLastNItems,
  getContent,
  getContentWithTitle,
  formatContent,
  headAndTail
} = require("../src/lib.js");

const dummyFiles = {
  "fifteenLines.txt": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15",
  "tenLines.txt": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
  "fiveLines.txt": "1\n2\n3\n4\n5",
  "empty.txt": "",
  "fifteenLinesWithTrailingNewLineChar.txt":
    "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n"
};
const readFileSync = function(path, encoding) {
  if (encoding != "utf-8") return;
  const content = dummyFiles[path];
  if (content == undefined) throw "no such file " + path;
  return content;
};
const existsSync = function(path) {
  return dummyFiles[path] != undefined;
};
const dummyfs = {
  readFileSync,
  existsSync
};

describe("headAndTail", () => {
  describe("head", () => {
    describe("node head.js fifteenLines.txt", () => {
      it("should give first 10 lines by default if no count is given", () => {
        const argv = "node head.js fifteenLines.txt".split(" ");
        const tenLines = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
        assert.deepEqual(headAndTail(argv, dummyfs), tenLines);
      });
    });
    describe("node head.js tenLines.txt", () => {
      it("should give first 10 lines by default if no count is given", () => {
        const argv = "node head.js tenLines.txt".split(" ");
        const tenLines = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
        assert.deepEqual(headAndTail(argv, dummyfs), tenLines);
      });
    });
    describe("node head.js fiveLines.txt", () => {
      it("should give all the lines if count is not given and file is less than 10 lines", () => {
        const argv = "node head.js fiveLines.txt".split(" ");
        const fiveLines = "1\n2\n3\n4\n5";
        assert.deepEqual(headAndTail(argv, dummyfs), fiveLines);
      });
    });
    describe("node head.js empty.txt", () => {
      it("should give no lines if file is empty", () => {
        const argv = "node head.js empty.txt".split(" ");
        const empty = "";
        assert.deepEqual(headAndTail(argv, dummyfs), empty);
      });
    });
    describe("node head.js bad.txt", () => {
      it("should give error message for missing file", () => {
        const argv = "node head.js bad.txt".split(" ");
        const bad = "head: bad.txt: No such file or directory";
        assert.deepEqual(headAndTail(argv, dummyfs), bad);
      });
    });
    describe("node head.js fiveLines.txt fifteenLines.txt", () => {
      it("should give heading with content if there is more than one file", () => {
        const argv = "node head.js fiveLines.txt fifteenLines.txt".split(" ");

        let fiveAndFifteenLines = "==> fiveLines.txt <==\n";
        fiveAndFifteenLines += "1\n2\n3\n4\n5\n";
        fiveAndFifteenLines += "==> fifteenLines.txt <==\n";
        fiveAndFifteenLines += "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

        assert.deepEqual(headAndTail(argv, dummyfs), fiveAndFifteenLines);
      });
    });
    describe("node ./head.js -n5 tenLines.txt", () => {
      it("should return first 5 lines", () => {
        const argv = "node head.js -n5 tenLines.txt".split(" ");
        let expectedOutput = "1\n2\n3\n4\n5";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node ./head.js -n5 fiveLines.txt tenLines.txt", () => {
      it("should return first 5 lines of both files with heading", () => {
        const argv = "node head.js -n5 fiveLines.txt tenLines.txt".split(" ");
        let expectedOutput = "==> fiveLines.txt <==\n" + "1\n2\n3\n4\n5\n";
        expectedOutput += "==> tenLines.txt <==\n" + "1\n2\n3\n4\n5";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node ./head.js -n 5 fiveLines.txt", () => {
      it("should return first 5 lines", () => {
        const argv = "node head.js -n 5 fiveLines.txt".split(" ");
        let expectedOutput = "1\n2\n3\n4\n5";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node ./head.js -n 5 fiveLines.txt tenLines.txt", () => {
      it("should return first 5 lines of both files with heading", () => {
        const argv = "node head.js -n 5 fiveLines.txt tenLines.txt".split(" ");
        let expectedOutput = "==> fiveLines.txt <==\n" + "1\n2\n3\n4\n5\n";
        expectedOutput += "==> tenLines.txt <==\n" + "1\n2\n3\n4\n5";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node ./head.js -5 fiveLines.txt", () => {
      it("should return first 5 lines", () => {
        const argv = "node head.js -5 fiveLines.txt".split(" ");
        let expectedOutput = "1\n2\n3\n4\n5";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node head.js -5 fiveLines.txt tenLines.txt", () => {
      it("should return first 5 lines of both files with heading", () => {
        const argv = "node head.js -5 fiveLines.txt tenLines.txt".split(" ");
        let expectedOutput = "==> fiveLines.txt <==\n" + "1\n2\n3\n4\n5\n";
        expectedOutput += "==> tenLines.txt <==\n" + "1\n2\n3\n4\n5";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node head.js -c10 fifteenLines.txt", () => {
      it("should return first 10 chars", () => {
        const argv = "node head.js -c10 fifteenLines.txt".split(" ");
        let expectedOutput = "1\n2\n3\n4\n5\n";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node head.js -c5 fiveLines.txt tenLines.txt", () => {
      it("should return first 5 chars of both files with heading", () => {
        const argv = "node head.js -c5 fiveLines.txt tenLines.txt".split(" ");
        let expectedOutput = "==> fiveLines.txt <==\n" + "1\n2\n3\n";
        expectedOutput += "==> tenLines.txt <==\n" + "1\n2\n3";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node head.js -c 10 fifteenLines.txt", () => {
      it("should return first 10 chars", () => {
        const argv = "node head.js -c 10 fifteenLines.txt".split(" ");
        let expectedOutput = "1\n2\n3\n4\n5\n";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node head.js -c 5 fiveLines.txt tenLines.txt", () => {
      it("should return first 5 chars of both files with heading", () => {
        const argv = "node head.js -c 5 fiveLines.txt tenLines.txt".split(" ");
        let expectedOutput = "==> fiveLines.txt <==\n" + "1\n2\n3\n";
        expectedOutput += "==> tenLines.txt <==\n" + "1\n2\n3";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node head.js -0 fiveLines.txt", () => {
      it("should return error messege for count 0", () => {
        const argv = "node head.js -0 fiveLines.txt".split(" ");
        let expectedOutput = "head: illegal line count -- 0";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node head.js -n 0 fiveLines.txt", () => {
      it("should return error messege for count 0", () => {
        const argv = "node head.js -n 0 fiveLines.txt".split(" ");
        let expectedOutput = "head: illegal line count -- 0";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node head.js -c 0 fiveLines.txt", () => {
      it("should return error messege for count 0", () => {
        const argv = "node head.js -c 0 fiveLines.txt".split(" ");
        let expectedOutput = "head: illegal byte count -- 0";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node head.js fiveLines.txt badfile.txt", () => {
      it("should return the present file with heading and error for missing file at the end", () => {
        const argv = "node head.js fiveLines.txt badfile.txt".split(" ");
        let expectedOutput = "==> fiveLines.txt <==\n";
        expectedOutput += "1\n2\n3\n4\n5" + "\n";
        expectedOutput += "head: badfile.txt: No such file or directory";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node head.js fiveLines.txt badfile.txt tenLines.txt", () => {
      it("should return the present files with heading and error for missing file in respective places", () => {
        const argv = "node head.js fiveLines.txt badfile.txt tenLines.txt".split(
          " "
        );
        let expectedOutput = "==> fiveLines.txt <==\n";
        expectedOutput += "1\n2\n3\n4\n5\n";
        expectedOutput += "head: badfile.txt: No such file or directory\n";
        expectedOutput += "==> tenLines.txt <==\n";
        expectedOutput += "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node head.js -n r fiveLines.txt", () => {
      it("should return error messege if count given is an alphabet", () => {
        const argv = "node head.js -n r fiveLines.txt".split(" ");
        let expectedOutput = "head: illegal line count -- r";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node head.js -n -5 fiveLines.txt", () => {
      it("should return error messege if count given is a -ve number", () => {
        const argv = "node head.js -n -5 fiveLines.txt".split(" ");
        let expectedOutput = "head: illegal line count -- -5";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node head.js -n 5x fiveLines.txt", () => {
      it("should return error messege if given count is not a proper number", () => {
        const argv = "node head.js -n 5x fiveLines.txt".split(" ");
        let expectedOutput = "head: illegal line count -- 5x";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
  });
  describe("tail", () => {
    describe("node tail.js fifteenLines.txt", () => {
      it("should give last 10 lines as default if no count or option is given", () => {
        const argv = "node tail.js fifteenLines.txt".split(" ");
        const lastTenLines = "6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
        assert.deepEqual(headAndTail(argv, dummyfs), lastTenLines);
      });
    });
    describe("node tail.js fifteenLinesWithTrailingNewLineChar.txt", () => {
      it("should give last 10 lines excluding newLineChar", () => {
        const argv = "node tail.js fifteenLinesWithTrailingNewLineChar.txt".split(
          " "
        );
        const lastTenLines = "6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
        assert.deepEqual(headAndTail(argv, dummyfs), lastTenLines);
      });
    });
    describe("node tail.js bad.txt", () => {
      it("should give error message for missing file", () => {
        const argv = "node tail.js bad.txt".split(" ");
        const bad = "tail: bad.txt: No such file or directory";
        assert.deepEqual(headAndTail(argv, dummyfs), bad);
      });
    });
    describe("node tail.js fiveLines.txt", () => {
      it("should give all the lines if the file has less than ten lines", () => {
        const argv = "node tail.js fiveLines.txt".split(" ");
        const fiveLines = "1\n2\n3\n4\n5";
        assert.deepEqual(headAndTail(argv, dummyfs), fiveLines);
      });
    });
    describe("node tail.js empty.txt", () => {
      it("should give empty string for empty file", () => {
        const argv = "node tail.js empty.txt".split(" ");
        const empty = "";
        assert.deepEqual(headAndTail(argv, dummyfs), empty);
      });
    });
    describe("node tail.js fiveLines.txt fifteenLines.txt", () => {
      it("should give heading with content when there is more than one file", () => {
        const argv = "node tail.js fiveLines.txt fifteenLines.txt".split(" ");

        let fiveAndFifteenLines = "==> fiveLines.txt <==\n";
        fiveAndFifteenLines += "1\n2\n3\n4\n5\n";
        fiveAndFifteenLines += "==> fifteenLines.txt <==\n";
        fiveAndFifteenLines += "6\n7\n8\n9\n10\n11\n12\n13\n14\n15";

        assert.deepEqual(headAndTail(argv, dummyfs), fiveAndFifteenLines);
      });
    });
    describe("node tail.js fiveLines.txt missingFile.txt", () => {
      it("should give all 5 lines and error message for missing file", () => {
        const argv = "node tail.js fiveLines.txt missingFile.txt".split(" ");
        let fiveLinesAndMissingFile = "==> fiveLines.txt <==\n";
        fiveLinesAndMissingFile += "1\n2\n3\n4\n5\n";
        fiveLinesAndMissingFile +=
          "tail: missingFile.txt: No such file or directory";
        assert.deepEqual(headAndTail(argv, dummyfs), fiveLinesAndMissingFile);
      });
    });
    describe("node tail.js -n5 tenLines.txt", () => {
      it("should return given number of lines from end of file", () => {
        const argv = "node tail.js -n5 tenLines.txt".split(" ");
        let expectedOutput = "6\n7\n8\n9\n10";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node tail.js -n5 fiveLines.txt tenLines.txt", () => {
      it("should return first 5 lines of both files with heading", () => {
        const argv = "node tail.js -n5 fiveLines.txt tenLines.txt".split(" ");
        let expectedOutput = "==> fiveLines.txt <==\n" + "1\n2\n3\n4\n5\n";
        expectedOutput += "==> tenLines.txt <==\n" + "6\n7\n8\n9\n10";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node ./tail.js -n 5 fiveLines.txt", () => {
      it("should return given number of lines from end of file", () => {
        const argv = "node tail.js -n 5 fiveLines.txt".split(" ");
        let expectedOutput = "1\n2\n3\n4\n5";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node ./tail.js -n 5 fiveLines.txt tenLines.txt", () => {
      it("should return last 5 lines of both files with heading", () => {
        const argv = "node tail.js -n5 fiveLines.txt tenLines.txt".split(" ");
        let expectedOutput = "==> fiveLines.txt <==\n" + "1\n2\n3\n4\n5\n";
        expectedOutput += "==> tenLines.txt <==\n" + "6\n7\n8\n9\n10";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node ./tail.js -5 fiveLines.txt", () => {
      it("should return given number of lines from end of file", () => {
        const argv = "node tail.js -5 fiveLines.txt".split(" ");
        let expectedOutput = "1\n2\n3\n4\n5";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node tail.js -5 fiveLines.txt tenLines.txt", () => {
      it("should return last 5 lines of  both files with heading", () => {
        const argv = "node tail.js -5 fiveLines.txt tenLines.txt".split(" ");
        let expectedOutput = "==> fiveLines.txt <==\n" + "1\n2\n3\n4\n5\n";
        expectedOutput += "==> tenLines.txt <==\n" + "6\n7\n8\n9\n10";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node tail.js -c12 fifteenLines.txt", () => {
      it("should return the given number of characters from end of file", () => {
        const argv = "node tail.js -c12 fifteenLines.txt".split(" ");
        let expectedOutput = "\n12\n13\n14\n15";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node tail.js -c5 fiveLines.txt tenLines.txt", () => {
      it("should return heading with content when number of files is more than one", () => {
        const argv = "node tail.js -c5 fiveLines.txt tenLines.txt".split(" ");
        let expectedOutput = "==> fiveLines.txt <==\n" + "3\n4\n5\n";
        expectedOutput += "==> tenLines.txt <==\n\n" + "9\n10";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node tail.js -c 12 fifteenLines.txt", () => {
      it("should return given number of characters from end of file", () => {
        const argv = "node tail.js -c 12 fifteenLines.txt".split(" ");
        let expectedOutput = "\n" + "12\n13\n14\n15";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node tail.js -c 5 fiveLines.txt tenLines.txt", () => {
      it("should return heading with content when number of files is more than one", () => {
        const argv = "node tail.js -c 5 fiveLines.txt tenLines.txt".split(" ");
        let expectedOutput = "==> fiveLines.txt <==\n" + "3\n4\n5\n";
        expectedOutput += "==> tenLines.txt <==\n\n" + "9\n10";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node tail.js -n 0 fiveLines.txt", () => {
      it("should return empty string for count 0", () => {
        const argv = "node tail.js -n 0 fiveLines.txt".split(" ");
        assert.deepEqual(headAndTail(argv, dummyfs), "");
      });
    });
    describe("node tail.js -c 0 fiveLines.txt", () => {
      it("should return empty string for count 0", () => {
        const argv = "node tail.js -c 0 fiveLines.txt".split(" ");
        assert.deepEqual(headAndTail(argv, dummyfs), "");
      });
    });
    describe("node tail.js -n 0 fiveLines.txt tenLines.txt", () => {
      it("should return empty string with heading of the files", () => {
        const argv = "node tail.js -n 0 fiveLines.txt tenLines.txt".split(" ");
        const expectedOutput =
          "==> fiveLines.txt <==\n" + "\n==> tenLines.txt <==\n";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node tail.js -c 0 fiveLines.txt tenLines.txt", () => {
      it("should return empty string with heading of the files", () => {
        const argv = "node tail.js -c 0 fiveLines.txt tenLines.txt".split(" ");
        const expectedOutput =
          "==> fiveLines.txt <==\n" + "\n==> tenLines.txt <==\n";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node tail.js -n r fiveLines.txt", () => {
      it("should return error messege if given count is alphabet", () => {
        const argv = "node tail.js -n r fiveLines.txt".split(" ");
        let expectedOutput = "tail: illegal offset -- r";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node tail.js -c r fiveLines.txt", () => {
      it("should return error messege if given count is alphabet", () => {
        const argv = "node tail.js -c r fiveLines.txt".split(" ");
        let expectedOutput = "tail: illegal offset -- r";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node tail.js -c -5x fiveLines.txt", () => {
      it("should return error messege if given count is not a proper number", () => {
        const argv = "node tail.js -c -5x fiveLines.txt".split(" ");
        let expectedOutput = "tail: illegal offset -- -5x";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node ./tail.js -n -5 fiveLines.txt", () => {
      it("should return last 5 lines even if the count is -ve number", () => {
        const argv = "node tail.js -n -5 fiveLines.txt".split(" ");
        let expectedOutput = "1\n2\n3\n4\n5";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
    describe("node tail.js -c -12 fifteenLines.txt", () => {
      it("should return last 12 chars for -ve count also", () => {
        const argv = "node tail.js -c -12 fifteenLines.txt".split(" ");
        let expectedOutput = "\n" + "12\n13\n14\n15";
        assert.deepEqual(headAndTail(argv, dummyfs), expectedOutput);
      });
    });
  });
});

describe("getFirstNItems", () => {
  describe("For line option or '\\n' as delimeter", () => {
    it("should return the given number of lines from starting of file", () => {
      const fifteenLines = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
      const expectedOutput = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
      assert.deepEqual(getFirstNItems("\n", fifteenLines, 10), expectedOutput);
    });
  });
  describe("For byte option or '' as delimeter", () => {
    it("should return the given number of chars from starting of file", () => {
      const fifteenLines = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
      const expectedOutput = "1\n2\n3\n4\n5" + "\n";
      assert.deepEqual(getFirstNItems("", fifteenLines, 10), expectedOutput);
    });
  });
});

describe("getLastNItems", () => {
  describe("For line option or '\\n' as delimeter", () => {
    it("should return the given number of lines from ending of file in correct order", () => {
      const fifteenLines = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
      const expectedOutput = "6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
      assert.deepEqual(getLastNItems("\n", fifteenLines, 10), expectedOutput);
    });
  });
  describe("For byte option or '' as delimeter", () => {
    it("should return the given number of chars from ending of file", () => {
      const fifteenLines = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
      const expectedOutput = "6\n7\n8\n9\n10";
      assert.deepEqual(getLastNItems("", fifteenLines, 10), expectedOutput);
    });
  });
});

describe("getContent", () => {
  describe("for head command and line option and count 10", () => {
    it("should return the whole file if the file has less than 10 lines", () => {
      let path = "fiveLines.txt";
      let command = "head";
      let userInputs = { option: "line", count: 10 };
      let actualOutput = getContent(command, path, userInputs, dummyfs);
      let expectedOutput = "1\n2\n3\n4\n5";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for head command and byte option and count 11", () => {
    it("should return the first 11 chars", () => {
      let path = "fifteenLines.txt";
      let command = "head";
      let userInputs = { option: "byte", count: 11 };
      let actualOutput = getContent(command, path, userInputs, dummyfs);
      let expectedOutput = "1\n2\n3\n4\n5\n6";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for tail command and line option and count 10", () => {
    it("should return the last 10 lines of the file", () => {
      let path = "fifteenLines.txt";
      let command = "tail";
      let userInputs = { option: "line", count: 10 };
      let actualOutput = getContent(command, path, userInputs, dummyfs);
      let expectedOutput = "6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for tail command and byte option and count 5", () => {
    it("should return the last 5 chars", () => {
      let path = "fiveLines.txt";
      let command = "tail";
      let userInputs = { option: "byte", count: 5 };
      let actualOutput = getContent(command, path, userInputs, dummyfs);
      let expectedOutput = "3\n4\n5";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for missing file with head command and line option", () => {
    it("should throw an error", () => {
      let path = "missingFile.txt";
      let command = "head";
      let userInputs = { option: "line", count: 10 };
      let actualOutput = getContent(command, path, userInputs, dummyfs);
      let expectedOutput =
        command + ": " + path + ": No such file or directory";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("getContentWithTitle", () => {
  describe("for head command and line option with count 10", () => {
    it("should append the path name before the content", () => {
      let command = "head";
      let userInputs = { option: "line", count: 10 };
      let path = "fiveLines.txt";
      let actualOutput = getContentWithTitle(
        command,
        userInputs,
        dummyfs,
        path
      );
      let expectedOutput =
        "==> " + "fiveLines.txt" + " <==\n" + "1\n2\n3\n4\n5";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for tail command and byte option and count 7", () => {
    it("should append the path name before the content", () => {
      let command = "tail";
      let userInputs = { option: "byte", count: 7 };
      let path = "fiveLines.txt";
      let actualOutput = getContentWithTitle(
        command,
        userInputs,
        dummyfs,
        path
      );
      let expectedOutput = "==> " + "fiveLines.txt" + " <==\n" + "2\n3\n4\n5";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for missing file with head command and line option", () => {
    it("should throw an error", () => {
      let path = "missingFile.txt";
      let command = "head";
      let userInputs = { option: "line", count: 10 };
      let actualOutput = getContentWithTitle(
        command,
        userInputs,
        dummyfs,
        path
      );
      let expectedOutput =
        command + ": " + path + ": No such file or directory";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("formatContent", () => {
  describe("for single file with head and option line", () => {
    it("should return the given number of lines from beginning of file", () => {
      let command = "head";
      let userInputs = {
        fileNames: ["fiveLines.txt"],
        option: "line",
        count: 10
      };
      let actualOutput = formatContent(command, dummyfs, userInputs);
      let expectedOutput = "1\n2\n3\n4\n5";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for multiple files with head and option byte", () => {
    it("should return the given number of chars from beginning of file", () => {
      let command = "head";
      let userInputs = {
        fileNames: ["fiveLines.txt", "fifteenLines.txt"],
        option: "byte",
        count: 5
      };
      let actualOutput = formatContent(command, dummyfs, userInputs);
      let expectedOutput = "==> fiveLines.txt <==\n" + "1\n2\n3";
      expectedOutput += "\n==> fifteenLines.txt <==\n" + "1\n2\n3";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for single file with tail and option line", () => {
    it("should return the given number of lines from end of file", () => {
      let command = "tail";
      let userInputs = {
        fileNames: ["fifteenLines.txt"],
        option: "line",
        count: 10
      };
      let actualOutput = formatContent(command, dummyfs, userInputs);
      let expectedOutput = "6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for multiple files with tail and option byte", () => {
    it("should return the given number of chars from end of file", () => {
      let command = "tail";
      let userInputs = {
        fileNames: ["fiveLines.txt", "fifteenLines.txt"],
        option: "byte",
        count: 5
      };
      let actualOutput = formatContent(command, dummyfs, userInputs);
      let expectedOutput = "==> fiveLines.txt <==\n" + "3\n4\n5";
      expectedOutput += "\n==> fifteenLines.txt <==\n" + "14\n15";
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
