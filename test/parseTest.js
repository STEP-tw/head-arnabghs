const assert = require("assert");

const {
  getCountAndFilenames,
  handleOnlyNumberCase,
  isOnlyNumber,
  isOptionByte,
  isOptionLine,
  isOptionProvided,
  readUserInput
} = require("../src/parse.js");

describe("getCountAndFilenames", () => {
  describe("node head.js -n5 one.txt", () => {
    it("when option and count is given together gets count and filenames from user input array", () => {
      let argv = "node head.js -n5 one.txt".split(" ");
      let userInput = { fileNames: "anything", count: "anyNumber" };
      let actualOutput = getCountAndFilenames(argv, userInput);
      let expectedOutput = { count: "5", fileNames: ["one.txt"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("node tail.js -c10 one.txt two.txt", () => {
    it("when option and count is given together gets count and filenames from user input array", () => {
      let argv = "node tail.js -c10 one.txt two.txt".split(" ");
      let userInput = { fileNames: "anything", count: "anyNumber" };
      let actualOutput = getCountAndFilenames(argv, userInput);
      let expectedOutput = { count: "10", fileNames: ["one.txt", "two.txt"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("handleOnlyNumberCase", () => {
  describe("node head.js -5 one.txt", () => {
    it("when only count is given gets count and filenames from user input array", () => {
      let argv = "node head.js -5 one.txt".split(" ");
      let userInput = { fileNames: "anything", count: "anyNumber" };
      let actualOutput = handleOnlyNumberCase(argv, userInput);
      let expectedOutput = { count: "5", fileNames: ["one.txt"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("node tail.js -5 one.txt two.txt", () => {
    it("when only count is given gets count and filenames from user input array", () => {
      let argv = "node tail.js -5 one.txt two.txt".split(" ");
      let userInput = { fileNames: "anything", count: "anyNumber" };
      let actualOutput = handleOnlyNumberCase(argv, userInput);
      let expectedOutput = { count: "5", fileNames: ["one.txt", "two.txt"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("isOnlyNumber", () => {
  describe("node head.js -5 one.txt", () => {
    it("returns true when only count is given", () => {
      let argv = "node head.js -5 one.txt".split(" ");
      let actualOutput = isOnlyNumber(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
  describe("node head.js -n5 one.txt", () => {
    it("returns false when option is given with count together", () => {
      let argv = "node head.js -n5 one.txt".split(" ");
      let actualOutput = isOnlyNumber(argv);
      assert.deepEqual(actualOutput, false);
    });
  });
  describe("node head.js -n 5 one.txt", () => {
    it("returns false even if option is given seperately from count", () => {
      let argv = "node head.js -n 5 one.txt".split(" ");
      let actualOutput = isOnlyNumber(argv);
      assert.deepEqual(actualOutput, false);
    });
  });
});

describe("isOptionByte", () => {
  describe("node head.js -c 5 one.txt", () => {
    it("returns true when only option '-c' is given", () => {
      let argv = "node head.js -c 5 one.txt".split(" ");
      let actualOutput = isOptionByte(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
  describe("node head.js -c5 one.txt", () => {
    it("returns true when option '-c' is given with count", () => {
      let argv = "node head.js -c5 one.txt".split(" ");
      let actualOutput = isOptionByte(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
});

describe("isOptionLine", () => {
  describe("node head.js -n 5 one.txt", () => {
    it("returns true when only option '-n' is given", () => {
      let argv = "node head.js -n 5 one.txt".split(" ");
      let actualOutput = isOptionLine(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
  describe("node head.js -n5 one.txt", () => {
    it("returns true when option '-n' is given with count", () => {
      let argv = "node head.js -n5 one.txt".split(" ");
      let actualOutput = isOptionLine(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
});

describe("isOptionProvided", () => {
  describe("node head.js -n5 one,txt", () => {
    it("returns true if any of isOptionByte or isOptionLine is true", () => {
      let argv = "node head.js -n5 one,txt".split(" ");
      let actualOutput = isOptionProvided(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
  describe("node head.js -c 5 one,txt", () => {
    it("returns true if any of isOptionByte or isOptionLine is true", () => {
      let argv = "node head.js -c 5 one,txt".split(" ");
      let actualOutput = isOptionProvided(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
  describe("node head.js -5 one,txt", () => {
    it("returns true if any of isOptionByte or isOptionLine is true", () => {
      let argv = "node head.js -5 one,txt".split(" ");
      let actualOutput = isOptionProvided(argv);
      assert.deepEqual(actualOutput, false);
    });
  });
});

describe("readUserInput", () => {
  describe("node head one.txt", () => {
    it("should have count=10 & fileNames=[one.txt] & option: line", () => {
      let user = readUserInput("node head one.txt".split(" "));
      assert.deepEqual(user, {
        command: "head",
        count: 10,
        fileNames: ["one.txt"],
        option: "line"
      });
    });
  });
  describe("node head.js one.txt two.txt", () => {
    it("should have count= 10 & fileNames=[one.txt, two.txt] & option: line", () => {
      let user = readUserInput("node head one.txt two.txt".split(" "));
      assert.deepEqual(user, {
        command: "head",
        count: 10,
        fileNames: ["one.txt", "two.txt"],
        option: "line"
      });
    });
  });
  describe("node head.js -n5 one.txt ", () => {
    it("should have count= 5 & fileNames=[one.txt] & option: line", () => {
      let user = readUserInput("node head -n5 one.txt".split(" "));
      assert.deepEqual(user, {
        command: "head",
        count: 5,
        fileNames: ["one.txt"],
        option: "line"
      });
    });
  });
  describe("node head.js -n5 one.txt two.txt", () => {
    it("should have count= 5 & fileNames=[one.txt, two.txt] & option: line", () => {
      let user = readUserInput("node head -n5 one.txt two.txt".split(" "));
      assert.deepEqual(user, {
        command: "head",
        count: 5,
        fileNames: ["one.txt", "two.txt"],
        option: "line"
      });
    });
  });
  describe("node head.js -n 5 one.txt ", () => {
    it("should have count= 5 & fileNames=[one.txt] & option: line", () => {
      let user = readUserInput("node head -n 5 one.txt".split(" "));
      assert.deepEqual(user, {
        command: "head",
        count: 5,
        fileNames: ["one.txt"],
        option: "line"
      });
    });
  });
  describe("node head.js -n 5 one.txt two.txt", () => {
    it("should have count= 5 & fileNames=[one.txt, two.txt] & option: line", () => {
      let user = readUserInput("node head -n 5 one.txt two.txt".split(" "));
      assert.deepEqual(user, {
        command: "head",
        count: 5,
        fileNames: ["one.txt", "two.txt"],
        option: "line"
      });
    });
  });
  describe("node head.js -5 one.txt ", () => {
    it("should have count= 5 & fileNames=[one.txt] & option: line", () => {
      let user = readUserInput("node head -5 one.txt".split(" "));
      assert.deepEqual(user, {
        command: "head",
        count: 5,
        fileNames: ["one.txt"],
        option: "line"
      });
    });
  });
  describe("node head.js -5 one.txt two.txt", () => {
    it("should have count= 5 & fileNames=[one.txt, two.txt] & option: line", () => {
      let user = readUserInput("node head -5 one.txt two.txt".split(" "));
      assert.deepEqual(user, {
        command: "head",
        count: 5,
        fileNames: ["one.txt", "two.txt"],
        option: "line"
      });
    });
  });
  describe("node head.js -c10 one.txt ", () => {
    it("should have charcterCount= 10 & fileNames=[one.txt] & option: byte", () => {
      let user = readUserInput("node head -c10 one.txt".split(" "));
      assert.deepEqual(user, {
        command: "head",
        fileNames: ["one.txt"],
        count: 10,
        option: "byte"
      });
    });
  });
  describe("node head.js -c5 one.txt two.txt", () => {
    it("should have count= 5 & fileNames=[one.txt, two.txt] & option: byte", () => {
      let user = readUserInput("node head -c5 one.txt two.txt".split(" "));
      assert.deepEqual(user, {
        command: "head",
        count: 5,
        fileNames: ["one.txt", "two.txt"],
        option: "byte"
      });
    });
  });
  describe("node head.js -c 10 one.txt ", () => {
    it("should have charcterCount= 10 & fileNames=[one.txt] & option: byte", () => {
      let user = readUserInput("node head -c 10 one.txt".split(" "));
      assert.deepEqual(user, {
        command: "head",
        fileNames: ["one.txt"],
        count: 10,
        option: "byte"
      });
    });
  });
  describe("node head.js -c 5 one.txt two.txt", () => {
    it("should have count= 5 & fileNames=[one.txt, two.txt] & option: byte", () => {
      let user = readUserInput("node head -c 5 one.txt two.txt".split(" "));
      assert.deepEqual(user, {
        command: "head",
        count: 5,
        fileNames: ["one.txt", "two.txt"],
        option: "byte"
      });
    });
  });
});