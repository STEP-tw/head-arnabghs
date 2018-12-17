const checkErrors = function(command, count, type) {
  let errorExist = false;
  let errorMsg = "";
  if (command == "head") {
    if (isNaN(count) || count < 1) {
      errorExist = true;
      errorMsg = "head: illegal " + type + " count -- " + count;
    }
  } else {
    if (isNaN(count)) {
      errorExist = true;
      errorMsg = "tail: illegal offset -- " + count;
    }
    if (count == 0) {
      errorExist = true;
    }
  }
  return {
    errorExist: errorExist,
    errorMsg: errorMsg
  };
};

module.exports = {
  checkErrors
};
