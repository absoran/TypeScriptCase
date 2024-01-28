import cors from "cors";
import errorMiddleware from "./Middlewares/error-middleware";
import { Router } from "express";
import {AppDataSource} from "./data-source";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

dotenv.config();
interface Controller {
    path: string;
    paths: string;
    router: Router;
}

// initialize DB, migrate tables with code first
AppDataSource
    .initialize()
    .then(() =>  {
        console.log("Connected to the Db")
    })
    .catch((err) => {
        console.error("Error during connection to the Db", err)
    })

// App class initializes application; takes middlewares, controllers and errorHandler in constructor.
class App {
    private app: express.Application;
    private origins: string[] = [];

    constructor(controllers: any[]) {
        this.app = express();
        this.setOrigins();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.initializeSwagger();
    }

    // initializeMiddlewares, more middleware can be added through this function e.g: logging
    private initializeMiddlewares() {
        this.app.use(
            cors({
                credentials: true,
                origin: this.origins,
            })
        );
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan("tiny"));
    }

    private initializeControllers(controllers: Controller[]) {

        controllers.forEach((controller) => {
            this.app.use("/api/", controller.router);
        });
    }

    // initializes error handling middleware
    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    // setOrigins function determines on which URL address the API will operate.
    private setOrigins() {
        if (process.env.NODE_ENV === "development") {
            this.origins.push("http://localhost:3000");
        }

        if (process.env.NODE_ENV === "prd") {
            process.env.DEPLOYED_APP_URL &&
            this.origins.push(process.env.DEPLOYED_APP_URL);
        }
    }

    private initializeSwagger(){
        //this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
    }

    public appListen() {
        this.app.listen(process.env.PORT || 8000, () => {
            console.log(`App listening on the port ${process.env.PORT || 8000}`);
        });
    }
}

export default App;
