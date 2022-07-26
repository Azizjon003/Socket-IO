const moment = require("moment");
module.exports = (from, text) => {
  moment.locale("uz-latn");
  return {
    from,
    text,
    createdAt: moment(new Date().getTime()).format("llll"),
  };
};
