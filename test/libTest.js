const assert = require("assert");
const {
  getFirstNItems,
  getLastNItems,
  getContent,
  getContentWithTitle,
  formatContent,
  head,
  tail
} = require("../src/lib.js");

const generateLines = n => {
  const lines = [];
  for (let i = 1; i <= n; i++) lines.push(i);
  return lines.join("\n");
};

const generateLinesfromEnd = (x, y) => {
  return generateLines(x)
    .split("\n")
    .slice(-y)
    .join("\n");
};

const dummyFiles = {
  "fifteenLines.txt": generateLines(15),
  "tenLines.txt": generateLines(10),
  "fiveLines.txt": generateLines(5),
  "empty.txt": generateLines(0),
  "fifteenLinesWithTrailingNewLineChar.txt": generateLines(15) + "\n"
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

describe("head", () => {
  describe("node head.js fifteenLines.txt", () => {
    it("should give first 10 lines", () => {
      const argv = "node head.js fifteenLines.txt".split(" ");
      const tenLines = generateLines(10);
      assert.deepEqual(head(argv, dummyfs), tenLines);
    });
  });
  describe("node head.js tenLines.txt", () => {
    it("should give first 10 lines", () => {
      const argv = "node head.js tenLines.txt".split(" ");
      const tenLines = generateLines(10);
      assert.deepEqual(head(argv, dummyfs), tenLines);
    });
  });
  describe("node head.js fiveLines.txt", () => {
    it("should give all 5 lines", () => {
      const argv = "node head.js fiveLines.txt".split(" ");
      const fiveLines = generateLines(5);
      assert.deepEqual(head(argv, dummyfs), fiveLines);
    });
  });
  describe("node head.js empty.txt", () => {
    it("should give no lines", () => {
      const argv = "node head.js empty.txt".split(" ");
      const empty = "";
      assert.deepEqual(head(argv, dummyfs), empty);
    });
  });
  describe("node head.js bad.txt", () => {
    it("should give error message", () => {
      const argv = "node head.js bad.txt".split(" ");
      const bad = "head: bad.txt: No such file or directory";
      assert.deepEqual(head(argv, dummyfs), bad);
    });
  });
  describe("node head.js fiveLines.txt fifteenLines.txt", () => {
    it("should give heading with 5 and 10 lines", () => {
      const argv = "node head.js fiveLines.txt fifteenLines.txt".split(" ");

      let fiveAndFifteenLines = "==> fiveLines.txt <==\n";
      fiveAndFifteenLines += generateLines(5) + "\n";
      fiveAndFifteenLines += "==> fifteenLines.txt <==\n";
      fiveAndFifteenLines += generateLines(10);

      assert.deepEqual(head(argv, dummyfs), fiveAndFifteenLines);
    });
  });
  describe("node ./head.js -n5 tenLines.txt", () => {
    it("should return first 5 lines", () => {
      const argv = "node head.js -n5 tenLines.txt".split(" ");
      let expectedOutput = generateLines(5);
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node ./head.js -n5 fiveLines.txt tenLines.txt", () => {
    it("should return first 5 lines of  both files with heading", () => {
      const argv = "node head.js -n5 fiveLines.txt tenLines.txt".split(" ");
      let expectedOutput = "==> fiveLines.txt <==\n" + generateLines(5) + "\n";
      expectedOutput += "==> tenLines.txt <==\n" + generateLines(5);
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node ./head.js -n 5 fiveLines.txt", () => {
    it("should return first 5 lines", () => {
      const argv = "node head.js -n 5 fiveLines.txt".split(" ");
      let expectedOutput = generateLines(5);
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node ./head.js -n 5 fiveLines.txt tenLines.txt", () => {
    it("should return first 5 lines of  both files with heading", () => {
      const argv = "node head.js -n 5 fiveLines.txt tenLines.txt".split(" ");
      let expectedOutput = "==> fiveLines.txt <==\n" + generateLines(5) + "\n";
      expectedOutput += "==> tenLines.txt <==\n" + generateLines(5);
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node ./head.js -5 fiveLines.txt", () => {
    it("should return first 5 lines", () => {
      const argv = "node head.js -5 fiveLines.txt".split(" ");
      let expectedOutput = generateLines(5);
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node head.js -5 fiveLines.txt tenLines.txt", () => {
    it("should return first 5 lines of  both files with heading", () => {
      const argv = "node head.js -5 fiveLines.txt tenLines.txt".split(" ");
      let expectedOutput = "==> fiveLines.txt <==\n" + generateLines(5) + "\n";
      expectedOutput += "==> tenLines.txt <==\n" + generateLines(5);
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node head.js -c10 fifteenLines.txt", () => {
    it("should return first 10 chars", () => {
      const argv = "node head.js -c10 fifteenLines.txt".split(" ");
      let expectedOutput = generateLines(5) + "\n";
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node head.js -c5 fiveLines.txt tenLines.txt", () => {
    it("should return first 5 chars of both files with heading", () => {
      const argv = "node head.js -c5 fiveLines.txt tenLines.txt".split(" ");
      let expectedOutput = "==> fiveLines.txt <==\n" + generateLines(3) + "\n";
      expectedOutput += "==> tenLines.txt <==\n" + generateLines(3);
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node head.js -c 10 fifteenLines.txt", () => {
    it("should return first 10 chars", () => {
      const argv = "node head.js -c 10 fifteenLines.txt".split(" ");
      let expectedOutput = generateLines(5) + "\n";
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node head.js -c 5 fiveLines.txt tenLines.txt", () => {
    it("should return first 5 chars of both files with heading", () => {
      const argv = "node head.js -c 5 fiveLines.txt tenLines.txt".split(" ");
      let expectedOutput = "==> fiveLines.txt <==\n" + generateLines(3) + "\n";
      expectedOutput += "==> tenLines.txt <==\n" + generateLines(3);
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node head.js -0 fiveLines.txt", () => {
    it("should return error messege, head: illegal line count -- 0", () => {
      const argv = "node head.js -0 fiveLines.txt".split(" ");
      let expectedOutput = "head: illegal line count -- 0";
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node head.js -n 0 fiveLines.txt", () => {
    it("should return error messege, head: illegal line count -- 0", () => {
      const argv = "node head.js -n 0 fiveLines.txt".split(" ");
      let expectedOutput = "head: illegal line count -- 0";
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node head.js -c 0 fiveLines.txt", () => {
    it("should return error messege, head: illegal line count -- 0", () => {
      const argv = "node head.js -c 0 fiveLines.txt".split(" ");
      let expectedOutput = "head: illegal byte count -- 0";
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node head.js fiveLines.txt badfile.txt", () => {
    it("should return the present file with heading and error for missing file at the end", () => {
      const argv = "node head.js fiveLines.txt badfile.txt".split(" ");
      let expectedOutput = "==> fiveLines.txt <==\n";
      expectedOutput += generateLines(5) + "\n";
      expectedOutput += "head: badfile.txt: No such file or directory";
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node head.js fiveLines.txt badfile.txt tenLines.txt", () => {
    it("should return the present files with heading and error for missing file in respective places", () => {
      const argv = "node head.js fiveLines.txt badfile.txt tenLines.txt".split(
        " "
      );
      let expectedOutput = "==> fiveLines.txt <==\n";
      expectedOutput += generateLines(5) + "\n";
      expectedOutput += "head: badfile.txt: No such file or directory\n";
      expectedOutput += "==> tenLines.txt <==\n";
      expectedOutput += generateLines(10);

      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node head.js -n r fiveLines.txt", () => {
    it("should return error messege, head: illegal line count -- r", () => {
      const argv = "node head.js -n r fiveLines.txt".split(" ");
      let expectedOutput = "head: illegal line count -- r";
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node head.js -n -5 fiveLines.txt", () => {
    it("should return error messege, head: illegal line count -- -5", () => {
      const argv = "node head.js -n -5 fiveLines.txt".split(" ");
      let expectedOutput = "head: illegal line count -- -5";
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
  describe("node head.js -n 5x fiveLines.txt", () => {
    it("should return error messege, head: illegal line count -- 5x", () => {
      const argv = "node head.js -n 5x fiveLines.txt".split(" ");
      let expectedOutput = "head: illegal line count -- 5x";
      assert.deepEqual(head(argv, dummyfs), expectedOutput);
    });
  });
});

describe("getFirstNItems", () => {
  describe("For line option or '\\n' as delimeter", () => {
    it("should return the given number of lines from starting of file", () => {
      const fifteenLines = generateLines(15);
      const expectedOutput = generateLines(10);
      assert.deepEqual(getFirstNItems("\n", fifteenLines, 10), expectedOutput);
    });
  });
  describe("For byte option or '' as delimeter", () => {
    it("should return the given number of chars from starting of file", () => {
      const fifteenLines = generateLines(15);
      const expectedOutput = generateLines(5) + "\n";
      assert.deepEqual(getFirstNItems("", fifteenLines, 10), expectedOutput);
    });
  });
});

describe("getLastNItems", () => {
  describe("For line option or '\\n' as delimeter", () => {
    it("should return the given number of lines from ending of file in correct order", () => {
      const fifteenLines = generateLines(15);
      const expectedOutput = generateLinesfromEnd(15, 10);
      assert.deepEqual(getLastNItems("\n", fifteenLines, 10), expectedOutput);
    });
  });
  describe("For byte option or '' as delimeter", () => {
    it("should return the given number of chars from ending of file", () => {
      const fifteenLines = generateLines(10);
      const expectedOutput = generateLinesfromEnd(10, 5);
      assert.deepEqual(getLastNItems("", fifteenLines, 10), expectedOutput);
    });
  });
});

describe("tail", () => {
  describe("node tail.js fifteenLines.txt", () => {
    it("should give last 10 lines", () => {
      const argv = "node tail.js fifteenLines.txt".split(" ");
      const lastTenLines = generateLinesfromEnd(15, 10);
      assert.deepEqual(tail(argv, dummyfs), lastTenLines);
    });
  });
  describe("node tail.js fifteenLinesWithTrailingNewLineChar.txt", () => {
    it("should give last 10 lines excluding newLineChar", () => {
      const argv = "node tail.js fifteenLinesWithTrailingNewLineChar.txt".split(
        " "
      );
      const lastTenLines = generateLinesfromEnd(15, 10);
      assert.deepEqual(tail(argv, dummyfs), lastTenLines);
    });
  });
  describe("node tail.js bad.txt", () => {
    it("should give error message", () => {
      const argv = "node tail.js bad.txt".split(" ");
      const bad = "tail: bad.txt: No such file or directory";
      assert.deepEqual(tail(argv, dummyfs), bad);
    });
  });
  describe("node tail.js fiveLines.txt", () => {
    it("should give all 5 lines", () => {
      const argv = "node tail.js fiveLines.txt".split(" ");
      const fiveLines = generateLines(5);
      assert.deepEqual(tail(argv, dummyfs), fiveLines);
    });
  });
  describe("node tail.js empty.txt", () => {
    it("should give no lines", () => {
      const argv = "node tail.js empty.txt".split(" ");
      const empty = "";
      assert.deepEqual(tail(argv, dummyfs), empty);
    });
  });
  describe("node tail.js fiveLines.txt fifteenLines.txt", () => {
    it("should give heading with 5 and 10 lines", () => {
      const argv = "node tail.js fiveLines.txt fifteenLines.txt".split(" ");

      let fiveAndFifteenLines = "==> fiveLines.txt <==\n";
      fiveAndFifteenLines += generateLinesfromEnd(5) + "\n";
      fiveAndFifteenLines += "==> fifteenLines.txt <==\n";
      fiveAndFifteenLines += generateLinesfromEnd(15, 10);

      assert.deepEqual(tail(argv, dummyfs), fiveAndFifteenLines);
    });
  });
  describe("node tail.js fiveLines.txt missingFile.txt", () => {
    it("should give all 5 lines and error message for missing file", () => {
      const argv = "node tail.js fiveLines.txt missingFile.txt".split(" ");
      let fiveLinesAndMissingFile = "==> fiveLines.txt <==\n";
      fiveLinesAndMissingFile += generateLinesfromEnd(5, 5) + "\n";
      fiveLinesAndMissingFile +=
        "tail: missingFile.txt: No such file or directory";
      assert.deepEqual(tail(argv, dummyfs), fiveLinesAndMissingFile);
    });
  });
  describe("node tail.js -n5 tenLines.txt", () => {
    it("should return last 5 lines", () => {
      const argv = "node tail.js -n5 tenLines.txt".split(" ");
      let expectedOutput = generateLinesfromEnd(10, 5);
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node tail.js -n5 fiveLines.txt tenLines.txt", () => {
    it("should return first 5 lines of  both files with heading", () => {
      const argv = "node tail.js -n5 fiveLines.txt tenLines.txt".split(" ");
      let expectedOutput =
        "==> fiveLines.txt <==\n" + generateLinesfromEnd(5, 5) + "\n";
      expectedOutput += "==> tenLines.txt <==\n" + generateLinesfromEnd(10, 5);
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node ./tail.js -n 5 fiveLines.txt", () => {
    it("should return last 5 lines", () => {
      const argv = "node tail.js -n 5 fiveLines.txt".split(" ");
      let expectedOutput = generateLinesfromEnd(5, 5);
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node ./tail.js -n 5 fiveLines.txt tenLines.txt", () => {
    it("should return last 5 lines of both files with heading", () => {
      const argv = "node tail.js -n5 fiveLines.txt tenLines.txt".split(" ");
      let expectedOutput =
        "==> fiveLines.txt <==\n" + generateLinesfromEnd(5, 5) + "\n";
      expectedOutput += "==> tenLines.txt <==\n" + generateLinesfromEnd(10, 5);
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node ./tail.js -5 fiveLines.txt", () => {
    it("should return last 5 lines", () => {
      const argv = "node tail.js -5 fiveLines.txt".split(" ");
      let expectedOutput = generateLinesfromEnd(5, 5);
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node tail.js -5 fiveLines.txt tenLines.txt", () => {
    it("should return last 5 lines of  both files with heading", () => {
      const argv = "node tail.js -5 fiveLines.txt tenLines.txt".split(" ");
      let expectedOutput =
        "==> fiveLines.txt <==\n" + generateLinesfromEnd(5, 5) + "\n";
      expectedOutput += "==> tenLines.txt <==\n" + generateLinesfromEnd(10, 5);
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node tail.js -c12 fifteenLines.txt", () => {
    it("should return last 12 chars", () => {
      const argv = "node tail.js -c12 fifteenLines.txt".split(" ");
      let expectedOutput = "\n" + generateLinesfromEnd(15, 4);
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node tail.js -c5 fiveLines.txt tenLines.txt", () => {
    it("should return last 5 chars of both files with heading", () => {
      const argv = "node tail.js -c5 fiveLines.txt tenLines.txt".split(" ");
      let expectedOutput =
        "==> fiveLines.txt <==\n" + generateLinesfromEnd(5, 3) + "\n";
      expectedOutput +=
        "==> tenLines.txt <==\n\n" + generateLinesfromEnd(10, 2);
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node tail.js -c 12 fifteenLines.txt", () => {
    it("should return last 12 chars", () => {
      const argv = "node tail.js -c 12 fifteenLines.txt".split(" ");
      let expectedOutput = "\n" + generateLinesfromEnd(15, 4);
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node tail.js -c 5 fiveLines.txt tenLines.txt", () => {
    it("should return last 5 chars of both files with heading", () => {
      const argv = "node tail.js -c 5 fiveLines.txt tenLines.txt".split(" ");
      let expectedOutput =
        "==> fiveLines.txt <==\n" + generateLinesfromEnd(5, 3) + "\n";
      expectedOutput +=
        "==> tenLines.txt <==\n\n" + generateLinesfromEnd(10, 2);
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node tail.js -n 0 fiveLines.txt", () => {
    it("should return empty string", () => {
      const argv = "node tail.js -n 0 fiveLines.txt".split(" ");
      assert.deepEqual(tail(argv, dummyfs), "");
    });
  });
  describe("node tail.js -c 0 fiveLines.txt", () => {
    it("should return empty string", () => {
      const argv = "node tail.js -c 0 fiveLines.txt".split(" ");
      assert.deepEqual(tail(argv, dummyfs), "");
    });
  });
  describe("node tail.js -n 0 fiveLines.txt tenLines.txt", () => {
    it("should return empty string with heading of the files", () => {
      const argv = "node tail.js -n 0 fiveLines.txt tenLines.txt".split(" ");
      const expectedOutput =
        "==> fiveLines.txt <==\n" + "\n==> tenLines.txt <==\n";
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node tail.js -c 0 fiveLines.txt tenLines.txt", () => {
    it("should return empty string with heading of the files", () => {
      const argv = "node tail.js -c 0 fiveLines.txt tenLines.txt".split(" ");
      const expectedOutput =
        "==> fiveLines.txt <==\n" + "\n==> tenLines.txt <==\n";
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node tail.js -n r fiveLines.txt", () => {
    it("should return error messege, tail: illegal offset -- r", () => {
      const argv = "node tail.js -n r fiveLines.txt".split(" ");
      let expectedOutput = "tail: illegal offset -- r";
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node tail.js -c r fiveLines.txt", () => {
    it("should return error messege, tail: illegal offset -- r", () => {
      const argv = "node tail.js -c r fiveLines.txt".split(" ");
      let expectedOutput = "tail: illegal offset -- r";
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node tail.js -c -5x fiveLines.txt", () => {
    it("should return error messege, tail: illegal offset -- -5x", () => {
      const argv = "node tail.js -c -5x fiveLines.txt".split(" ");
      let expectedOutput = "tail: illegal offset -- -5x";
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node ./tail.js -n -5 fiveLines.txt", () => {
    it("should return last 5 lines", () => {
      const argv = "node tail.js -n -5 fiveLines.txt".split(" ");
      let expectedOutput = generateLinesfromEnd(5, 5);
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
    });
  });
  describe("node tail.js -c -12 fifteenLines.txt", () => {
    it("should return last 12 chars", () => {
      const argv = "node tail.js -c -12 fifteenLines.txt".split(" ");
      let expectedOutput = "\n" + generateLinesfromEnd(15, 4);
      assert.deepEqual(tail(argv, dummyfs), expectedOutput);
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
      let expectedOutput = generateLines(5);
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for head command and byte option and count 11", () => {
    it("should return the first 11 chars", () => {
      let path = "fifteenLines.txt";
      let command = "head";
      let userInputs = { option: "byte", count: 11 };
      let actualOutput = getContent(command, path, userInputs, dummyfs);
      let expectedOutput = generateLines(6);
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for tail command and line option and count 10", () => {
    it("should return the last 10 lines of the file", () => {
      let path = "fifteenLines.txt";
      let command = "tail";
      let userInputs = { option: "line", count: 10 };
      let actualOutput = getContent(command, path, userInputs, dummyfs);
      let expectedOutput = generateLinesfromEnd(15, 10);
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("for tail command and byte option and count 5", () => {
    it("should return the last 5 chars", () => {
      let path = "fiveLines.txt";
      let command = "tail";
      let userInputs = { option: "byte", count: 5 };
      let actualOutput = getContent(command, path, userInputs, dummyfs);
      let expectedOutput = generateLinesfromEnd(5, 3);
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
        "==> " + "fiveLines.txt" + " <==\n" + generateLines(5);
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
      let expectedOutput =
        "==> " + "fiveLines.txt" + " <==\n" + generateLinesfromEnd(5, 4);
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
      let expectedOutput = generateLines(5);
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
      let expectedOutput = "==> fiveLines.txt <==\n" + generateLines(3);
      expectedOutput += "\n==> fifteenLines.txt <==\n" + generateLines(3);
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
      let expectedOutput = generateLinesfromEnd(15, 10);
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
      let expectedOutput =
        "==> fiveLines.txt <==\n" + generateLinesfromEnd(5, 3);
      expectedOutput +=
        "\n==> fifteenLines.txt <==\n" + generateLinesfromEnd(15, 2);
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});
