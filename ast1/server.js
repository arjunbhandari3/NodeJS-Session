const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/", (req, res) => {
  const { email, password } = req.body;
  res.writeHead(200, { "Content-type": "text/html" });
  res.write(`<h1>Email: ${email}</h1><h1>Password: ${password}</h1>`);
  res.end();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
