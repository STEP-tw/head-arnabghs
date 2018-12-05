const headByCounts = function(numberOfLines,wholeFile){
  let arrayOfLines = wholeFile.split('\n');
  arrayOfLines.pop();
  let portionToPrint = arrayOfLines.slice(0,numberOfLines).join('\n');
  return portionToPrint;
}


const headByBytes = function(numberOfCharacters,wholeFile){
    let arrayOfChars = wholeFile.split('');
  let portionToPrint = arrayOfChars.slice(0,numberOfCharacters);
  if (portionToPrint[portionToPrint.length-1] == '\n'){
    portionToPrint.pop();
  }
  portionToPrint =  portionToPrint.join('');
  return portionToPrint;
}


module.exports = { headByCounts, headByBytes }
