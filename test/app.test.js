// Tests use Node's built-in test runner (no installs needed)
const test = require("node:test");
const assert = require("node:assert");
const { add, createServer } = require("../app");

test("add() adds two numbers", function () {
  assert.strictEqual(add(2, 3), 5);
});

test("GET / says Hello World", async function () {
  const server = createServer().listen(0);
  const port = server.address().port;
  const res = await fetch("http://localhost:" + port + "/");
  assert.strictEqual(res.status, 200);
  assert.strictEqual(await res.text(), "Hello World");
  server.close();
});

test("GET /add?a=2&b=3 returns 5", async function () {
  const server = createServer().listen(0);
  const port = server.address().port;
  const res = await fetch("http://localhost:" + port + "/add?a=2&b=3");
  const body = await res.json();
  assert.strictEqual(body.result, 5);
  server.close();
});

test("unknown page gives 404", async function () {
  const server = createServer().listen(0);
  const port = server.address().port;
  const res = await fetch("http://localhost:" + port + "/nothing");
  assert.strictEqual(res.status, 404);
  server.close();
});
