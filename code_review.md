1.  error.js ->

- [x] a. checkError(): misleading function name because its only checking count,
      unnecessary if condition, smaller functions can extracted.

- [x] b. validateIllegalCountForHead : misleading name because its not validating count its generating message.

2.  lib.js ->

- [x] a. formatContent(): functions defined inside this can be defined outside. eg. getContent, getcontentWithTitle ,
      instead of ternary operaters object can be used.

- [x] b. head(): line 41 not necessary.

- [x] c. tail(): duplicate code like head.

- [x] d. functions used in other function should defined before. eg.getFirstNLines etc.

- [x] e. duplication in getFirstNLines, getFirstNBytes, getLastNChars, getLastNLines.

3.  parse.js ->

- [x] a. rename type with option.

- [x] b. smaller functions can be extracted to make it more readable.

4.  test ->

- [x] a. it messages can be improved.

- [x] b. expected output should be hardcoded within it block.
