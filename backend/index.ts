import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { Task } from "./types";
const app = express();

const db = new sqlite3.Database("./database.db");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const port = process.env.PORT || 1507;

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS tasks");

  db.run(
    "CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed BOOLEAN)"
  );
});

app.get("/tasks", (req: Request, res: Response) => {
  db.all<Task[]>("SELECT * FROM tasks", (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

app.post("/tasks", (req: Request, res: Response) => {
  const task: Task = req.body;
  db.run(
    "INSERT INTO tasks (title, completed) VALUES (?, ?)",
    [task.title, task.completed],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
      }

      console.log("Created task!");

      const insertedTask: Task = {
        id: this.lastID,
        title: task.title,
        completed: task.completed,
      };

      console.log(insertedTask);

      res.status(201).json({
        task: insertedTask,
        message: "Task created successfully",
      });
    }
  );
});

app.put('/tasks/:id', (req: Request, res: Response, next: NextFunction) => {
  console.log("PUT /tasks/:id called with id:", req.params.id);

  // db.run(
  //   "UPDATE tasks SET title = ?, completed = ? WHERE id = ?",
  //   [req.body.title, req.body.completed, req.params.id],
  //   function (err) {
  //     if (err) {
  //       console.error(err.message);
  //       return res.status(500).json({ error: err.message });
  //     }
  // });

  res.status(200).json({ message: "Route hit" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
