import * as express from "express";
import router from "./controller";

const app: express.Application = express();
const port: number = 3000;

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
