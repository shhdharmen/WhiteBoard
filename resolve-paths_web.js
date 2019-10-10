const replace = require("replace-in-file");
const options = {
  files: "web-build/index.html",
  from: /=\"\//g,
  to: '="./'
};

replace(options, (error, results) => {
  if (error) {
    return console.error("Error occurred:", error);
  }
  console.log("Replacement results:", results);
});
