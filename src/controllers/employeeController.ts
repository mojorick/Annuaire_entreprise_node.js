import { Controller } from "../decorators/controller";
import { Get } from "../decorators/route";
import type { Response, Request } from "express";
import * as sqlite from "sqlite3";

@Controller()
class EmployeeController {
    @Get()
    getAll(req: Request, res: Response) {
        const dbPath = process.env.DB_PATH || "";
        const db = new sqlite.Database(dbPath);

        db.all("SELECT * FROM Employee", [], (err, rows) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
    }
}
