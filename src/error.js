const handleErrorForHead = function(count, option) {
  if (isNaN(count) || count < 1) {
    return {
      errorExist: true,
      errorMsg: "head: illegal " + option + " count -- " + count
    };
  }
  return { errorExist: false };
};

const handelErrorForTail = function(count) {
  if (isNaN(count)) {
    return { errorExist: true, errorMsg: "tail: illegal offset -- " + count };
  }
  return { errorExist: false };
};

module.exports = {
  handleErrorForHead,
  handelErrorForTail
};
