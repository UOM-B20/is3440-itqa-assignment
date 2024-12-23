module.exports = {
  default: {
    requireModule: ["@babel/register"],
    format: ["progress-bar", ["html", "cucumber-report/index.html"]],
    require: ["features/step_definitions/**/*.js", "features/support/**/*.js"],
    formatOptions: {
      snippetInterface: "async-await",
    },
    timeout: 60000,
  },
};
