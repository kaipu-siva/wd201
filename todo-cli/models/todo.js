// models/todo.js
"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const overdueTodo = await this.overdue();
      overdueTodo.forEach((task) => console.log(task.displayableString()));

      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const dueTodayTodo = await this.dueToday();
      dueTodayTodo.forEach((task) => console.log(task.displayableString()));

      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dueLaterTodo = await this.dueLater();
      dueLaterTodo.forEach((task) => console.log(task.displayableString()));
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS\
      const today = new Date().toISOString().split("T")[0];
      return await this.findAll({
        where: {
          dueDate: {
            [Sequelize.Op.lt]: today,
          },
          completed: false,
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const today = new Date().toISOString().split("T")[0];
      return await this.findAll({
        where: {
          dueDate: today,
          completed: false,
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const today = new Date().toISOString().split("T")[0];
      return await this.findAll({
        where: {
          dueDate: {
            [Sequelize.Op.gt]: today,
          },
          completed: false,
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      const task = await this.findByPk(id);
      if (task) {
        task.completed = true;
        await task.save();
        console.log(`Task ${id} marked as complete.`);
      } else {
        console.log(`Task ${id} not found.`);
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
