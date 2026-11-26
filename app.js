// A tiny Node.js server using only the built-in "http" module (no installs needed)
const http = require("http");

// A small function we can test on its own
function add(a, b) {
  return a + b;
}

// The server: answers "/" and "/add?a=2&b=3"
function createServer() {
  return http.createServer(function (req, res) {
    const url = new URL(req.url, "http://localhost");

    if (url.pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello World");
    } else if (url.pathname === "/add") {
      const a = Number(url.searchParams.get("a"));
      const b = Number(url.searchParams.get("b"));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result: add(a, b) }));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
    }
  });
}

module.exports = { add, createServer };
