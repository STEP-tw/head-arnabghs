const assert = require("assert");
const { checkErrors } = require("../src/error.js");

describe("checkErrors", () => {
  it("should return head: illegal line count -- 0", () => {
    const argv = "node head.js -n 0 fiveLines.txt";
    const expectedOutput = {
      errorExist: true,
      errorMsg: "head: illegal line count -- 0"
    };
    assert.deepEqual(checkErrors("head", 0, "line"), expectedOutput);
  });
  it("should return head: illegal byte count -- 0", () => {
    const argv = "node head.js -c 0 fiveLines.txt";
    const expectedOutput = {
      errorExist: true,
      errorMsg: "head: illegal byte count -- 0"
    };
    assert.deepEqual(checkErrors("head", 0, "byte"), expectedOutput);
  });
});
