const moment = require("moment");
module.exports = (from, text) => {
  return {
    from,
    text,
    createdAt: moment(new Date().getTime()).format("LT"),
  };
};
