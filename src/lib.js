const headByCounts = function(numberOfLines,wholeFile){
  let arrayOfLines = wholeFile.split('\n');
  arrayOfLines.pop();
  let portionToPrint = arrayOfLines.slice(0,numberOfLines).join('\n');
  return portionToPrint;
}

module.exports = { headByCounts }
