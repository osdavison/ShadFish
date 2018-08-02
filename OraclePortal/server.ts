import * as express from "express";
import router from "./controller";
import * as bodyParser from "body-parser";

const app: express.Application = express();
const port: number = 3000;

app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
