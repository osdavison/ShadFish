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

    const sqlSelectCommand = "SELECT id FROM shadfish";
    connection.execute(sqlSelectCommand, (err, result) => {
      if (err) {
        console.error(err.message);
      }
      console.log(result);

      // If no rows or last row is a completed game, commit moves using INSERT with an ID one higher than that of the last row
      // Else commit moves using UPDATE and the ID of the last row
    });

    const sqlInsertCommand = `INSERT INTO shadfish (id, moves, column3) VALUES (1, ${
      req.body.moves
    }, foo);`;

    const sqlUpdateCommand = `UPDATE shadfish
                              SET id = 1, moves = ${
                                req.body.moves
                              }, column3 = foo
                              WHERE id = 1`;

    connection.execute(sqlInsertCommand, (err, result) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log(result.rows);
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

export default router;
