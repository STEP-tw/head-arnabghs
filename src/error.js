const checkErrors = function (command, count, type) {
  let errorExist = false;
  let errorMsg = '';
  if (command == 'head') {
    if (isNaN(count) || (count < 1)) {
      errorExist = true;
      errorMsg = validateIllegalCountForHead(count, type);
    }
  } else {
    if (isNaN(count)) {
      errorExist = true;
      errorMsg = 'tail: illegal offset -- ' + count;
    }
    if (count == 0) {
      errorExist = true;
    }
  }
  return {
    errorExist: errorExist,
    errorMsg: errorMsg
  }
}
const validateIllegalCountForHead = function (count, type) {
  return 'head: illegal ' + type + ' count -- ' + count;
}

module.exports = {
  checkErrors,
  validateIllegalCountForHead
};