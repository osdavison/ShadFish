import { Router, Request, Response } from "express";
import * as oracledb from "oracledb";
import { IConnection } from "oracledb";

const router: Router = Router();

const createConnection = () => {
  return oracledb.getConnection({
    user: "shadfish",
    password: "iti001",
    connectString: "localhost/XE"
  });
};

const doRelease = (connection: IConnection) => {
  connection.close(function(err) {
    if (err) console.error(err.message);
  });
};

router.post("/moves", async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const connection = await createConnection();

    if (!connection) {
      return res.status(500).send("DB connection failed");
    }

    const sqlCommand = "TODO: SQL command";

    connection.execute(sqlCommand, [103], (err, result) => {
      if (err) {
        console.error(err.message);
        if (connection) {
          doRelease(connection);
        }
        return;
      }
      console.log(result.rows);
      if (connection) {
        doRelease(connection);
      }
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

export default router;
