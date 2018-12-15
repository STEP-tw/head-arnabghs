const assert = require('assert');
const {
  validateIllegalCountForHead
} = require('../src/error.js');

describe('validateIllegalCountForHead', () => {
  it('should return head: illegal line count -- 0', () => {
    const argv = 'node head.js -n 0 fiveLines.txt';
    const expectedOutput = "head: illegal line count -- 0";
    assert.deepEqual(validateIllegalCountForHead(0, 'line'), expectedOutput);
  });
  it('should return head: illegal byte count -- 0', () => {
    const argv = 'node head.js -c 0 fiveLines.txt';
    const expectedOutput = "head: illegal byte count -- 0";
    assert.deepEqual(validateIllegalCountForHead(0, 'byte'), expectedOutput);
  });
});