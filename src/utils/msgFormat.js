const moment = require("moment");

function formatMsgs(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
}

module.exports = formatMsgs;
