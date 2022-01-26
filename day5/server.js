const express = require("express");
const fs = require("fs");
const validator = require("./validator");
const schema = require("./schema");

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
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
    res.status(200).send({ email, password });
  } else {
    res.send("Invalid email or password");
  }
});

router.get("/tasks", (req, res) => {
  fs.readFile(__dirname + "/tasks.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const tasks = JSON.parse(data);
      res.send(tasks);
    }
  });
});

router.get("/viewtasks", (req, res) => {
  res.sendFile(__dirname + "/tasks.html");
});

router.get("/addtasks", (req, res) => {
  res.sendFile(__dirname + "/addTask.html");
});

router.post(
  "/addTasks",
  validator.validateBody(schema.createTaskSchema),
  (req, res) => {
    const { title, description, status } = req.body;
    const newTask = {
      title,
      description,
      status,
    };

    fs.readFile(__dirname + "/tasks.json", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const tasks = JSON.parse(data);
        const duplicateTitle = tasks.find((task) => task.title === title);
        if (duplicateTitle) {
          res.send("Task already exists");
        } else {
          tasks.push(newTask);
          fs.writeFile(
            __dirname + "/tasks.json",
            JSON.stringify(tasks),
            (err) => {
              if (err) {
                console.log(err);
              } else {
                res.send({ message: "Task added successfully", data: tasks });
              }
            }
          );
        }
      }
    });
  }
);

router.put(
  "/tasks/:index",
  validator.validateBody(schema.updateTaskSchema),
  (req, res) => {
    const index = req.params.index;
    const { description, status } = req.body;
    console.log(index);
    console.log(req.body);
    fs.readFile(__dirname + "/tasks.json", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const tasks = JSON.parse(data);
        const duplicateTitle = tasks.find(
          (task) => task.title === tasks[index].title
        );
        if (duplicateTitle) {
          res.send("Task already exists");
        } else {
          tasks[index].description = description;
          tasks[index].status = status;
          fs.writeFile(
            __dirname + "/tasks.json",
            JSON.stringify(tasks),
            (err) => {
              if (err) {
                console.log(err);
              } else {
                res.send({ message: "Task updated successfully", data: tasks });
              }
            }
          );
        }
      }
    });
  }
);

router.delete("/tasks/:index", (req, res) => {
  const index = req.params.index;
  fs.readFile(__dirname + "/tasks.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const tasks = JSON.parse(data);
      tasks.splice(index, 1);
      fs.writeFile(__dirname + "/tasks.json", JSON.stringify(tasks), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send({ message: "Task deleted successfully", data: tasks });
        }
      });
    }
  });
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
