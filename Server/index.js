const express = require("express");
const db = require("./DB_connection");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect()
  .then(() => console.log("PSQL Connected"))
  .catch((err) => console.log(err));

const port = 8081;

app.listen(port, () => {
  console.log("Server started on 5432", port);
});

// GET POSTS
app.get("/posts", async (req, res) => {
  // const posts = await Post.find();
  // const client = await pool.connect();
  const result = await db.any("select * from posts");
  // const posts = result.rows;
  // client.release();
  res.json(result);
});

// GET ALL TODOS
app.get("/todos", async (req, res) => {
  const todos = await db.any("select * from todos order by id");
  res.json(todos);
});

// CREATE TODO
app.post("/todos", async (req, res) => {
  const { username, content } = req.body;
  // const newTodo = new Todo({
  //   username,
  //   content,
  // });
  // await newTodo.save();
  const newTodo = await db.one(
    "insert into todos(username , content , complete) Values ( $1,$2,$3) Returning *",
    [username, content, false],
  );
  res.json(newTodo);
});

// DELETE TODO
app.delete("/todos/:id", async (req, res) => {
  // await Todo.findByIdAndDelete(req.params.id);
  await db.none("delete from todos where id = $1", [req.params.id]);
  res.json({ success: true });
});

// TOGGLE COMPLETE
app.patch("/todos/:id/toggle", async (req, res) => {
  // const todo = await Todo.findById(req.params.id);
  // todo.completed = !todo.completed;
  // await todo.save();
  const todo = await db.one(
    "update todos Set complete = not complete where id = $1 Returning *",
    [req.params.id],
  );
  res.json(todo);
});

// Edit Todo
app.patch("/todos/:id", async (req, res) => {
  // const todo = await Todo.findById(req.params.id);
  let { content } = req.body;
  // todo.content = content;
  // await todo.save();
  const todo = await db.one(
    "update todos Set content = $1 where id = $2 Returning *",
    [content, req.params.id],
  );
  res.json(todo);

  // console.log("in Patch");
});

app.get("/", (req, res) => {
  res.send("Server running");
});
