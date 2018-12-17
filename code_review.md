1.  error.js ->

- [] a. checkError(): misleading function name because its only checking count,
  unnecessary if condition, smaller functions can extracted.

- [] b. validateIllegalCountForHead : misleading name because its not validating count its generating message.

2.  lib.js ->

- [] a. formatContent(): functions defined inside this can be defined outside. eg. getContent, getcontentWithTitle ,
  instead of ternary operaters object can be used.

- [x] b. head(): line 41 not necessary.

- [] c. tail(): duplicate code like head.

- [x] d. functions used in other function should defined before. eg.getFirstNLines etc.

- [] e. duplication in getFirstNLines, getFirstNBytes, getLastNChars, getLastNLines.

3.  parse.js ->

- [] a. rename type with option.

- [] b. smaller functions can be extracted to make it more readable.

4.  test ->

- [] a. it messages can be improved.

- [] b. expected output should be hardcoded within it block.
