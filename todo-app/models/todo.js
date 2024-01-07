"use strict";
const { Model,Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    static getTodos() {
      return this.findAll();
    }

    static async remove(id){
      return this.destroy({
        where:{
          id,
        },
      });
    }

    static async OverdueTodos() {
      const date = new Date();
      return this.findAll({
        where: {
          dueDate: {
            [Op.lt]: date,
          },
          completed: false,
        },
      });
    }

    static async dueTodayTodos() {
      const date = new Date();
      return this.findAll({
        where: {
          dueDate: {
            [Op.eq]: date,
          },
          completed: false,
        },
      });
    }

    static async dueLaterTodos() {
      const date = new Date();
      return this.findAll({
        where: {
          dueDate: {
            [Op.gt]: date,
          },
          completed: false,
        },
      });
    }

    static async CompletedTodos() {
      return this.findAll({
        where: {
          completed: {
            [Op.eq]: true,
          },
        },
      });
    }

    setCompletionStatus(completed) {
      const status = !completed;
      return this.update({ completed: status });
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
