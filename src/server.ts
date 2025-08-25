import "reflect-metadata";
import * as express from "express";
import { config } from "dotenv";
import {routeCollection} from "./infrastructure/routeCollection";
import "./controllers/employeeController";
import * as bodyParser from "body-parser"
import * as morgan from "morgan"
import * as cors from "cors"
import "./models/repositories/employeeRepository";
import "./controllers/teamController";
import "./models/repositories/teamRepository";

config();

const app = express();
const port = process.env.PORT || 3000;

const router = express.Router();
routeCollection.setupRouter(router);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use(router);

app.listen(
    port,
    () => console.log(`Example app listening on port ${port}!`)
);