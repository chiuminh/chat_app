import express from "express";
import StartUp from "./StartUp";
import "./config/Database";
import router from "./router";
import handleError from "./helpers/handleError";
const app = express();
const port = 9999;

new StartUp(app);
app.use("/", router);
handleError(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
