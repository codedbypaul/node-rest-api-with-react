const assert = require("assert");
const Todo = require("../../src/models"); //imports the Todo model.
describe("Creating documents", () => {
  it("creates a todo", (done) => {
    //assertion is not included in mocha so
    //require assert which was installed along with mocha
    const todo = new Todo.Todo({ name: "Pickachu" });
    todo
      .save() //takes some time and returns a promise
      .then(() => {
        assert(!todo.isNew); //if poke is saved to db it is not new
        done();
      });
  });
});
