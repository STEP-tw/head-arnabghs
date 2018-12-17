const assert = require("assert");
const { handleErrorForHead, handelErrorForTail } = require("../src/error.js");

describe("handleErrorForHead", () => {
  it("should return head: illegal line count -- 0", () => {
    const expectedOutput = {
      errorExist: true,
      errorMsg: "head: illegal line count -- 0"
    };
    assert.deepEqual(handleErrorForHead(0, "line"), expectedOutput);
  });
  it("should return head: illegal byte count -- 0", () => {
    const expectedOutput = {
      errorExist: true,
      errorMsg: "head: illegal byte count -- 0"
    };
    assert.deepEqual(handleErrorForHead(0, "byte"), expectedOutput);
  });
  it("should return head: illegal byte count -- -5", () => {
    const expectedOutput = {
      errorExist: true,
      errorMsg: "head: illegal byte count -- -5"
    };
    assert.deepEqual(handleErrorForHead(-5, "byte"), expectedOutput);
  });
  it("should return head: illegal line count -- 5x", () => {
    const expectedOutput = {
      errorExist: true,
      errorMsg: "head: illegal line count -- 5x"
    };
    assert.deepEqual(handleErrorForHead("5x", "line"), expectedOutput);
  });
});

describe("handelErrorForTail", () => {
  it("should return tail: illegal offset -- -k", () => {
    const expectedOutput = {
      errorExist: true,
      errorMsg: "tail: illegal offset -- -k"
    };
    assert.deepEqual(handelErrorForTail("-k", "line"), expectedOutput);
  });
  it("should return tail: illegal offset -- 5x", () => {
    const expectedOutput = {
      errorExist: true,
      errorMsg: "tail: illegal offset -- 5x"
    };
    assert.deepEqual(handelErrorForTail("5x", "byte"), expectedOutput);
  });
});
