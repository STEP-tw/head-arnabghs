const { isValidOptionProvided } = require("./parse.js");

const handleErrorForIllegalOption = function(option, errorMsg) {
  if (option != "c" || option != "n") return errorMsg;
};

const tailUsageMsg =
  "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
const headUsageMsg = "usage: head [-n lines | -c bytes] [file ...]";

const handleErrorForHead = function(count, option) {
  if (isNaN(count) || count < 1) {
    return {
      errorExist: true,
      errorMsg: "head: illegal " + option + " count -- " + count
    };
  }
  if (option != "byte" && option != "line") {
    return {
      errorExist: true,
      errorMsg: ["head: illegal option -- " + option, headUsageMsg].join("\n")
    };
  }
  return { errorExist: false };
};

const handelErrorForTail = function(count, option) {
  if (isNaN(count)) {
    return { errorExist: true, errorMsg: "tail: illegal offset -- " + count };
  }
  if (option != "byte" && option != "line") {
    return {
      errorExist: true,
      errorMsg: ["tail: illegal option -- " + option, tailUsageMsg].join("\n")
    };
  }
  return { errorExist: false };
};

module.exports = {
  handleErrorForHead,
  handelErrorForTail
};
