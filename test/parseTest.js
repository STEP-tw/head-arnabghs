const assert = require("assert");

const { readUserInput } = require("../src/parse.js");

describe("readUserInput", () => {
  describe("node head one.txt", () => {
    it("should have count=10 & fileNames=[one.txt] & option: line", () => {
      let user = readUserInput("node head one.txt".split(" "));
      assert.deepEqual(user, {
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
        count: 5,
        fileNames: ["one.txt", "two.txt"],
        option: "byte"
      });
    });
  });
});
