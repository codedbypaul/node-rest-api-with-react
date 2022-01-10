const TodoModel = require("../models");

exports.list = (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  TodoModel.list(limit, page).then((result) => {
    const mapped = result.map(({ _id, title, body, isComplete }) => ({
      id: _id,
      title,
      body,
      isComplete,
    }));
    res.status(200).send(mapped);
  });
};

exports.insert = (req, res) => {
  TodoModel.createTodo(req.body).then((result) => {
    console.log(result);
    res.status(201).send(result);
  });
};

exports.getById = (req, res) => {
  TodoModel.findById(req.params.todoId).then((result) => {
    res.status(200).send(result);
  });
};

exports.putById = (req, res) => {
  TodoModel.putTodo(req.params.todoId, req.body).then((result) => {
    res.status(204).send(result);
  });
};

exports.patchById = (req, res) => {
  TodoModel.patchTodo(req.params.todoId, req.body).then((result) => {
    res.status(204).send(result);
  });
};

exports.removeById = (req, res) => {
  TodoModel.removeById(req.params.todoId).then((result) => {
    res.status(204).send({});
  });
};
