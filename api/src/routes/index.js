const TodosController = require("../controllers");

exports.routesConfig = function (app) {
  app.get("/api/todos", [TodosController.list]);
  app.post("/api/todos", [TodosController.insert]);
  app.get("/api/todos/:todoId", [TodosController.getById]);
  app.put("/api/todos/:todoId", [TodosController.putById]);
  app.patch("/api/todos/:todoId", [TodosController.patchById]);
  app.delete("/api/todos/:todoId", [TodosController.removeById]);
};
