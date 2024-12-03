// cucumber.js
module.exports = {
  default: {
    requireModule: ["@babel/register"],
    require: ["tests/step/**/*.js"],
    format: ["progress-bar", ["html", "cucumber-report/index.html"]],
    formatOptions: {
      snippetInterface: "async-await",
    },
    timeout: 60000,
  },
};
