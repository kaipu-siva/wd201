/* eslint-disable no-undef */
const todoList = () => {
  // eslint-disable-next-line no-undef
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    const overD = [];
    for (let x in all) {
      if (all[x].dueDate === yesterday) {
        overD.push(all[x]);
      }
    }
    return overD;
  };

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    const dueT = [];
    for (let x in all) {
      if (all[x].dueDate === today) {
        dueT.push(all[x]);
      }
    }
    return dueT;
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    const dueL = [];
    for (let x in all) {
      if (all[x].dueDate === tomorrow) {
        dueL.push(all[x]);
      }
    }
    return dueL;
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.
    return list
      .map((y) => {
        let mark;
        if (y.completed) {
          mark = "[x]";
        } else {
          mark = "[ ]";
        }
        let datee;
        if (y.dueDate === today) {
          datee = "";
        } else {
          datee = y.dueDate;
        }
        return `${mark} ${y.title.trim()} ${datee.trim()}`;
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

const todos = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1)),
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1)),
);

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

module.exports = todoList;
