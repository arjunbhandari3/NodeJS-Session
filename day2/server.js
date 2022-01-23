const http = require("http");
const dateTime = require("./dateTime");
const url = require("url");
const fs = require("fs");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  fs.readFile("index.html", (err, data) => {
    const test = url.parse(req.url, true).query;
    console.log(test);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

server.listen(port, () => {
  console.log(dateTime.dateTime());
  console.log(`Listening on port ${port}`);
});
