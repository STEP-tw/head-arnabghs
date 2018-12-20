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
  describe("-n5 one.txt", () => {
    it("when option and count is given together gets count and filenames from user input array", () => {
      let argv = "-n5 one.txt".split(" ");
      let userInput = { fileNames: "anything", count: "anyNumber" };
      let actualOutput = getCountAndFilenames(argv, userInput);
      let expectedOutput = { count: "5", fileNames: ["one.txt"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("-c10 one.txt two.txt", () => {
    it("when option and count is given together gets count and filenames from user input array", () => {
      let argv = "-c10 one.txt two.txt".split(" ");
      let userInput = { fileNames: "anything", count: "anyNumber" };
      let actualOutput = getCountAndFilenames(argv, userInput);
      let expectedOutput = { count: "10", fileNames: ["one.txt", "two.txt"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("handleOnlyNumberCase", () => {
  describe("-5 one.txt", () => {
    it("when only count is given gets count and filenames from user input array", () => {
      let argv = "-5 one.txt".split(" ");
      let userInput = { fileNames: "anything", count: "anyNumber" };
      let actualOutput = handleOnlyNumberCase(argv, userInput);
      let expectedOutput = { count: "5", fileNames: ["one.txt"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
  describe("-5 one.txt two.txt", () => {
    it("when only count is given gets count and filenames from user input array", () => {
      let argv = "-5 one.txt two.txt".split(" ");
      let userInput = { fileNames: "anything", count: "anyNumber" };
      let actualOutput = handleOnlyNumberCase(argv, userInput);
      let expectedOutput = { count: "5", fileNames: ["one.txt", "two.txt"] };
      assert.deepEqual(actualOutput, expectedOutput);
    });
  });
});

describe("isOnlyNumber", () => {
  describe("-5 one.txt", () => {
    it("returns true when only count is given", () => {
      let argv = "-5 one.txt".split(" ");
      let actualOutput = isOnlyNumber(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
  describe("-n5 one.txt", () => {
    it("returns false when option is given with count together", () => {
      let argv = "-n5 one.txt".split(" ");
      let actualOutput = isOnlyNumber(argv);
      assert.deepEqual(actualOutput, false);
    });
  });
  describe("-n 5 one.txt", () => {
    it("returns false even if option is given seperately from count", () => {
      let argv = "-n 5 one.txt".split(" ");
      let actualOutput = isOnlyNumber(argv);
      assert.deepEqual(actualOutput, false);
    });
  });
});

describe("isOptionByte", () => {
  describe("-c 5 one.txt", () => {
    it("returns true when only option '-c' is given", () => {
      let argv = "-c 5 one.txt".split(" ");
      let actualOutput = isOptionByte(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
  describe("-c5 one.txt", () => {
    it("returns true when option '-c' is given with count", () => {
      let argv = "-c5 one.txt".split(" ");
      let actualOutput = isOptionByte(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
});

describe("isOptionLine", () => {
  describe("-n 5 one.txt", () => {
    it("returns true when only option '-n' is given", () => {
      let argv = "-n 5 one.txt".split(" ");
      let actualOutput = isOptionLine(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
  describe("-n5 one.txt", () => {
    it("returns true when option '-n' is given with count", () => {
      let argv = "-n5 one.txt".split(" ");
      let actualOutput = isOptionLine(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
});

describe("isOptionProvided", () => {
  describe("-n5 one.txt", () => {
    it("returns true if any of isOptionByte or isOptionLine is true", () => {
      let argv = "-n5 one.txt".split(" ");
      let actualOutput = isOptionProvided(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
  describe("-c 5 one.txt", () => {
    it("returns true if any of isOptionByte or isOptionLine is true", () => {
      let argv = "-c 5 one.txt".split(" ");
      let actualOutput = isOptionProvided(argv);
      assert.deepEqual(actualOutput, true);
    });
  });
  describe("-5 one.txt", () => {
    it("returns true if any of isOptionByte or isOptionLine is true", () => {
      let argv = "-5 one.txt".split(" ");
      let actualOutput = isOptionProvided(argv);
      assert.deepEqual(actualOutput, false);
    });
  });
});

describe("readUserInput", () => {
  describe("one.txt", () => {
    it("should have count=10 & fileNames=[one.txt] & option: line", () => {
      let user = readUserInput("one.txt".split(" "));
      assert.deepEqual(user, {
        count: 10,
        fileNames: ["one.txt"],
        option: "line"
      });
    });
  });
  describe(" one.txt two.txt", () => {
    it("should have count= 10 & fileNames=[one.txt, two.txt] & option: line", () => {
      let user = readUserInput("one.txt two.txt".split(" "));
      assert.deepEqual(user, {
        count: 10,
        fileNames: ["one.txt", "two.txt"],
        option: "line"
      });
    });
  });
  describe(" -n5 one.txt ", () => {
    it("should have count= 5 & fileNames=[one.txt] & option: line", () => {
      let user = readUserInput("-n5 one.txt".split(" "));
      assert.deepEqual(user, {
        count: 5,
        fileNames: ["one.txt"],
        option: "line"
      });
    });
  });
  describe(" -n5 one.txt two.txt", () => {
    it("should have count= 5 & fileNames=[one.txt, two.txt] & option: line", () => {
      let user = readUserInput("-n5 one.txt two.txt".split(" "));
      assert.deepEqual(user, {
        count: 5,
        fileNames: ["one.txt", "two.txt"],
        option: "line"
      });
    });
  });
  describe(" -n 5 one.txt ", () => {
    it("should have count= 5 & fileNames=[one.txt] & option: line", () => {
      let user = readUserInput("-n 5 one.txt".split(" "));
      assert.deepEqual(user, {
        count: 5,
        fileNames: ["one.txt"],
        option: "line"
      });
    });
  });
  describe(" -n 5 one.txt two.txt", () => {
    it("should have count= 5 & fileNames=[one.txt, two.txt] & option: line", () => {
      let user = readUserInput("-n 5 one.txt two.txt".split(" "));
      assert.deepEqual(user, {
        count: 5,
        fileNames: ["one.txt", "two.txt"],
        option: "line"
      });
    });
  });
  describe(" -5 one.txt ", () => {
    it("should have count= 5 & fileNames=[one.txt] & option: line", () => {
      let user = readUserInput("-5 one.txt".split(" "));
      assert.deepEqual(user, {
        count: 5,
        fileNames: ["one.txt"],
        option: "line"
      });
    });
  });
  describe(" -5 one.txt two.txt", () => {
    it("should have count= 5 & fileNames=[one.txt, two.txt] & option: line", () => {
      let user = readUserInput("-5 one.txt two.txt".split(" "));
      assert.deepEqual(user, {
        count: 5,
        fileNames: ["one.txt", "two.txt"],
        option: "line"
      });
    });
  });
  describe(" -c10 one.txt ", () => {
    it("should have charcterCount= 10 & fileNames=[one.txt] & option: byte", () => {
      let user = readUserInput("-c10 one.txt".split(" "));
      assert.deepEqual(user, {
        fileNames: ["one.txt"],
        count: 10,
        option: "byte"
      });
    });
  });
  describe(" -c5 one.txt two.txt", () => {
    it("should have count= 5 & fileNames=[one.txt, two.txt] & option: byte", () => {
      let user = readUserInput("-c5 one.txt two.txt".split(" "));
      assert.deepEqual(user, {
        count: 5,
        fileNames: ["one.txt", "two.txt"],
        option: "byte"
      });
    });
  });
  describe(" -c 10 one.txt ", () => {
    it("should have charcterCount= 10 & fileNames=[one.txt] & option: byte", () => {
      let user = readUserInput("-c 10 one.txt".split(" "));
      assert.deepEqual(user, {
        fileNames: ["one.txt"],
        count: 10,
        option: "byte"
      });
    });
  });
  describe(" -c 5 one.txt two.txt", () => {
    it("should have count= 5 & fileNames=[one.txt, two.txt] & option: byte", () => {
      let user = readUserInput("-c 5 one.txt two.txt".split(" "));
      assert.deepEqual(user, {
        count: 5,
        fileNames: ["one.txt", "two.txt"],
        option: "byte"
      });
    });
  });
});
