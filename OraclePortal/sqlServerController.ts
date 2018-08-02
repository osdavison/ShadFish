// import { Router, Request, Response } from "express";
// import * as tedious from "tedious";
// import { Connection } from "tedious";

// const router: Router = Router();

// const config = {
//   userName: "test",
//   password: "test",
//   server: "192.168.1.210"
// };

// router.post("/moves", async (req: Request, res: Response) => {
//   console.log(req.body);

//   try {
//     const connection = new Connection(config);

//     connection.on("connect", err => {
//       if (err) {
//       }

//       const sql = "TODO: SQL comand";

//       const request = new Request(sql, (err, rowCount) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(rowCount + " rows");
//         }
//       });

//       request.on("row", columns => {
//         columns.forEach(column => {
//           console.log(column.value);
//         });
//       });

//       connection.execSql(request);
//     });
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// });

// export default router;
