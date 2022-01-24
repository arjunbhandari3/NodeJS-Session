const express = require("express");

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 3000;

router.get("/", (req, res) => res.send("Welcome"));

router.get("/login", (req, res) => {
  console.log(req.params);
  res.sendFile(__dirname + "/login.html");
});
router.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (email === "test@email.com" && password === "test") {
    res.send({ email, password });
  } else {
    res.send("Invalid email or password");
  }
});

router.get("/signup", (req, res) => res.send("Signup Success"));
router.get("/logout", (req, res) => res.send("Logout Success"));

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
