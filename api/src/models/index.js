const mongoose = require("../common/services/mongoose.service").mongoose;
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: String,
  body: String,
  isComplete: Boolean,
});

// Ensure virtual fields are serialised.
todoSchema.set("toJSON", {
  virtuals: true,
});

todoSchema.findById = function (cb) {
  return this.model("Todos").find({ id: this.id }, cb);
};

const Todo = mongoose.model("Todos", todoSchema);

exports.Todo = Todo;

exports.createTodo = (todoData) => {
  const todo = new Todo(todoData);
  return todo.save();
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Todo.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, todos) {
        if (err) {
          reject(err);
        } else {
          resolve(todos);
        }
      });
  });
};

exports.findById = (id) => {
  return Todo.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

exports.putTodo = (id, todoData) => {
  return Todo.findOneAndUpdate(
    {
      _id: id,
    },
    todoData
  );
};

exports.patchTodo = (id, todoData) => {
  return Todo.findOneAndUpdate(
    {
      _id: id,
    },
    todoData
  );
};

exports.removeById = (todoId) => {
  return new Promise((resolve, reject) => {
    Todo.deleteMany({ _id: todoId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
