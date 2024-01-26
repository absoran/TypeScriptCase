import express from "express";
import cors from "cors";
import errorMiddleware from "./Middlewares/error-middleware";
import dotenv from "dotenv";
dotenv.config();
import {AppDataSource} from "./data-source";
import { Router } from "express";

interface Controller {
    path: string;
    paths: string;
    router: Router;
}

AppDataSource
    .initialize()
    .then(() =>  {
        console.log("Connected to the Db")
    })
    .catch((err) => {
        console.error("Error during connection to the Db", err)
    })
class App {
    private app: express.Application;
    private origins: string[] = [];

    constructor(controllers: any[]) {
        this.app = express();
        this.setOrigins();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(
            cors({
                credentials: true,
                origin: this.origins,
            })
        );
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        //this.app.use(morgan("combined"));
    }

    private initializeControllers(controllers: Controller[]) {

        controllers.forEach((controller) => {
            this.app.use("/api/", controller.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private setOrigins() {
        if (process.env.NODE_ENV === "development") {
            this.origins.push("http://localhost:3000");
        }

        if (process.env.NODE_ENV === "prd") {
            process.env.DEPLOYED_APP_URL &&
            this.origins.push(process.env.DEPLOYED_APP_URL);
        }
    }

    public appListen() {
        this.app.listen(process.env.PORT || 8000, () => {
            console.log(`App listening on the port ${process.env.PORT || 8000}`);
        });
    }
}

export default App;
