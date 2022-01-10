const config = {
  port: 3600,
};

const express = require("express");
const app = express();

const TodosRouter = require("./routes");

app.use(express.json());

TodosRouter.routesConfig(app);

app.listen(config.port, function () {
  console.log("app listening at port %s", config.port);
});
