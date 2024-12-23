module.exports = {
  default: {
    requireModule: ["@babel/register"],
    format: ["progress-bar", ["html", "cucumber-report/index.html"]],
    paths: ["features/**/*.feature"],
    require: ["features/step_definitions/**/*.js", "features/support/**/*.js"],
    formatOptions: {
      snippetInterface: "async-await",
    },
    timeout: 60000,
  },
};
