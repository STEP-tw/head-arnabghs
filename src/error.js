const tailUsageMsg =
  "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
const headUsageMsg = "usage: head [-n lines | -c bytes] [file ...]";

const createOptionErrorMsg = function(command, option, msg) {
  return {
    errorExist: true,
    errorMsg: [command + ": illegal option -- " + option, msg].join("\n")
  };
};

const handleErrorForHead = function(count, option) {
  if (isNaN(count) || count < 1) {
    return {
      errorExist: true,
      errorMsg: "head: illegal " + option + " count -- " + count
    };
  }
  if (option != "byte" && option != "line")
    return createOptionErrorMsg("head", option, headUsageMsg);
  return { errorExist: false };
};

const handelErrorForTail = function(count, option) {
  if (isNaN(count)) {
    return { errorExist: true, errorMsg: "tail: illegal offset -- " + count };
  }
  if (option != "byte" && option != "line")
    return createOptionErrorMsg("tail", option, tailUsageMsg);
  return { errorExist: false };
};

module.exports = {
  handleErrorForHead,
  handelErrorForTail
};
