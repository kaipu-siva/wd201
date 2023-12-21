/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

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
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  //console.log("We have to delete a Todo with ID: ", request.params.id);
  // FILL IN YOUR CODE HERE
  const todoId = request.params.id;

  try {
    console.log("Deleting a Todo with ID: ", todoId);
    // Use Sequelize to find the Todo by ID
    const todo = await Todo.findByPk(todoId);

    // Check if the Todo exists
    if (!todo) {
      return response.status(404).json(false);
    }

    // Use Sequelize to delete the Todo
    const deletedTodo = await todo.destroy();

    // Respond with true if the Todo was successfully deleted
    return response.json(true);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
  // First, we have to query our database to delete a Todo by ID.
  // Then, we have to respond back with true/false based on whether the Todo was deleted or not.
  // response.send(true)
});

module.exports = app;
