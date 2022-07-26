module.exports = (str) => {
  return typeof str === "string" && str.trim().length > 3;
};
