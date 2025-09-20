const http = require("http");
const handler = require("serve-handler");
const open = require("open");

const port = 3000;

const server = http.createServer((req, res) => {
  return handler(req, res, { public: "build" });
});

server.listen(port, () => {
  console.log(`React app running at http://localhost:${port}`);
  open(`http://localhost:${port}`);
});
