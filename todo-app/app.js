/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
var csrf = require("tiny-csrf");
var cookieParser=require("cookie-parser");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("shh! some secret string"));
app.use(csrf("this_should_be_32_character_long",["POST","PUT","DELETE"]));

app.set("view engine", "ejs");

app.get("/", async (request, response) => {
  const Overdue = await Todo.OverdueTodos();
  const DueToday = await Todo.dueTodayTodos();
  const DueLater = await Todo.dueLaterTodos();
  const Complete = await Todo.CompletedTodos();
  if (request.accepts("html")) {
    response.render("index", {
      title:"Todo application",
      Overdue,
      DueToday,
      DueLater,
      Complete,
      csrfToken: request.csrfToken(),
    });
  } else {
    response.json({
      Overdue,
      DueToday,
      DueLater,
      Complete,
    });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (request, response) {
  response.send("Hello World");
});

app.get("/todos", async function (_request, response) {
  // FILL IN YOUR CODE HERE
  try {
    console.log("Processing list of all Todos ...");
    // Use Sequelize to query the database and get all Todos
    const todos = await Todo.findAll();
    // Respond with the list of all Todos
    return response.json(todos);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
  // First, we have to query our PostgerSQL database using Sequelize to get list of all Todos.
  // Then, we have to respond with all Todos, like:
  // response.send(todos)
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    //return response.json(todo);
    return response.redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.setCompletionStatus(request.body.completed);
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  //console.log("We have to delete a Todo with ID: ", request.params.id);
  // FILL IN YOUR CODE HERE
  console.log("Deleting a Todo with ID: ",request.params.id);
  try {
    await Todo.remove(request.params.id);
    return response.json({success:true});
  } catch (error) {
    return response.status(500).json(error);
  }
  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
  // response.send(true)
});

module.exports = app;
