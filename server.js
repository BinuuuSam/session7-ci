const { createServer } = require("./app");
const port = 3000;

createServer().listen(port, function () {
  console.log("Server running at http://localhost:" + port);
});
