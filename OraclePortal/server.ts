import * as express from "express";
import oracleRouter from "./oracleController";
import * as bodyParser from "body-parser";

const app: express.Application = express();
const port: number = 3000;

app.use(bodyParser.json());

app.use("/oracle/", oracleRouter);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
