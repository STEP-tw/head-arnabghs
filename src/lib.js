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

const applyFunction = function(funcName, array, arg2){
  let output = '';
  let delimeter = '';
  for (value of array){
    let heading = "==> "+value+" <==\n";
    output += delimeter + heading + funcName(value,arg2);
    delimeter = '-----*******--------********------******-------'
  }
  return output;
}

module.exports = { headByCounts, headByBytes, applyFunction }
