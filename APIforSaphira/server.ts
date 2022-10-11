import appRouter from "./src/route/routes";
import express, {application} from "express";
import cors from 'cors';
import helmet from 'helmet'
import * as dotenv from 'dotenv'

export default class App {
    private app;
    constructor() {
        this.app = express();

        dotenv.config();
        this.app.set('port', process.env.PORT);

        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());

        this.app.use(appRouter);
    }

    async listen() {
        this.app.listen(3333);
        console.log("Server started at localhost:3333");
    }
}