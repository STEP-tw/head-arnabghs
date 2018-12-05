const { headByCounts } = require('../src/lib.js');
const assert = require('assert').deepEqual;

let sampleFile = "Senju Hashirama\nMADARA UCHIHA\n\nNaruto Uzumaki\nSasuke Uchiha\nITACHI UCHIHA\nOBITO UCHIHA\nKAKASHI HATAKE\nMinato Namikaze\nShikamaru Nara\nHinata Hyuga\nSakura Haruno\nJiraiya"

describe('Test for lib',function(){
  describe('Test for headByCounts function',function(){
    it('for no number of lines as input should return empty string',function(){
      assert(headByCounts(0,sampleFile),'');
    });
    it('for 1 number of line should return single string',function(){
      assert(headByCounts(1,sampleFile),'Senju Hashirama');
    });
    it('for given number of lines should return same number of line',function(){
      assert(headByCounts(3,sampleFile),'Senju Hashirama\nMADARA UCHIHA\n');
    });
  });
});

