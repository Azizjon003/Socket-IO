module.exports = (str) => {
  console.log(str);
  console.log(typeof str === "string" && str.trim().length > 0);
  return typeof str === "string" && str.trim().length > 3;
};
